import  { type PartialModelObject,type Transaction  } from 'objection';

import  { type IRepository } from '../interfaces/repository.interface';
import { type AbstractModel } from './database';

class AbstractRepository<T extends typeof AbstractModel, K> implements IRepository<K> {
    private readonly modelInstance: T;
    public constructor(model:T) {
        this.modelInstance = model;
    }
    public get model():T{
        return this.modelInstance;
    }

    public getById(id: string): Promise<K|null> {
        return this.modelInstance.query().findById(id).castTo<K>().execute();
    }
    // TODO: here can be errors
    // public findAll(): Promise<K[]> {
    //     return this.modelInstance.query().castTo<K[]>().execute();
    // }

    public create(payload: Omit<K, 'id'>): Promise<K> {
        return this.modelInstance
        .query()
        .insert({
            ...payload,
        })
        .returning('*')
        .castTo<K>()
        .execute();
    }

    public createWithTransaction(
        data: Omit<K, 'id' | 'createdAt' | 'updatedAt' | 'email'>,
        transaction: Transaction,
    ): Promise<K> {
        return this.modelInstance
            .query()
            .insert({
                ...data,
            })
            .returning('*')
            .transacting(transaction)
            .castTo<K>()
            .execute();
    }

    public update(id: string, payload:  PartialModelObject<AbstractModel>): Promise<K> {
        return this.modelInstance.query().updateAndFetchById(id,payload ).castTo<K>().execute();
    }

    public deleteById(id: string): Promise<K> {
        return this.modelInstance.query().deleteById(id).castTo<K>().execute();
    }}

    export { AbstractRepository };