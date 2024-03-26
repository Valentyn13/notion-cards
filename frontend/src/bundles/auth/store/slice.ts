import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import  { type AuthError,type UserWithoutHashPasswords  } from 'shared/build/index.js';

import { DataStatus } from '~/bundles/common/enums/enums.js';
import { type ValueOf } from '~/bundles/common/types/types.js';

import { logIn, signUp } from './actions.js';

type State = {
    user: UserWithoutHashPasswords | null
    dataStatus: ValueOf<typeof DataStatus>;
    error: null | AuthError;
};

const initialState: State = {
    user: null,
    dataStatus: DataStatus.IDLE,
    error: null
};

const { reducer, actions, name } = createSlice({
    initialState,
    name: 'auth',
    reducers: {},
    extraReducers(builder) {
        builder.addMatcher(isAnyOf(signUp.pending, logIn.pending),(state) =>{
            state.dataStatus = DataStatus.PENDING;
            state.error = null;
        });
        builder.addMatcher(isAnyOf(signUp.fulfilled, logIn.fulfilled),(state, action) =>{
            state.dataStatus = DataStatus.FULFILLED;
            state.user = action.payload;
            state.error = null;
        });
        builder.addMatcher(isAnyOf(signUp.rejected, logIn.rejected),(state, action) =>{
            state.dataStatus = DataStatus.REJECTED;
            state.error = action.payload as AuthError;
        });
    },
});

export { actions, name, reducer };
