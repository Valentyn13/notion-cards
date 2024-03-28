import  { type Modifiers, type QueryBuilder } from 'objection';

import {
    AbstractModel,
    DatabaseTableName,
} from '~/common/database/database.js';

class UserModel extends AbstractModel {
    public 'email': string;

    public 'passwordHash': string;

    public 'passwordSalt': string;

    public 'deletedAt': string | null;

    public 'firstName': string;

    public 'lastName': string;

    public 'avatar': string | null| undefined;

    public static override get tableName(): typeof DatabaseTableName.USERS {
        return DatabaseTableName.USERS;
    }

    public static override get modifiers(): Modifiers<QueryBuilder<UserModel>> {
        return {
            withoutHashPasswords(builder): QueryBuilder<UserModel> {
                return builder.select(
                    'id',
                    'email',
                    'createdAt',
                    'updatedAt',
                    'deletedAt',
                    'firstName',
                    'lastName',
                    'avatar'
                );
            },
        };
    }
}

export { UserModel };
