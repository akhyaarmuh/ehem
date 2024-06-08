import { ChangeEvent, KeyboardEvent } from 'react';

import { Input } from '../../../../components';
import { toRupiah } from '../../../../utilities';

interface FormProductUnitProps {
  payload: any;
  errorPayload: any;
  unitSelected: string[];
  changeDetailUnit: (name: string, value: string, i: number) => void;
}

const FormProductUnit: React.FC<FormProductUnitProps> = (props) => {
  const { payload, unitSelected, errorPayload, changeDetailUnit } = props;

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const name = e.target.dataset.name || '';
    const value = e.target.value;

    changeDetailUnit(name, value, index);
  };

  if (payload.unit_detail[0])
    return (
      <>
        <h6 className="mb-0">Detil Satuan</h6>
        {payload.unit_detail.map((item: any, i: number) => (
          <div className="flex flex-col laptop:flex-row gap-2" key={i}>
            <Input
              inputSize="sm"
              type="text"
              data-name="quantity"
              disabled={i === 0 ? true : false}
              placeholder={`Berapa ${unitSelected[0]} dalam ${unitSelected[i]}`}
              autoComplete="off"
              value={toRupiah(item.quantity, false)}
              error={errorPayload[`unit_detail[${i}].quantity`]}
              onChange={(e) => handleChangeInput(e, i)}
            />
            <Input
              inputSize="sm"
              type="text"
              data-name="code"
              placeholder={`Kode produk (${unitSelected[i]})`}
              autoComplete="off"
              value={item.code}
              error={errorPayload[`unit_detail[${i}].code`]}
              onChange={(e) => handleChangeInput(e, i)}
              onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
                if (e.key === 'Enter') e.preventDefault();
              }}
            />
            <Input
              inputSize="sm"
              type="text"
              data-name="price"
              placeholder={`Harga jual (${unitSelected[i]})`}
              autoComplete="off"
              value={toRupiah(item.price, false)}
              error={errorPayload[`unit_detail[${i}].price`]}
              onChange={(e) => handleChangeInput(e, i)}
            />
            <Input
              inputSize="sm"
              type="text"
              data-name="sale_price"
              placeholder={`Harga partai (${unitSelected[i]})`}
              autoComplete="off"
              value={toRupiah(item.sale_price, false)}
              error={errorPayload[`unit_detail[${i}].sale_price`]}
              onChange={(e) => handleChangeInput(e, i)}
            />
          </div>
        ))}
      </>
    );
};

export default FormProductUnit;
