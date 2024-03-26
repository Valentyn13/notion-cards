import  { type IUserEntityFields } from '~/bundles/users/user.entity';

interface IService<T = unknown> {
    getById(id: string): Promise<T | null>;
    findAll(): Promise<{
        items: T[];
    }>;
    create(payload: unknown): Promise<T>;
    update(id:string, payload:Partial<IUserEntityFields>): Promise<T>;
    deleteById(id:string): Promise<T>;
    findByEmail(data: { email: string }): Promise<T>;
}

export { type IService };

