import  { type FastifyRequest } from 'fastify';
import  {
    type AuthError,
    type UserSignInRequestDto,
    type UserSignInResponseDto,
    type UserWithoutHashPasswords,    CookieName,
    ExceptionMessage } from 'shared/build/index.js';
import {
    userSignInValidationSchema
} from 'shared/build/index.js';

import {
    type UserSignUpRequestDto,
    type UserSignUpResponseDto,
} from '~/bundles/users/users.js';
import { userSignUpValidationSchema } from '~/bundles/users/users.js';
import { config } from '~/common/config/config.js';
import {
    type ApiHandlerOptions,
    type ApiHandlerResponse,
    Controller,
} from '~/common/controller/controller.js';
import { ApiPath } from '~/common/enums/enums.js';
import { HttpCode } from '~/common/http/http.js';
import { type ILogger } from '~/common/logger/logger.js';

import { type AuthService } from './auth.service.js';
import { AuthApiPath } from './enums/enums.js';
import { generateRefreshToken } from './helpers/generate-refresh-token.js';
import { generateToken } from './helpers/generate-token.js';

class AuthController extends Controller {
    private authService: AuthService;

    public constructor(logger: ILogger, authService: AuthService) {
        super(logger, ApiPath.AUTH);

        this.authService = authService;

        this.addRoute({
            path: AuthApiPath.SIGN_UP,
            method: 'POST',
            validation: {
                body: userSignUpValidationSchema,
            },
            handler: (options) =>
                this.signUp(
                    options as ApiHandlerOptions<{
                        body: UserSignUpRequestDto;
                    }>,
                ),
        });

        this.addRoute({
            path: AuthApiPath.SIGN_IN,
            method: 'POST',
            validation: {
                body: userSignInValidationSchema,
            },
            handler: (options) =>
                this.login(
                    options as ApiHandlerOptions<{
                        body: UserSignInRequestDto;
                    }>,
                ),
        });

        this.addRoute({
            path:AuthApiPath.USER,
            method:'GET',
            handler:(options) => this.getUser(options as ApiHandlerOptions<{ user: UserWithoutHashPasswords }>)
        });

        this.addRoute({
            path: AuthApiPath.TOKEN,
            method: 'GET',
            handler: (options) =>
                this.regenerateToken(
                    options as ApiHandlerOptions<{
                        cookies: FastifyRequest['cookies'];
                        unsignCookie: FastifyRequest['unsignCookie'];
                    }>,
                ),
        });
    }

    /**
     * @swagger
     * /auth/sign-up:
     *    post:
     *      description: Sign up user into the system
     *      requestBody:
     *        description: User auth data
     *        required: true
     *        content:
     *          application/json:
     *            schema:
     *              type: object
     *              properties:
     *                email:
     *                  type: string
     *                  format: email
     *                password:
     *                  type: string
     *      responses:
     *        201:
     *          description: Successful operation
     *          content:
     *            application/json:
     *              schema:
     *                type: object
     *                properties:
     *                  message:
     *                    type: object
     *                    $ref: '#/components/schemas/User'
     */
    private async signUp(
        options: ApiHandlerOptions<{
            body: UserSignUpRequestDto;
        }>,
    ): Promise<
        ApiHandlerResponse<UserSignUpResponseDto>
    > {
        try {
            const user = await this.authService.signUp(options.body);
            return {
                status: HttpCode.CREATED,
                payload: user,
            };
        } catch (error: unknown) {
            const {
                message,
                status = HttpCode.INTERNAL_SERVER_ERROR,
                errorType,
            } = error as AuthError;
            return {
                status,
                payload: {
                    message,
                    status,
                    errorType,
                },
            };
        }
    }

    private async login(
        options: ApiHandlerOptions<{
            body: UserSignInRequestDto;
        }>,
    ): Promise<
        ApiHandlerResponse<Omit<UserSignInResponseDto, 'refreshToken'>>
    > {
        try {
            const { refreshToken, ...userData } = await this.authService.logIn(
                options.body,
            );
            return {
                refreshToken,
                status: HttpCode.OK,
                payload: userData,
            };
        } catch (error: unknown) {
            const { message, status, errorType } = error as AuthError;
            return {
                status,
                payload: {
                    message,
                    status,
                    errorType,
                },
            };
        }
    }

    private async getUser(options: ApiHandlerOptions<{ user: UserWithoutHashPasswords }>):Promise<ApiHandlerResponse<UserWithoutHashPasswords>> {
        try {
            const { id } = options.user;
            const user = await this.authService.getUserWithoutHashPasswordsById(id);
            return{
                status:HttpCode.OK,
                payload:user
            }; 
        } catch (error) {
            const message = (error as Error).message;
            const status = HttpCode.INTERNAL_SERVER_ERROR;
            return {
                status,
                payload: {
                    message,
                    status,
                },
            };
        }
    }

    private regenerateToken({
        cookies,
        unsignCookie,
    }: ApiHandlerOptions<{
        cookies: FastifyRequest['cookies'];
        unsignCookie: FastifyRequest['unsignCookie'];
    }>): ApiHandlerResponse<{ accessToken: string }> {
        try {
            const unsignedCookie = unsignCookie(
                cookies[CookieName.REFRESH_TOKEN] as NonNullable<string>,
            );
            const oldRefreshToken = unsignedCookie.value as string;

            const { id } = this.authService.verifyToken<Record<'id', string>>(
                oldRefreshToken,
                config.ENV.JWT.REFRESH_TOKEN_SECRET,
            );

            const accessToken = generateToken({ id });
            const refreshToken = generateRefreshToken({ id });
            return {
                refreshToken,
                status: HttpCode.OK,
                payload: { accessToken },
            };
        } catch (error: unknown) {
            const { status } = error as AuthError;
            return {
                status,
                payload: {
                    message: ExceptionMessage.INVALID_REFRESH_TOKEN,
                    status,
                },
            };
        }
    }
}

export { AuthController };
