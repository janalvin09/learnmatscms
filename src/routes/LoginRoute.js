import { Outlet, Navigate } from 'react-router-dom'
import { useUserStore } from 'src/store/auth';

const LoginRoutes = () => {
  const { user } = useUserStore((state) => ({
    user: state.user,
  }));

  return (
    !user ? <Outlet /> : <Navigate to="/dashboard" />
  )
}


export default LoginRoutes