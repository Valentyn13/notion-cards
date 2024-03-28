import { genSalt, hash } from 'bcrypt';
import jwt from 'jsonwebtoken';
import  {
    type EncryptionDataPayload,
    type UserSignInRequestDto,
    type UserSignInResponseDto,
    type UserWithoutHashPasswords } from 'shared/build/index.js';
import {
    AuthError,
    ExceptionMessage,
    HttpCode,
    HttpError,
    ServerErrorType } from 'shared/build/index.js';

import {
    type UserSignUpRequestDto,
    type UserSignUpResponseDto,
} from '~/bundles/users/types/types.js';
import { type UserService } from '~/bundles/users/user.service.js';
import { type IConfig } from '~/common/config/config.js';

import { generateRefreshToken } from './helpers/generate-refresh-token.js';
import { generateToken } from './helpers/generate-token.js';
import { verifyToken } from './helpers/verify-token.js';

type ConstructorType = {
    userService: UserService;
    config: IConfig;
};

class AuthService {
    private userService: UserService;
    private config: IConfig;

    public constructor({ userService, config }: ConstructorType) {
        this.userService = userService;
        this.config = config;
    }

    public async signUp(
        userRequestDto: UserSignUpRequestDto,
    ): Promise<UserSignUpResponseDto> {
        const { password, email } = userRequestDto;
        const userByEmail = await this.userService.findByEmail({ email });
        if(userByEmail) {
            throw new AuthError({
                message:ExceptionMessage.USER_EXISTS,
                status:HttpCode.BAD_REQUEST,
                errorType: ServerErrorType.EMAIL
            });
        }
        const passwordSalt = await this.generateSalt();
        const passwordHash = await this.encrypt(String(password), passwordSalt);

        const { id } = await this.userService.create({
            ...userRequestDto,
            passwordSalt,
            passwordHash,
        });

        const token = generateToken({ id });
        const user = await this.userService.getUserWithoutHashPasswordsById(
            id,
            'withoutHashPasswords',
        );
        return {
            user,
            token,
        };
    }

    public async logIn({
        email,
        password,
    }: UserSignInRequestDto): Promise<UserSignInResponseDto> {
        const foundUserByEmail = await this.userService.findByEmail({ email });
        if (!foundUserByEmail) {
            throw new AuthError({
                message: ExceptionMessage.USER_NOT_FOUND,
                status: HttpCode.BAD_REQUEST,
                errorType: ServerErrorType.EMAIL,
            });
        }
        const { passwordHash, passwordSalt, id } = foundUserByEmail;
        const isEqualPassword = await this.compare({
            plaintTextPassword: password,
            passwordSalt,
            passwordHash,
        });
        if (!isEqualPassword) {
            throw new AuthError({
                message: ExceptionMessage.INVALID_PASSWORD,
                status: HttpCode.BAD_REQUEST,
                errorType: ServerErrorType.PASSWORD,
            });
        }
        const user = await this.userService.getUserWithoutHashPasswordsById(
            id,
            'withoutHashPasswords',
        );
        return {
            user,
            accessToken: generateToken({ id }),
            refreshToken: generateRefreshToken({ id }),
        };
    }
    public async getUserWithoutHashPasswordsById(id:string):Promise<UserWithoutHashPasswords>{
        return await this.userService.getUserWithoutHashPasswordsById(id);
    }

    public async generateSalt(): Promise<string> {
        const USER_PASSWORD_SALT_ROUNDS = 10;
        return await genSalt(USER_PASSWORD_SALT_ROUNDS);
    }

    public encrypt(data: string, salt: string): Promise<string> {
        return hash(data, salt);
    }

    public verifyToken<T>(token: string, tokenSecret: string): T {
        try {
            return verifyToken(token, tokenSecret) as T;
        } catch (error) {
            if (error instanceof jwt.TokenExpiredError) {
                throw new HttpError({
                    message: ExceptionMessage.TOKEN_EXPIRED,
                    status: HttpCode.EXPIRED_TOKEN,
                });
            }
            throw new AuthError();
        }
    }

    public async compare({
        plaintTextPassword,
        passwordSalt,
        passwordHash,
    }: EncryptionDataPayload): Promise<boolean> {
        if (!passwordSalt) {
            return false;
        }
        const dataHash = await this.encrypt(plaintTextPassword, passwordSalt);
        return dataHash === passwordHash;
    }
}

export { AuthService };
