import { Navigate, Outlet } from "react-router-dom"

const AuthRoute = () => {
    const isLogin = localStorage.getItem('login')

    return isLogin ? <Outlet /> : <Navigate to={'/login'} />
}

export default AuthRoute