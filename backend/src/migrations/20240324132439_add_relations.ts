import { type Knex } from 'knex';

import { DatabaseTableName } from '~/common/database/database.package.js';
import { DatabaseColumnName } from '~/common/database/enums/database-column-name.enum.js';

const RelationRule = {
    CASCADE: 'CASCADE',
    SET_NULL: 'SET NULL',
};

async function up(knex: Knex): Promise<void> {
    await knex.schema.alterTable(DatabaseTableName.BOARDS, (table) => {
        table
            .uuid(DatabaseColumnName.USER_ID)
            .references(DatabaseColumnName.ID)
            .inTable(DatabaseTableName.USERS)
            .onUpdate(RelationRule.CASCADE)
            .onDelete(RelationRule.SET_NULL);

        table
            .uuid(DatabaseColumnName.TAG_ID)
            .references(DatabaseColumnName.ID)
            .inTable(DatabaseTableName.TAGS)
            .onUpdate(RelationRule.CASCADE)
            .onDelete(RelationRule.SET_NULL);
    });
    await knex.schema.alterTable(
        DatabaseTableName.BOARD_USER_RIGHTS,
        (table) => {
            table
                .uuid(DatabaseColumnName.USER_ID)
                .references(DatabaseColumnName.ID)
                .inTable(DatabaseTableName.USERS)
                .onUpdate(RelationRule.CASCADE)
                .onDelete(RelationRule.SET_NULL);

            table
                .uuid(DatabaseColumnName.BOARD_ID)
                .references(DatabaseColumnName.ID)
                .inTable(DatabaseTableName.BOARDS)
                .onUpdate(RelationRule.CASCADE)
                .onDelete(RelationRule.SET_NULL);

            table
                .uuid(DatabaseColumnName.BOARD_RIGHT_ID)
                .references(DatabaseColumnName.ID)
                .inTable(DatabaseTableName.BOARD_RIGHTS)
                .onUpdate(RelationRule.CASCADE)
                .onDelete(RelationRule.SET_NULL);
        },
    );
    await knex.schema.alterTable(DatabaseTableName.COLUMNS, (table) => {
        table
            .uuid(DatabaseColumnName.BOARD_ID)
            .references(DatabaseColumnName.ID)
            .inTable(DatabaseTableName.BOARDS)
            .onUpdate(RelationRule.CASCADE)
            .onDelete(RelationRule.SET_NULL);
    });
    await knex.schema.alterTable(DatabaseTableName.CARD_USERS, (table) => {
        table
            .uuid(DatabaseColumnName.USER_ID)
            .references(DatabaseColumnName.ID)
            .inTable(DatabaseTableName.USERS)
            .onUpdate(RelationRule.CASCADE)
            .onDelete(RelationRule.SET_NULL);

        table
            .uuid(DatabaseColumnName.CARD_ID)
            .references(DatabaseColumnName.ID)
            .inTable(DatabaseTableName.CARDS)
            .onUpdate(RelationRule.CASCADE)
            .onDelete(RelationRule.SET_NULL);
    });
    await knex.schema.alterTable(DatabaseTableName.ATTACHMENTS, (table) => {
        table
            .uuid(DatabaseColumnName.CARD_ID)
            .references(DatabaseColumnName.ID)
            .inTable(DatabaseTableName.CARDS)
            .onUpdate(RelationRule.CASCADE)
            .onDelete(RelationRule.SET_NULL);
    });
    await knex.schema.alterTable(DatabaseTableName.COMMENTS, (table) => {
        table
            .uuid(DatabaseColumnName.USER_ID)
            .references(DatabaseColumnName.ID)
            .inTable(DatabaseTableName.USERS)
            .onUpdate(RelationRule.CASCADE)
            .onDelete(RelationRule.SET_NULL);

        table
            .uuid(DatabaseColumnName.CARD_ID)
            .references(DatabaseColumnName.ID)
            .inTable(DatabaseTableName.CARDS)
            .onUpdate(RelationRule.CASCADE)
            .onDelete(RelationRule.SET_NULL);
    });
    await knex.schema.alterTable(DatabaseTableName.CARDS, (table) => {
        table
            .uuid(DatabaseColumnName.COLUMN_ID)
            .references(DatabaseColumnName.ID)
            .inTable(DatabaseTableName.COLUMNS)
            .onUpdate(RelationRule.CASCADE)
            .onDelete(RelationRule.SET_NULL);
    });
}
async function down(knex: Knex): Promise<void> {
    await knex.schema.alterTable(DatabaseTableName.BOARDS, (table) => {
        table.dropColumn(DatabaseColumnName.USER_ID);
        table.dropColumn(DatabaseColumnName.TAG_ID);
    });
    await knex.schema.alterTable(
        DatabaseTableName.BOARD_USER_RIGHTS,
        (table) => {
            table.dropColumn(DatabaseColumnName.USER_ID);
            table.dropColumn(DatabaseColumnName.BOARD_ID);
            table.dropColumn(DatabaseColumnName.BOARD_RIGHT_ID);
        },
    );
    await knex.schema.alterTable(DatabaseTableName.COLUMNS, (table) => {
        table.dropColumn(DatabaseColumnName.BOARD_ID);
    });
    await knex.schema.alterTable(DatabaseTableName.CARD_USERS, (table) => {
        table.dropColumn(DatabaseColumnName.USER_ID);
        table.dropColumn(DatabaseColumnName.CARD_ID);
    });
    await knex.schema.alterTable(DatabaseTableName.ATTACHMENTS, (table) => {
        table.dropColumn(DatabaseColumnName.CARD_ID);
    });
    await knex.schema.alterTable(DatabaseTableName.COMMENTS, (table) => {
        table.dropColumn(DatabaseColumnName.USER_ID);
        table.dropColumn(DatabaseColumnName.CARD_ID);
    });
    await knex.schema.alterTable(DatabaseTableName.CARDS, (table) => {
        table.dropColumn(DatabaseColumnName.COLUMN_ID);
    });
}

export { down, up };
