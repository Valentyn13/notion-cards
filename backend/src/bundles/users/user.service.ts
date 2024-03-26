import  { type UserWithoutHashPasswords } from 'shared/build/index.js';

import  { type IUserEntityFields } from '~/bundles/users/user.entity.js';
import { UserEntity } from '~/bundles/users/user.entity.js';
import { type UserRepository } from '~/bundles/users/user.repository.js';
import { type IService } from '~/common/interfaces/interfaces.js';

import {
    type UserGetAllResponseDto,
    type UserSignUpRequestDto,
} from './types/types.js';
import  { type UserModel } from './user.model.js';

class UserService implements IService {
    private userRepository: UserRepository;

    public constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }
    public async findByEmail({ email }:{ email:string }):Promise<UserModel | null> {
        return await this.userRepository.findOneByEmail({ email });
    }

    public async getById(id: string): ReturnType<IService['getById']> {
        return await this.userRepository.getById(id);
    }

    public async getUserWithoutHashPasswordsById(id: string, modification?:string):Promise<UserWithoutHashPasswords> {
        return await this.userRepository.getUserWithoutHashPasswordsById(id, modification);
    }

    public async findAll(): Promise<UserGetAllResponseDto> {
        const items = await this.userRepository.findAll();

        return {
            items: items.map((it) => it.toObject()),
        };
    }

    public async create(
        {
            email,
            firstName,
            lastName,
            avatar,
            passwordHash,
            passwordSalt
        }: UserSignUpRequestDto & {
            passwordSalt?: string;
            passwordHash?: string;
        },
    ): Promise<Pick<IUserEntityFields, 'id' | 'email'>> {
        const transaction = await this.userRepository.model.startTransaction();

        // TODO: Bullshit with type aseartion (as)
        const item = (await this.userRepository.createWithTransaction(
            UserEntity.initializeNew({
                email,
                passwordSalt: passwordSalt ?? null,
                passwordHash: passwordHash ?? null,
                lastName,
                firstName,
                avatar
            }) as unknown as Omit<IUserEntityFields, 'id' | 'email' | 'createdAt' | 'updatedAt'>,
            transaction,
        ));
        await transaction.commit();

        const user = UserEntity.initialize(item);
        return user.toObject();

    }

    public async update(id:string, payload:Partial<IUserEntityFields>): ReturnType<IService<IUserEntityFields>['update']> {
        return await this.userRepository.update(id, payload);
    }

    public async deleteById(id:string): Promise<ReturnType<IService<IUserEntityFields>['deleteById']>> {
        return await this.userRepository.deleteById(id);
    }
}

export { UserService };
