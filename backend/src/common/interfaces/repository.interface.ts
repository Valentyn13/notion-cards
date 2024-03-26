import { type PartialModelObject } from 'objection';

import { type Abstract } from '../database/abstract.model';

interface IRepository<T = unknown> {
    getById(id:string): Promise<T|null>;
    // findAll(): Promise<T[]>;
    create(payload: T): Promise<T>;
    update(id: string, payload: PartialModelObject<Abstract>): Promise<T>;
    deleteById(id: string): Promise<T>;
}

export { type IRepository };