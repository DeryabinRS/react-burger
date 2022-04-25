import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../hooks/redux';

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  let location = useLocation();
  const { user } = useAppSelector(state => state.userSlice);

  if (!!!user) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return children;
};

export default PrivateRoute;