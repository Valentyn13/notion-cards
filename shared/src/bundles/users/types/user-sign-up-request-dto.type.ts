type UserSignUpRequestDto = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    avatar?: string | null;
};

export { type UserSignUpRequestDto };