type UserWithoutHashPasswords = {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string;
    avatar?: string | null;
};

export { type UserWithoutHashPasswords };