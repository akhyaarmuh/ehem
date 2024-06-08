import { useState, useEffect, ChangeEvent, FormEvent } from 'react';

import * as IP from '../../../../types/IProduct';
import { Input, Button } from '../../../../components';
import { updateProductStockById } from '../../../../api/products';
import { rupiahToInt, toRupiah, mySwal, getStockDetail } from '../../../../utilities';

interface FormProductUnitProps {
  data: IP.IProduct;
  fetchData: () => Promise<void>;
}

const FormProductStock: React.FC<FormProductUnitProps> = ({ data, fetchData }) => {
  const dataStockDetail = data.product_stock_details;
  const [payload, setPayload] = useState<IP.IUpdateProductStock>({ stock_detail: [] });
  const [errorPayload, setErrorPayload] = useState<any>({});

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setErrorMessage('');
    setErrorPayload({});

    setPayload({
      stock_detail: dataStockDetail.map((itm) => ({
        capital: itm.capital,
        stock: itm.stock,
      })),
    });
  }, [data]);

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.dataset.name;
    const value = e.target.value;
    const index = Number(e.target.dataset.index);

    if (name === 'stock') {
      setErrorPayload({ ...errorPayload, [`stock_detail[${index}].stock`]: '' });
      setPayload({
        stock_detail: payload.stock_detail.map((itm, i) => ({
          ...itm,
          stock: index === i ? rupiahToInt(value) : itm.stock,
        })),
      });
    } else if (name === 'capital') {
      setErrorPayload({ ...errorPayload, [`stock_detail[${index}].capital`]: '' });
      setPayload({
        stock_detail: payload.stock_detail.map((itm, i) => ({
          ...itm,
          capital: index === i ? rupiahToInt(value) : itm.capital,
        })),
      });
    }
  };

  const deleteStock = (i: number) => {
    setPayload({
      stock_detail: payload.stock_detail.filter((_item, ind) => ind !== i),
    });
  };

  const addStock = () => {
    setPayload({
      stock_detail: [...payload.stock_detail, { stock: 0, capital: 0 }],
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await updateProductStockById(data.id, payload);
      await fetchData();
      mySwal.fire({
        title: 'Berhasil',
        text: 'Data stok berhasil diperbarui',
        icon: 'success',
        timer: 2000,
      });
    } catch (error: any) {
      if (error.statusCode === 422) setErrorPayload({ ...errorPayload, ...error.data });
      else setErrorMessage(error.message);
    }

    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      {payload.stock_detail.map((item, i) => (
        <div className="flex items-center gap-2" key={i}>
          <div className="w-72">
            <Input
              label="Stok"
              data-name="stock"
              data-index={i}
              inputSize="sm"
              type="text"
              disabled={isSubmitting}
              placeholder="Jumlah stok dalam satuan terkecil..."
              autoComplete="off"
              value={toRupiah(item.stock, false)}
              error={errorPayload[`stock_detail[${i}].stock`]}
              onChange={handleChangeInput}
            />
          </div>
          <div className="w-72">
            <Input
              label="Modal"
              data-name="capital"
              data-index={i}
              inputSize="sm"
              type="text"
              disabled={isSubmitting}
              placeholder="Harga modal dalam satuan terbesar..."
              autoComplete="off"
              value={toRupiah(item.capital, false)}
              error={errorPayload[`stock_detail[${i}].capital`]}
              onChange={handleChangeInput}
            />
          </div>
          <Button
            color="error"
            type="button"
            size="sm"
            className="mt-[18px]"
            onClick={() => deleteStock(i)}
          >
            Hapus
          </Button>
        </div>
      ))}

      {getStockDetail(
        data,
        payload.stock_detail.reduce((acc, stc) => acc + stc.stock, 0)
      )}

      <span className="link link-primary block" onClick={addStock}>
        Tambah info stok
      </span>

      {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}

      <div className="modal-action">
        <Button size="sm" color="primary" disabled={isSubmitting}>
          Ubah
        </Button>
      </div>
    </form>
  );
};

export default FormProductStock;
