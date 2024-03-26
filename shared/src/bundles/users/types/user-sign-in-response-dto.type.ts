import  { type UserWithoutHashPasswords } from './user-without-hash-passwords.type';

type UserSignInResponseDto = {
    user: UserWithoutHashPasswords;
    accessToken: string;
    refreshToken: string;
};
export { type UserSignInResponseDto };