import { type IEntity } from '~/common/interfaces/interfaces.js';

type IUserEntityFields = {
        id: string;
        email: string;
        passwordHash: string|null;
        passwordSalt: string|null;
        lastName: string;
        firstName: string;
        avatar?: string| null
};
class UserEntity implements IEntity {
    private 'id': string | null;

    private 'email': string;

    private 'passwordHash': string|null;

    private 'passwordSalt': string| null;

    private 'lastName': string;

    private 'firstName': string;

    private 'avatar': string|null;

    private constructor({
        id,
        email,
        passwordHash,
        passwordSalt,
        lastName,
        firstName,
        avatar = null
    }:IUserEntityFields ) {
        this.id = id;
        this.email = email;
        this.passwordHash = passwordHash;
        this.passwordSalt = passwordSalt;
        this.lastName = lastName;
        this.firstName = firstName;
        this.avatar = avatar;
    }

    public static initialize({
        id,
        email,
        passwordHash,
        passwordSalt,
        lastName,
        firstName,
        avatar
    }: IUserEntityFields): UserEntity {
        return new UserEntity({
            id,
            email,
            passwordHash,
            passwordSalt,
            lastName,
            firstName,
            avatar
        });
    }

    public static initializeNew({
        email,
        passwordHash,
        passwordSalt,
        lastName,
        firstName,
        avatar
    }: Omit< IUserEntityFields,'id'>): UserEntity {
        return {
            email,
            passwordHash,
            passwordSalt,
            lastName,
            firstName,
            avatar
        } as unknown as UserEntity;
    }

    public toObject(): Pick<IUserEntityFields,'id'|'email'> {
        return {
            id: this.id as string,
            email: this.email,
        };
    }

    public toNewObject():IUserEntityFields {
        return {
            id: this.id as NonNullable<string>,
            email: this.email,
            passwordHash: this.passwordHash,
            passwordSalt: this.passwordSalt,
            lastName: this.lastName,
            firstName: this.firstName,
            avatar: this.avatar
        };
    }
}

export { UserEntity };
export  { type IUserEntityFields };