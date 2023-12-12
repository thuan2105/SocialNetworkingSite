import config from '~/config';

// Page
import LoginPage from '~/scenes/LoginPage';
import HomePage from '~/scenes/HomePage';
import ProfilePage from '~/scenes/ProfilePage';

// Public routes
const publicRoutes = [
    {
        path: config.routes.login,
        component: LoginPage,
    },
];

// Private routes
const privateRoutes = [
    {
        path: config.routes.home,
        component: HomePage,
    },
    {
        path: config.routes.profile,
        component: ProfilePage,
    },
];

export { publicRoutes, privateRoutes };
