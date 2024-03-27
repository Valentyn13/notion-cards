import { getUser,logIn,signUp } from './actions.js';
import { actions } from './slice.js';

const allActions = {
    ...actions,
    logIn,
    signUp,
    getUser
};

export { allActions as actions };
export { reducer } from './slice.js';
