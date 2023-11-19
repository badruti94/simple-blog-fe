import React from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import ErrorPage from '../error-page'
import Home from '../pages/home'
import Register from '../pages/register'
import Login from '../pages/login'
import PostDetail from '../pages/post-detail'
import AuthRoute from '../outlets/AuthRoute'
import Post from '../pages/post'
import PostAdd from '../pages/post-add'


const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />,
        errorElement: <ErrorPage />,
    },
    {
        path: '/register',
        element: <Register />,
    },
    {
        path: '/login',
        element: <Login />,
    },
    {
        path: '/post/:id',
        element: <PostDetail />,
    },
    {
        path: '/',
        element: <AuthRoute />,
        children: [
            {
                path: '/post',
                element: <Post />,
            },
            {
                path: '/post/add',
                element: <PostAdd />,
            },
            {
                path: '/post/edit/:id',
                element: <PostAdd />,
            },
        ],
    }
])


const Routes = () => {
    return (
        <RouterProvider router={router} />
    )
}

export default Routes