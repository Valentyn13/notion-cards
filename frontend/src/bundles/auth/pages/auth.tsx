import { type UserSignInRequestDto } from 'shared/build/index.js';

import { AppRoute } from '~/bundles/common/enums/enums.js';
import {
    useAppDispatch,
    useAppSelector,
    useCallback,
    useLocation,
} from '~/bundles/common/hooks/hooks.js';
import { type UserSignUpRequestDto } from '~/bundles/users/users.js';

import { SignInForm, SignUpForm } from '../components/components.js';
import { actions as authActions } from '../store/';

const Auth: React.FC = () => {
    const dispatch = useAppDispatch();
    const { dataStatus } = useAppSelector(({ auth }) => ({
        dataStatus: auth.dataStatus,
    }));
    const { pathname } = useLocation();

    const handleSignInSubmit = useCallback(
        (payload: UserSignInRequestDto) => {
            void dispatch(authActions.logIn(payload));
        },
        [dispatch],
    );

    const handleSignUpSubmit = useCallback(
        (payload: UserSignUpRequestDto) => {
            void dispatch(authActions.signUp(payload));
        },
        [dispatch],
    );

    const getScreen = (screen: string): React.ReactNode => {
        switch (screen) {
            case AppRoute.SIGN_IN: {
                return <SignInForm onSubmit={handleSignInSubmit} />;
            }
            case AppRoute.SIGN_UP: {
                return <SignUpForm onSubmit={handleSignUpSubmit} />;
            }
        }

        return null;
    };

    return (
        <>
            state: {dataStatus}
            {getScreen(pathname)}
        </>
    );
};

export { Auth };
