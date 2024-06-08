import './style.css';

import { CgMenuHotdog } from 'react-icons/cg';
import { AiOutlinePoweroff } from 'react-icons/ai';

import { Button } from '../../../components';
import { signOut } from '../../../redux/user/userSlice';
import { signOut as apiSignOut } from '../../../api/auth';
import { useAppSelector, useAppDispatch } from '../../../redux/hooks';
import { mySwal } from '../../../utilities';

export interface HeaderProps {
  setExpanded: () => void;
}

const Header: React.FC<HeaderProps> = ({ setExpanded }) => {
  const dispatch = useAppDispatch();
  const full_name = useAppSelector((state) => state.user.full_name);

  const handleSignOut = async () => {
    mySwal.fire({
      title: `Keluar dari akun`,
      text: 'Anda yakin ingin keluar?',
      icon: 'question',
      confirmButtonText: 'Ya, keluar',
      denyButtonText: 'Tidak',
      showDenyButton: true,
      showLoaderOnConfirm: true,
      allowOutsideClick: () => !mySwal.isLoading(),
      preConfirm: () => {
        return (async () => {
          try {
            await apiSignOut();
            dispatch(signOut());
          } catch (error: any) {
            mySwal.showValidationMessage(error.message);
          }
        })();
      },
    });
  };

  return (
    <header
      className={`h-[60px] flex justify-between items-center sticky top-0 z-40 px-2 laptop:px-6
      `}
    >
      <div className="laptop:invisible">
        <Button color="ghost" size="sm" onClick={() => setExpanded()}>
          <CgMenuHotdog size={25} />
        </Button>
      </div>

      <div className="inline-flex items-center gap-2">
        <span className="max-w-[150px] overflow-hidden text-ellipsis whitespace-nowrap">
          {full_name}
        </span>
        <Button color="ghost" size="sm" onClick={handleSignOut}>
          <AiOutlinePoweroff size={25} />
        </Button>
      </div>
    </header>
  );
};

export default Header;
