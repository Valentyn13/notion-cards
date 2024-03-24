type User = {
    id: string;
    email: string;
    password_hash: string;
    password_salt: string;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date;
    first_name: string;
    last_name: string;
    avatar: string | null;
};

type Board = {
    id: string;
    name: string;
    user_id: string;
    tag_id: string;
    created_at: Date;
    updated_at: Date;
};

type BoardRight = {
    id: string;
    name: string;
};

type Tag = {
    id: string;
    color: string;
};

type BoardUserRight = {
    id: string;
    user_id: string;
    board_id: string;
    board_right_id: string;
};

type Column = {
    id: string;
    name: string;
    limit: number;
    board_id: string;
    ordr: number;
};

type Card = {
    id: string;
    name: string;
    description: string;
    column_id: string;
    ordr: number;
};

type Attachment = {
    id: string;
    url: string;
    card_id: string;
};

type TComment = {
    id: string;
    user_id: string;
    card_id: string;
    text: string;
};

export {
    type Attachment,
    type Board,
    type BoardRight,
    type BoardUserRight,
    type Card,
    type Column,
    type Tag,
    type TComment,
    type User,
};
