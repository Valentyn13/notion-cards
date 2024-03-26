import { createAsyncThunk } from '@reduxjs/toolkit';
import  {
    type AuthError,
    type UserSignInRequestDto,
    type UserWithoutHashPasswords } from 'shared/build/index.js';

import { type AsyncThunkConfig } from '~/bundles/common/types/types.js';
import {
    type UserSignUpRequestDto,
    type UserSignUpResponseDto,
} from '~/bundles/users/users.js';

import { name as sliceName } from './slice.js';

const signUp = createAsyncThunk<
    UserSignUpResponseDto,
    UserSignUpRequestDto,
    AsyncThunkConfig
>(
    `${sliceName}/sign-up`,
    async (registerPayload, { extra, rejectWithValue }) => {
        try {
            const { authApi } = extra;
            return await authApi.signUp(registerPayload);
        } catch (error: unknown) {
            const { message, errorType } = error as AuthError;
            return rejectWithValue({ message, errorType });
        }
    },
);

const logIn = createAsyncThunk<
UserWithoutHashPasswords,
UserSignInRequestDto,
    AsyncThunkConfig
>(
    `${sliceName}/log-in`,
    async (logInPayload, { extra, rejectWithValue }) => {
        try {
            const { authApi } = extra;
            const { user } = await authApi.logIn(logInPayload);
            return user;
        } catch (error: unknown) {
            const { message, errorType } = error as AuthError;
            return rejectWithValue({ message, errorType });
        }
    },
);

export { logIn,signUp };
