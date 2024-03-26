import  { type UserSignInRequestDto } from 'shared/build/index.js';

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

    const handleSignInSubmit = useCallback((event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const signInData = {
            email: data.get('email'),
            password: data.get('password'),
        } as UserSignInRequestDto;
        void dispatch(authActions.logIn(signInData));
      }, [dispatch]);

    const handleSignUpSubmit = useCallback(
        (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const data = new FormData(event.currentTarget);
            const signUpData = {
                email: data.get('email'),
                password: data.get('password'),
                firstName: data.get('firstName'),
                lastName: data.get('lastName')
            } as UserSignUpRequestDto;
            void dispatch(authActions.signUp(signUpData));
          },
        [dispatch]);

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
