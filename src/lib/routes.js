import { createBrowserRouter } from "react-router-dom";
import Login from "../components/auth/Login";
import Signup from "../components/auth/Signup";
import Root from "../components/Root";
import Layout from "../components/layout/Layout";
import Profile from "../components/profile/Profile";
import Search from "../components/search/Search";
import Requests from "../components/requests/Requests";
import Dashboard from "../components/layout/Dashboard";

export const DASHBOARD = "/";
export const LOGIN = "/login";
export const SIGNUP = "/signup";
export const PROFILE = "/profile";
export const SEARCH = "/search";
export const REQUESTS = "/requests"

export const router = createBrowserRouter([
    { path: DASHBOARD, element: <Layout />, children: [
        { path: PROFILE, element: <Profile />},
        { path: SEARCH, element: <Search /> },
        { path: REQUESTS, element: <Requests />}
    ]},
    { path: LOGIN, element: <Login />},
    { path: SIGNUP, element: <Signup />},
]);