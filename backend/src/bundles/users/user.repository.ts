import  { type IUserEntityFields } from '~/bundles/users/user.entity.js';
import { UserEntity } from '~/bundles/users/user.entity.js';
import { type UserModel } from '~/bundles/users/user.model.js';
import { AbstractRepository } from '~/common/database/abstract.repository.js';

import  { type UserSignUpResponseDto } from './users.js';

type IUserRepo ={
    findAll(): Promise<UserEntity[]>;
    findOneByEmail(data:{ email:string }): Promise<UserModel | null>;
};

class UserRepository extends AbstractRepository<typeof UserModel, IUserEntityFields> implements IUserRepo {

    public constructor({ userModel }:Record<'userModel', typeof UserModel>) {
        super(userModel);
    }
    public  async  findAll(): Promise<UserEntity[]> {
        const users = await this.model.query().execute();

        return users.map((it) => UserEntity.initialize(it));
    }

    public getUserWithoutHashPasswordsById (id: string, modification?:string):Promise<UserSignUpResponseDto> {
        let query = this.model.query().findById(id);
        if (modification){
            query = query.modify(modification);
        }
        return query.castTo<UserSignUpResponseDto>().execute();
    }

    public async findOneByEmail({ email }: { email:string }): ReturnType<IUserRepo['findOneByEmail']>{
        const user = await this.model.query().findOne({ email });
        return user ?? null;
    }
    // public find(): ReturnType<IRepository['find']> {
    //     return Promise.resolve(null);
    // }

    // public async findAll(): Promise<UserEntity[]> {
    //     const users = await this.userModel.query().execute();

    //     return users.map((it) => UserEntity.initialize(it));
    // }

    // public async create(entity: UserEntity): Promise<UserEntity> {
    //     const { email, passwordSalt, passwordHash } = entity.toNewObject();

    //     const item = await this.userModel
    //         .query()
    //         .insert({
    //             email,
    //             passwordSalt,
    //             passwordHash,
    //         })
    //         .returning('*')
    //         .execute();

    //     return UserEntity.initialize(item);
    // }

    // public update(): ReturnType<IRepository['update']> {
    //     return Promise.resolve(null);
    // }

    // public delete(): ReturnType<IRepository['delete']> {
    //     return Promise.resolve(true);
    // }
}

export { UserRepository };
