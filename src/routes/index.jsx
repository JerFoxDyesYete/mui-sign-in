import Dashboard from '../Pages/Dashboard';
import Login from '../Pages/Login';
import SignUp from '../Pages/SignUp';

const routes = [
    {
        path: "/",
        element: <Login/>
    },
    {
        path: "/SignUp",
        element: <SignUp />
    },
    {
        path: '/Dashboard',
        element: <Dashboard/>
    }
];

export default routes;
