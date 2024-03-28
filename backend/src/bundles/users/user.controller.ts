import  { type UserGetAllResponseDto  } from 'shared/build/index.js';
import { HttpError } from 'shared/build/index.js';

import { type UserService } from '~/bundles/users/user.service.js';
import  {
    type ApiHandlerOptions, 
    type ApiHandlerResponse } from '~/common/controller/controller.js';
import {
    Controller } from '~/common/controller/controller.js';
import { ApiPath } from '~/common/enums/enums.js';
import { HttpCode } from '~/common/http/http.js';
import { type ILogger } from '~/common/logger/logger.js';

import { UsersApiPath } from './enums/enums.js';
import  { type IUserEntityFields } from './user.entity.js';

/**
 * @swagger
 * components:
 *    schemas:
 *      User:
 *        type: object
 *        properties:
 *          id:
 *            type: number
 *            format: number
 *            minimum: 1
 *          email:
 *            type: string
 *            format: email
 */
class UserController extends Controller {
    private userService: UserService;

    public constructor(logger: ILogger, userService: UserService) {
        super(logger, ApiPath.USERS);

        this.userService = userService;

        this.addRoute({
            path: UsersApiPath.ROOT,
            method: 'GET',
            handler: () => this.findAll(),
        });

        this.addRoute({
            path: UsersApiPath.ROOT,
            method: 'DELETE',
            handler: (options) =>
                this.deleteById(
                    options as ApiHandlerOptions<{
                        params: { id: string };
                    }>,
                ),
        });
    }

    /**
     * @swagger
     * /users:
     *    get:
     *      description: Returns an array of users
     *      responses:
     *        200:
     *          description: Successful operation
     *          content:
     *            application/json:
     *              schema:
     *                type: array
     *                items:
     *                  $ref: '#/components/schemas/User'
     */
    private async findAll(): Promise<ApiHandlerResponse<UserGetAllResponseDto>> {
        return {
            status: HttpCode.OK,
            payload: await this.userService.findAll(),
        };
    }

    private async deleteById(options:ApiHandlerOptions<{ params: { id: string; }; }>):Promise<ApiHandlerResponse<IUserEntityFields>> {
        try {
            const deletedUser = await this.userService.deleteById(options.params.id);
            return {
                status:HttpCode.OK,
                payload:deletedUser
            };
        } catch (error) {
            //console.log(error);
            return error instanceof HttpError
            ? {
                  status: error.status,
                  payload: {
                      message: error.message,
                  },
              }
            : {
                  status: HttpCode.INTERNAL_SERVER_ERROR,
                  payload: {
                      message: 'Internal server error.',
                  },
              };
        }
        
    }
}

export { UserController };
