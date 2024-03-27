import reactLogo from '~/assets/img/react.svg';
import { actions as authActions } from '~/bundles/auth/store';
import { Link, RouterOutlet } from '~/bundles/common/components/components.js';
import { AppRoute } from '~/bundles/common/enums/enums.js';
import {
    useAppDispatch,
    useEffect,
    useLocation,
} from '~/bundles/common/hooks/hooks.js';

const App: React.FC = () => {
    const { pathname } = useLocation();
    const dispatch = useAppDispatch();

    useEffect(() => {
        void dispatch(authActions.getUser());
    }, [dispatch]);

    return (
        <>
            <img src={reactLogo} className="App-logo" width="30" alt="logo" />

            <ul className="App-navigation-list">
                <li>
                    <Link to={AppRoute.ROOT}>Root</Link>
                </li>
                <li>
                    <Link to={AppRoute.SIGN_IN}>Sign in</Link>
                </li>
                <li>
                    <Link to={AppRoute.SIGN_UP}>Sign up</Link>
                </li>
            </ul>
            <p>Current path: {pathname}</p>

            <div>
                <RouterOutlet />
            </div>
        </>
    );
};

export { App };
