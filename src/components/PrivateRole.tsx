import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from './button';
import { useAppSelector } from '../redux/hooks';

type Role = 'owner' | 'admin' | 'cashier';
interface PrivateRoleProps {
  roles: Role[];
  children: React.ReactElement;
}

const PrivateRole: React.FC<PrivateRoleProps> = ({ roles, children }) => {
  const navigate = useNavigate();
  const role = useAppSelector((state) => state.user.role);

  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    if (roles) {
      const isAccess = roles.includes(role);
      isAccess ? setIsVerified(true) : setIsVerified(false);
    }
  }, [roles]);

  if (!isVerified)
    return (
      <div className="fixed top-0 bottom-0 left-0 right-0 z-30 flex items-center justify-center">
        Halaman ini tidak tersedia untuk anda.
        <Button color="link" onClick={() => navigate(-1)}>
          Kembali
        </Button>
      </div>
    );

  return children;
};

export default PrivateRole;
