import  { type UserWithoutHashPasswords } from './user-without-hash-passwords.type';

type UserSignUpResponseDto = {
    user:UserWithoutHashPasswords,
    token: string
};

export { type UserSignUpResponseDto };
