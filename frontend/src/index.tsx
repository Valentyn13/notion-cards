import '~/assets/css/styles.scss';

import { createRoot } from 'react-dom/client';

import { Auth } from '~/bundles/auth/pages/auth';
import {
    App,
    RouterProvider,
    StoreProvider,
} from '~/bundles/common/components/components';
import { AppRoute } from '~/bundles/common/enums/enums';
import { store } from '~/framework/store/store';

import { GuestRoute } from './bundles/common/components/guest-route/guest-route';

createRoot(document.querySelector('#root') as HTMLElement).render(
        <StoreProvider store={store.instance}>
            <RouterProvider
                routes={[
                    {
                        path: AppRoute.ROOT,
                        element: <App />,
                        children: [                            
                            {
                                path: AppRoute.ROOT,
                                element: 'Root',
                            },
                            {
                                path: AppRoute.ROOT,
                                element:<GuestRoute/>,
                                children:[
                                    {
                                        path: AppRoute.SIGN_IN,
                                        element: <Auth />,
                                    },
                                    {
                                        path: AppRoute.SIGN_UP,
                                        element: <Auth />,
                                    },
                                ]
                            },

                        ],
                    },
                ]}
            />
        </StoreProvider>
);
