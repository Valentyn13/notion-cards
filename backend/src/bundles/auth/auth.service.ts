import { genSalt, hash } from 'bcrypt';
import {
    type EncryptionDataPayload,
    type UserSignInRequestDto,
    type UserSignInResponseDto,
    AuthError,
    ExceptionMessage,
    HttpCode,
    ServerErrorType,
} from 'shared/build/index.js';

import {
    type UserSignUpRequestDto,
    type UserSignUpResponseDto,
} from '~/bundles/users/types/types.js';
import { type UserService } from '~/bundles/users/user.service.js';
import { type IConfig } from '~/common/config/config.js';

import { generateRefreshToken } from './helpers/generate-refresh-token.js';
import { generateToken } from './helpers/generate-token.js';

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
        const { password } = userRequestDto;
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
                status: HttpCode.UNAUTHORIZED,
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

    public async generateSalt(): Promise<string> {
        const USER_PASSWORD_SALT_ROUNDS = 10;
        return await genSalt(USER_PASSWORD_SALT_ROUNDS);
    }

    public encrypt(data: string, salt: string): Promise<string> {
        return hash(data, salt);
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
