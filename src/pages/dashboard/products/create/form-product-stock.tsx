import { ChangeEvent } from 'react';

import { toRupiah } from '../../../../utilities';
import { Input, Button } from '../../../../components';

interface FormProductStockProps {
  payload: any;
  errorPayload: any;
  unitSelected: string[];
  changeDetailStock: (type: string, i?: number, name?: string, value?: string) => void;
}

const FormProductStock: React.FC<FormProductStockProps> = (props) => {
  const { payload, unitSelected, errorPayload, changeDetailStock } = props;

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const name = e.target.dataset.name || '';
    const value = e.target.value;

    changeDetailStock('', index, name, value);
  };

  const addDetailStock = () => {
    changeDetailStock('add');
  };

  const deleteStock = (i: number) => {
    changeDetailStock('delete', i);
  };

  if (payload.unit_detail[0])
    return (
      <>
        <h6 className="mb-0">Detil Info Satuan</h6>

        {payload.stock_detail.map((item: any, i: number) => (
          <div
            className="flex flex-col items-start laptop:flex-row laptop:items-center gap-2"
            key={i}
          >
            <Input
              inputSize="sm"
              type="text"
              data-name="stock"
              placeholder={`Jumlah stok dalam satuan ${
                unitSelected[unitSelected.length - 1]
              }`}
              autoComplete="off"
              value={toRupiah(item.stock, false)}
              error={errorPayload[`stock_detail[${i}].stock`]}
              onChange={(e) => handleChangeInput(e, i)}
            />
            <Input
              inputSize="sm"
              type="text"
              data-name="capital"
              placeholder={`Harga modal dalam satuan ${
                unitSelected[unitSelected.length - 1]
              }`}
              autoComplete="off"
              value={toRupiah(item.capital, false)}
              error={errorPayload[`stock_detail[${i}].capital`]}
              onChange={(e) => handleChangeInput(e, i)}
            />
            <Button size="sm" color="error" onClick={() => deleteStock(i)}>
              Hapus
            </Button>
          </div>
        ))}

        <span className="link link-primary" onClick={addDetailStock}>
          Tambah info stok
        </span>
      </>
    );
};

export default FormProductStock;
