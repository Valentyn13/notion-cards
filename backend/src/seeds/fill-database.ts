import { Guid as guid } from 'guid-typescript';
import { type Knex } from 'knex';

import { DatabaseColumnName, DatabaseTableName } from '../common/enums/enums.js';
import { attachmentsSeed } from './seed-data/attachments-seed.js';
import { boardRightsSeed } from './seed-data/board-rights-seed.js';
import { boardsSeed } from './seed-data/boards-seed.js';
import { cardsSeed } from './seed-data/cards-seed.js';
import { columnsSeed } from './seed-data/columns-seed.js';
import { commentsSeed } from './seed-data/comments-seed.js';
import { tagsSeed } from './seed-data/tags-seed.js';
import { usersSeed } from './seed-data/users-seed.js';
import {
    type Attachment,
    type Board,
    type BoardRight,
    type BoardUserRight,
    type Card,
    type Column,
    type Tag,
    type TComment,
    type User,
} from './seed-types/seed-data.types.js';

const deleteFromTables = async (
    trx: Knex.Transaction,
    tableNames: string[],
): Promise<void> => {
    for (const tableName of tableNames) {
        await trx(tableName).del();
    }
};

async function seed(knex: Knex): Promise<void> {
    await knex.transaction(async (trx) => {
        const tableNames = [
            DatabaseTableName.ATTACHMENTS,
            DatabaseTableName.BOARDS,
            DatabaseTableName.BOARD_RIGHTS,
            DatabaseTableName.BOARD_USER_RIGHTS,
            DatabaseTableName.CARDS,
            DatabaseTableName.CARD_USERS,
            DatabaseTableName.COLUMNS,
            DatabaseTableName.COMMENTS,
            DatabaseTableName.TAGS,
            DatabaseTableName.USERS,
        ];
        await deleteFromTables(trx, tableNames);

        // USERS
        const usersMappedSeed = usersSeed.map((user) => ({
            ...user,
            [DatabaseColumnName.FIRST_NAME]:'Popka',
            [DatabaseColumnName.ID]: guid.raw(),
        }));
        const insertedUsers = await trx<User>(DatabaseTableName.USERS)
            .insert(usersMappedSeed)
            .returning('*');

        // BOARD RIGHTS
        const boardRightsMappedSeed = boardRightsSeed.map((boardRight) => ({
            ...boardRight,
            [DatabaseColumnName.ID]: guid.raw(),
        }));

        const insertedBoardRights = await trx<BoardRight>(
            DatabaseTableName.BOARD_RIGHTS,
        )
            .insert(boardRightsMappedSeed)
            .returning('*');

        // TAGS
        const tagsMappedSeed = tagsSeed.map((seed) => ({
            ...seed,
            [DatabaseColumnName.ID]: guid.raw(),
        }));
        const insertedTags = await trx<Tag>(DatabaseTableName.TAGS)
            .insert(tagsMappedSeed)
            .returning('*');

        // BOARDS
        const boardsMappedSeed = boardsSeed.map((board, index) => ({
            ...board,
            [DatabaseColumnName.ID]: guid.raw(),
            [DatabaseColumnName.TAG_ID]: insertedTags[index].id,
            [DatabaseColumnName.USER_ID]: insertedUsers[index].id,
        }));

        const insertedBoards = await trx<Board>(DatabaseTableName.BOARDS)
            .insert(boardsMappedSeed)
            .returning('*');

        // BOARD USER RIGHTS
        const recordOne = {
            [DatabaseColumnName.ID]: guid.raw(),
            [DatabaseColumnName.USER_ID]: insertedUsers[1].id,
            [DatabaseColumnName.BOARD_ID]: insertedBoards[0].id,
            [DatabaseColumnName.BOARD_RIGHT_ID]: insertedBoardRights[1].id,
        };
        const recordTwo = {
            [DatabaseColumnName.ID]: guid.raw(),
            [DatabaseColumnName.USER_ID]: insertedUsers[0].id,
            [DatabaseColumnName.BOARD_ID]: insertedBoards[1].id,
            [DatabaseColumnName.BOARD_RIGHT_ID]: insertedBoardRights[1].id,
        };
        const boardUserRightsMappedSeed = [recordOne, recordTwo];
        await trx<BoardUserRight>(DatabaseTableName.BOARD_USER_RIGHTS)
            .insert(boardUserRightsMappedSeed)
            .returning('*');

        // COLUMNS
        const columnsMappedSeed = columnsSeed.map((column, index) => ({
            ...column,
            [DatabaseColumnName.ID]: guid.raw(),
            [DatabaseColumnName.BOARD_ID]: insertedBoards[index].id,
        }));

        const insertedColumns = await trx<Column>(DatabaseTableName.COLUMNS)
            .insert(columnsMappedSeed)
            .returning('*');

        // CARDS
        const cardsMappedSeed = cardsSeed.map((card, index) => ({
            ...card,
            [DatabaseColumnName.ID]: guid.raw(),
            [DatabaseColumnName.COLUMN_ID]:
                index > 1 ? insertedColumns[0].id : insertedColumns[1].id,
        }));

        //CARD_USERS
        // TODO: add card_users seed

        const insertedCards = await trx<Card>(DatabaseTableName.CARDS)
            .insert(cardsMappedSeed)
            .returning('*');

        // COMMENTS
        const commentsMappedSeed = commentsSeed.map((comment, index) => ({
            ...comment,
            [DatabaseColumnName.ID]: guid.raw(),
            [DatabaseColumnName.USER_ID]: insertedUsers[index].id,
            [DatabaseColumnName.CARD_ID]: insertedCards[index].id,
        }));

        await trx<TComment>(DatabaseTableName.COMMENTS)
            .insert(commentsMappedSeed)
            .returning('*');

        // ATTACHMENTS
        const attachmentsMappedSeed = attachmentsSeed.map(
            (attachment, index) => ({
                ...attachment,
                [DatabaseColumnName.ID]: guid.raw(),
                [DatabaseColumnName.CARD_ID]: insertedCards[index].id,
            }),
        );
        await trx<Attachment>(DatabaseTableName.ATTACHMENTS)
            .insert(attachmentsMappedSeed)
            .returning('*');
    });
}

export { seed };
