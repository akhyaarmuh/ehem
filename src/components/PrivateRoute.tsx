import { useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useNavigate, useLocation } from 'react-router-dom';

import { Loading } from '.';
import { getAccessToken } from '../api/auth';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { signIn, setAccessToken } from '../redux/user/userSlice';

export interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const userId = useAppSelector((state) => state.user.id);
  const shop = useAppSelector((state) => state.user.shop);
  const pathShops = location.pathname.split('/')[1];

  useEffect(() => {
    const checkAuth = async () => {
      if (!userId) {
        try {
          const accessToken = await getAccessToken();

          const decoded: any = jwtDecode(accessToken!);
          dispatch(signIn(decoded));
          dispatch(setAccessToken({ exp: decoded.exp!, accessToken: accessToken! }));
        } catch (error: any) {
          console.log(error.message);
          navigate('/sign-in', { replace: true, state: { form: location } });
        }
      } else {
        if (!shop && pathShops !== 'shops')
          navigate('/shops', { replace: true, state: { form: location } });
      }
    };

    checkAuth();
  }, [userId, pathShops]);

  if ((!userId || !shop) && pathShops !== 'shops') return <Loading />;

  return children;
};

export default PrivateRoute;
