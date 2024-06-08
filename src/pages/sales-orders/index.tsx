import { MdOutlinePayment } from 'react-icons/md';
import { AiOutlinePoweroff } from 'react-icons/ai';

import Header from './header';
import Options from './options';
import CartTable from './cart-table';
import PriceDetail from './price-detail';
import { Button } from '../../components';
import FormAddProduct from './form-add-product';
import { printNota } from '../../utilities/printer';
import { mySwal } from '../../utilities';

const SalesOrders = () => {
  const getPrinter = async () => {
    const _navigator: any = navigator;
    try {
      console.log(_navigator.bluetooth);
      const device = await _navigator.bluetooth.requestDevice({
        filters: [{ services: ['battery_service'] }],
      });
    } catch (error: any) {
      mySwal.fire(error.message);
    }
  };

  return (
    <div className="h-screen gap-2 flex flex-col">
      <Button onClick={getPrinter}>getDevice</Button>
      <Header />

      {/* input add product and total price cart */}
      <div className="flex flex-col-reverse tablet:flex-row px-2 gap-2">
        {/* kiri */}
        <FormAddProduct />

        {/* kanan */}
        <div className="p-4 bg-base-200 flex-1 flex flex-col justify-between rounded-md">
          <h5 className="my-0">Total Belanja</h5>
          <h1 className="my-0 text-right">Rp. 123.000</h1>
        </div>
      </div>

      {/* options, table, detail price total, logout, pay */}
      <div className="px-4 bg-base-200 flex-1 flex flex-col">
        <Options />

        <div className="flex flex-1 gap-2 max-h-[calc(100vh-282px)] laptop:max-h-[calc(100vh-346px)]">
          <CartTable />
          <PriceDetail />
        </div>

        {/* logout and pay */}
        <div className="flex gap-2 items-center py-2">
          <div className="flex-1">
            <Button color="ghost" size="sm">
              <AiOutlinePoweroff size={25} />
            </Button>
          </div>

          <div className="w-64">
            <Button color="primary" block>
              <MdOutlinePayment size={17} />
              Bayar <kbd className="kbd kbd-xs text-primary">F12</kbd>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesOrders;
