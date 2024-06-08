import { IoIosAddCircle } from 'react-icons/io';

import { Button } from '../../components';

const FormAddProduct = () => {
  return (
    <div className="p-4 bg-base-200 flex-1 rounded-md">
      <div className="flex items-center">
        <Button color="link">
          <IoIosAddCircle size={20} />
          <h6 className="my-0">Cari Produk</h6>
        </Button>
        <kbd className="kbd kbd-sm text-primary">F1</kbd>
      </div>
      <div className="flex items-center gap-2">
        <input
          autoFocus
          className="input input-bordered w-full input-sm"
          placeholder="Kode produk..."
        />
        <kbd className="kbd kbd-sm text-primary">esc</kbd>
      </div>
    </div>
  );
};

export default FormAddProduct;
