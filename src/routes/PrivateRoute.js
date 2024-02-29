import { Outlet, Navigate } from 'react-router-dom'
import { useUserStore } from 'src/store/auth';

const PrivateRoutes = () => {
  const { user } = useUserStore((state) => ({
    user: state.user,
  }));

  return (
    user ? <Outlet /> : <Navigate to="/login" />
  )
}


export default PrivateRoutes