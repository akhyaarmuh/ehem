import { FaSave } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { IoMdPricetag } from 'react-icons/io';
import { MdLooksOne, MdShoppingCart } from 'react-icons/md';

import { Button } from '../../components';

const Options = () => {
  return (
    <div className="hidden laptop:flex py-4">
      <div className="border-r-[1px] border-base-content px-2">
        <Button size="sm" color="ghost">
          <h6 className="my-0 text-base">
            <MdShoppingCart size={17} />
          </h6>
          <h6 className="my-0 text-base">Keranjang Baru</h6>
          <kbd className="kbd kbd-sm text-primary">F4</kbd>
        </Button>
      </div>
      <div className="border-r-[1px] border-base-content px-4">
        <Button size="sm" color="ghost">
          <h6 className="my-0 text-base">
            <MdLooksOne size={17} />
          </h6>
          <h6 className="my-0 text-base">Jumlah</h6>
          <kbd className="kbd kbd-sm text-primary">F2</kbd>
        </Button>
      </div>
      <div className="border-r-[1px] border-base-content px-4">
        <Button size="sm" color="ghost">
          <h6 className="my-0 text-base">
            <MdDelete size={17} />
          </h6>
          <h6 className="my-0 text-base">Harga</h6>
          <kbd className="kbd kbd-sm text-primary">F3</kbd>
        </Button>
      </div>
      <div className="border-r-[1px] border-base-content px-4">
        <Button size="sm" color="ghost">
          <h6 className="my-0 text-base">
            <IoMdPricetag size={17} />
          </h6>
          <h6 className="my-0 text-base">Hapus</h6>
          <kbd className="kbd kbd-sm text-primary">delete</kbd>
        </Button>
      </div>
      <div className="border-r-[1px] border-base-content px-4">
        <Button size="sm" color="ghost">
          <h6 className="my-0 text-base">
            <FaSave size={17} />
          </h6>
          <h6 className="my-0 text-base">Draf</h6>
          <kbd className="kbd kbd-sm text-primary">ctrl+F12</kbd>
        </Button>
      </div>
      <div className="px-4">
        <Button size="sm" color="ghost">
          <h6 className="my-0 text-base">
            <FaSave size={17} />
          </h6>
          <h6 className="my-0 text-base">Buka Draf</h6>
          <kbd className="kbd kbd-sm text-primary">ctrl+F11</kbd>
        </Button>
      </div>
    </div>
  );
};

export default Options;
