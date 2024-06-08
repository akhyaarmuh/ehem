import { FaTrash } from 'react-icons/fa';

import { mySwal } from '../../../utilities';
import { Button } from '../../../components';
import { deleteCustomerById } from '../../../api/customers';

interface DeleteProps {
  id: string;
  name: string;
  fetchData: () => Promise<void>;
}

const Delete: React.FC<DeleteProps> = ({ id, name, fetchData }) => {
  const handleDelete = () => {
    mySwal
      .fire({
        title: `Pelanggan '${name}' akan dihapus`,
        text: 'Anda yakin akan melanjutkannya?',
        icon: 'question',
        confirmButtonText: 'Ya, hapus',
        denyButtonText: 'Tidak',
        showDenyButton: true,
        showLoaderOnConfirm: true,
        allowOutsideClick: () => !mySwal.isLoading(),
        preConfirm: () => {
          return (async () => {
            try {
              await deleteCustomerById(id);
              await fetchData();
            } catch (error: any) {
              mySwal.showValidationMessage(error.message);
            }
          })();
        },
      })
      .then((res) => {
        if (res.isConfirmed) {
          mySwal.fire({
            icon: 'success',
            title: 'Pelanggan berhasil dihapus',
            timer: 1500,
          });
        }
      });
  };

  return (
    <Button outline color="error" size="xs" onClick={handleDelete}>
      <FaTrash />
    </Button>
  );
};

export default Delete;
