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
import CommentEdit from '../components/comment-edit'
import ReplyEdit from '../components/reply-edit'
import PostSaved from '../pages/post-saved'


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
            {
                path: '/post/saved',
                element: <PostSaved />,
            },
            {
                path: '/comment/:id/edit',
                element: <CommentEdit />,
            },
            {
                path: '/reply/:id/edit',
                element: <ReplyEdit />,
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