import { createAsyncThunk } from '@reduxjs/toolkit';
import  {
    type AuthError,
    type UserSignInRequestDto,
    type UserWithoutHashPasswords } from 'shared/build/index.js';

import { type AsyncThunkConfig } from '~/bundles/common/types/types.js';
import {
    type UserSignUpRequestDto,
} from '~/bundles/users/users.js';
import { storage as storageApi,StorageKey } from '~/framework/storage/storage.js';

import { name as sliceName } from './slice.js';

const signUp = createAsyncThunk<
    UserWithoutHashPasswords,
    UserSignUpRequestDto,
    AsyncThunkConfig
>(
    `${sliceName}/sign-up`,
    async (registerPayload, { extra, rejectWithValue }) => {
        try {
            const { authApi } = extra;
            const { user, token } = await authApi.signUp(registerPayload);

            await storageApi.set(StorageKey.ACCESS_TOKEN, token);  
                  
            return user;
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
            const { user, accessToken } = await authApi.logIn(logInPayload);

            await storageApi.set(StorageKey.ACCESS_TOKEN, accessToken);

            return user;
        } catch (error: unknown) {
            const { message, errorType } = error as AuthError;
            return rejectWithValue({ message, errorType });
        }
    },
);

const getUser = createAsyncThunk<
    UserWithoutHashPasswords,
    undefined,
    AsyncThunkConfig
>(`${sliceName}/get-user`,
async (_, { extra ,rejectWithValue }) =>{
    try {
        const { authApi } = extra;
        return await authApi.getUser();
    } catch (error) {
        const { message, errorType } = error as AuthError;
        return rejectWithValue({ message, errorType });
    }
});

export { getUser,logIn,signUp };
