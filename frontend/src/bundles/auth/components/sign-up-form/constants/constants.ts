import { type UserSignUpRequestDto } from '~/bundles/users/users';

const DEFAULT_SIGN_UP_PAYLOAD: UserSignUpRequestDto = {
    email: '',
    password: '',
    lastName:'',
    firstName:'',
};

export { DEFAULT_SIGN_UP_PAYLOAD };