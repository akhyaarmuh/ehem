import { FaTrash } from 'react-icons/fa';

import { mySwal } from '../../utilities';
import { Button } from '../../components';
import { deleteShopById } from '../../api/shops';

interface DeleteProps {
  id: string;
  name: string;
  fetchData: () => Promise<void>;
}

const Delete: React.FC<DeleteProps> = ({ id, name, fetchData }) => {
  const handleDelete = () => {
    mySwal
      .fire({
        title: `Toko '${name}' akan dihapus`,
        text: 'Anda yakin akan melanjutkannya? Semua data produk pada toko ini akan hilang!',
        icon: 'question',
        confirmButtonText: 'Ya, hapus',
        denyButtonText: 'Tidak',
        showDenyButton: true,
        showLoaderOnConfirm: true,
        allowOutsideClick: () => !mySwal.isLoading(),
        preConfirm: () => {
          return (async () => {
            try {
              await deleteShopById(id);
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
            title: 'Toko berhasil dihapus',
            timer: 1500,
          });
        }
      });
  };

  return (
    <Button size="sm" color="neutral" onClick={handleDelete}>
      <FaTrash />
    </Button>
  );
};

export default Delete;
