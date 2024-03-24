import { type Knex } from 'knex';

import { DatabaseColumnName, DatabaseTableName } from '../common/enums/enums.js';

const UUID_FUNCTION = 'uuid_generate_v4()';

async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable(DatabaseTableName.USERS, (table) => {
        table
            .uuid(DatabaseColumnName.ID)
            .primary()
            .defaultTo(knex.raw(UUID_FUNCTION));
        table.string(DatabaseColumnName.EMAIL).unique().notNullable();
        table.text(DatabaseColumnName.PASSWORD_HASH).notNullable();
        table.text(DatabaseColumnName.PASSWORD_SALT).notNullable();
        table.string(DatabaseColumnName.AVATAR).nullable().defaultTo(null);
        table.string(DatabaseColumnName.FIRST_NAME).notNullable();
        table.string(DatabaseColumnName.LAST_NAME).notNullable();
        table
            .dateTime(DatabaseColumnName.CREATED_AT)
            .notNullable()
            .defaultTo(knex.fn.now());
        table
            .dateTime(DatabaseColumnName.UPDATED_AT)
            .notNullable()
            .defaultTo(knex.fn.now());
        table
            .dateTime(DatabaseColumnName.DELETED_AT)
            .nullable()
            .defaultTo(null);
    });
    await knex.schema.createTable(DatabaseTableName.TAGS, (table) => {
        table
            .uuid(DatabaseColumnName.ID)
            .primary()
            .defaultTo(knex.raw(UUID_FUNCTION));
        table.string(DatabaseColumnName.COLOR).notNullable();
        table
            .dateTime(DatabaseColumnName.CREATED_AT)
            .notNullable()
            .defaultTo(knex.fn.now());
        table
            .dateTime(DatabaseColumnName.UPDATED_AT)
            .notNullable()
            .defaultTo(knex.fn.now());
    });
    await knex.schema.createTable(DatabaseTableName.BOARDS, (table) => {
        table
            .uuid(DatabaseColumnName.ID)
            .primary()
            .defaultTo(knex.raw(UUID_FUNCTION));
        table.string(DatabaseColumnName.NAME).notNullable();
        table
            .dateTime(DatabaseColumnName.CREATED_AT)
            .notNullable()
            .defaultTo(knex.fn.now());
        table
            .dateTime(DatabaseColumnName.UPDATED_AT)
            .notNullable()
            .defaultTo(knex.fn.now());
    });
    await knex.schema.createTable(DatabaseTableName.BOARD_RIGHTS, (table) => {
        table
            .uuid(DatabaseColumnName.ID)
            .primary()
            .defaultTo(knex.raw(UUID_FUNCTION));
        table.string(DatabaseColumnName.NAME).notNullable();
    });
    await knex.schema.createTable(
        DatabaseTableName.BOARD_USER_RIGHTS,
        (table) => {
            table
                .uuid(DatabaseColumnName.ID)
                .primary()
                .defaultTo(knex.raw(UUID_FUNCTION));
        },
    );
    await knex.schema.createTable(DatabaseTableName.COLUMNS, (table) => {
        table
            .uuid(DatabaseColumnName.ID)
            .primary()
            .defaultTo(knex.raw(UUID_FUNCTION));
        table.string(DatabaseColumnName.NAME).notNullable();
        table.integer(DatabaseColumnName.LIMIT).nullable().defaultTo(null);
        table.integer(DatabaseColumnName.ORDER).notNullable();
        table
            .dateTime(DatabaseColumnName.CREATED_AT)
            .notNullable()
            .defaultTo(knex.fn.now());
        table
            .dateTime(DatabaseColumnName.UPDATED_AT)
            .notNullable()
            .defaultTo(knex.fn.now());
    });
    await knex.schema.createTable(DatabaseTableName.CARD_USERS, (table) => {
        table
            .uuid(DatabaseColumnName.ID)
            .primary()
            .defaultTo(knex.raw(UUID_FUNCTION));
    });
    await knex.schema.createTable(DatabaseTableName.ATTACHMENTS, (table) => {
        table
            .uuid(DatabaseColumnName.ID)
            .primary()
            .defaultTo(knex.raw(UUID_FUNCTION));
        table.string(DatabaseColumnName.URL).notNullable();
        table
            .dateTime(DatabaseColumnName.CREATED_AT)
            .notNullable()
            .defaultTo(knex.fn.now());
        table
            .dateTime(DatabaseColumnName.UPDATED_AT)
            .notNullable()
            .defaultTo(knex.fn.now());
    });
    await knex.schema.createTable(DatabaseTableName.COMMENTS, (table) => {
        table
            .uuid(DatabaseColumnName.ID)
            .primary()
            .defaultTo(knex.raw(UUID_FUNCTION));
        table.text(DatabaseColumnName.TEXT).notNullable();
        table
            .dateTime(DatabaseColumnName.CREATED_AT)
            .notNullable()
            .defaultTo(knex.fn.now());
        table
            .dateTime(DatabaseColumnName.UPDATED_AT)
            .notNullable()
            .defaultTo(knex.fn.now());
    });
    await knex.schema.createTable(DatabaseTableName.CARDS, (table) => {
        table
            .uuid(DatabaseColumnName.ID)
            .primary()
            .defaultTo(knex.raw(UUID_FUNCTION));
        table.string(DatabaseColumnName.NAME).notNullable();
        table.text(DatabaseColumnName.DESCRIPTION).nullable().defaultTo(null);
        table.integer(DatabaseColumnName.ORDER).notNullable();
        table
            .dateTime(DatabaseColumnName.CREATED_AT)
            .notNullable()
            .defaultTo(knex.fn.now());
        table
            .dateTime(DatabaseColumnName.UPDATED_AT)
            .notNullable()
            .defaultTo(knex.fn.now());
    });
}
async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists(DatabaseTableName.USERS);
    await knex.schema.dropTableIfExists(DatabaseTableName.TAGS);
    await knex.schema.dropTableIfExists(DatabaseTableName.BOARDS);
    await knex.schema.dropTableIfExists(DatabaseTableName.USERS);
    await knex.schema.dropTableIfExists(DatabaseTableName.BOARD_RIGHTS);
    await knex.schema.dropTableIfExists(DatabaseTableName.BOARD_USER_RIGHTS);
    await knex.schema.dropTableIfExists(DatabaseTableName.COLUMNS);
    await knex.schema.dropTableIfExists(DatabaseTableName.CARD_USERS);
    await knex.schema.dropTableIfExists(DatabaseTableName.ATTACHMENTS);
    await knex.schema.dropTableIfExists(DatabaseTableName.COMMENTS);
    await knex.schema.dropTableIfExists(DatabaseTableName.CARDS);
}

export { down, up };
