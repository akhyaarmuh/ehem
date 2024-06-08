import { useState, useEffect, ChangeEvent } from 'react';

import * as IP from '../../../../types/IProduct';
import { Input, Button } from '../../../../components';
import { rupiahToInt, toRupiah, mySwal } from '../../../../utilities';
import { updateProductCodeById, updateProductPriceById } from '../../../../api/products';

interface FormProductUnitProps {
  data: IP.IProduct;
  fetchData: () => Promise<void>;
}

const FormProductUnit: React.FC<FormProductUnitProps> = ({ data, fetchData }) => {
  const unitDetail = data.product_unit_details;
  const [payloadCode, setPayloadCode] = useState<IP.IUpdateProductCode[]>([]);
  const [payloadPrice, setPayloadPrice] = useState<IP.IUpdateProductPrice[]>([]);
  const [errorPayloadCode, setErrorPayloadCode] = useState<any[]>([]);
  const [errorPayloadPrice, setErrorPayloadPrice] = useState<any[]>([]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setErrorMessage('');
    setErrorPayloadCode(unitDetail.map(() => ({ code: '' })));
    setErrorPayloadPrice(unitDetail.map(() => ({ price: '', sale_price: '' })));

    setPayloadCode(unitDetail.map((itm) => ({ code: itm.code })));
    setPayloadPrice(unitDetail.map((itm) => itm.price[0]));
  }, [data]);

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.dataset.name;
    const value = e.target.value;
    const index = Number(e.target.dataset.index);

    if (name === 'code') {
      setErrorPayloadCode(
        errorPayloadCode.map((itm, i) => ({ code: index === i ? '' : itm.code }))
      );
      setPayloadCode(
        payloadCode.map((itm, i) => ({ code: index === i ? value : itm.code }))
      );
    } else if (name === 'price') {
      setErrorPayloadPrice(
        errorPayloadPrice.map((itm, i) => ({
          ...itm,
          price: index === i ? '' : itm.price,
        }))
      );
      setPayloadPrice(
        payloadPrice.map((itm, i) => ({
          ...itm,
          price: index === i ? rupiahToInt(value) : itm.price,
        }))
      );
    } else if (name === 'sale_price') {
      setErrorPayloadPrice(
        errorPayloadPrice.map((itm, i) => ({
          ...itm,
          sale_price: index === i ? '' : itm.sale_price,
        }))
      );
      setPayloadPrice(
        payloadPrice.map((itm, i) => ({
          ...itm,
          sale_price: index === i ? rupiahToInt(value) : itm.sale_price,
        }))
      );
    }
  };

  const handleUpdateCode = async (i: number) => {
    setIsSubmitting(true);

    try {
      await updateProductCodeById(data.product_unit_details[i].id, payloadCode[i]);
      await fetchData();
      mySwal.fire({
        title: 'Berhasil',
        text: 'Kode produk berhasil diperbarui',
        icon: 'success',
        timer: 2000,
      });
    } catch (error: any) {
      if (error.statusCode === 422)
        setErrorPayloadCode(
          errorPayloadCode.map((itm, ind) => {
            if (ind === i) return { ...itm, ...error.data };
            return itm;
          })
        );
      else setErrorMessage(error.message);
    }

    setIsSubmitting(false);
  };

  const handleUpdatePrice = async (i: number) => {
    setIsSubmitting(true);

    try {
      await updateProductPriceById(data.product_unit_details[i].id, payloadPrice[i]);
      await fetchData();
      mySwal.fire({
        title: 'Berhasil',
        text: 'Harga produk berhasil diperbarui',
        icon: 'success',
        timer: 2000,
      });
    } catch (error: any) {
      if (error.statusCode === 422)
        setErrorPayloadPrice(
          errorPayloadPrice.map((itm, ind) => {
            if (ind === i) return { ...itm, ...error.data };
            return itm;
          })
        );
      else setErrorMessage(error.message);
    }

    setIsSubmitting(false);
  };

  return (
    <>
      {unitDetail.map((item, i) => {
        if (payloadCode[i])
          return (
            <div key={i}>
              <h6 className="mb-0">{item.unit.name}</h6>
              <div className="flex items-center gap-2">
                <div className="w-60">
                  <Input
                    label="Kode"
                    data-name="code"
                    data-index={i}
                    inputSize="sm"
                    type="text"
                    disabled={isSubmitting}
                    placeholder={`Kode produk (${item.unit.name})`}
                    autoComplete="off"
                    value={payloadCode[i].code}
                    error={errorPayloadCode[i].code}
                    onChange={handleChangeInput}
                  />
                </div>
                <Button
                  color="primary"
                  size="sm"
                  className="mt-[18px]"
                  onClick={() => handleUpdateCode(i)}
                >
                  Simpan
                </Button>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-60">
                  <Input
                    label="Harga"
                    data-name="price"
                    data-index={i}
                    inputSize="sm"
                    type="text"
                    disabled={isSubmitting}
                    placeholder={`Harga (${item.unit.name})`}
                    autoComplete="off"
                    value={toRupiah(payloadPrice[i].price || 0, false)}
                    error={errorPayloadPrice[i].price}
                    onChange={handleChangeInput}
                  />
                </div>
                <div className="w-60">
                  <Input
                    label="Harga Partai"
                    data-name="sale_price"
                    data-index={i}
                    inputSize="sm"
                    type="text"
                    disabled={isSubmitting}
                    placeholder={`Harga partai (${item.unit.name})`}
                    autoComplete="off"
                    value={toRupiah(payloadPrice[i].sale_price || 0, false)}
                    error={errorPayloadPrice[i].sale_price}
                    onChange={handleChangeInput}
                  />
                </div>
                <Button
                  color="primary"
                  size="sm"
                  className="mt-[18px]"
                  onClick={() => handleUpdatePrice(i)}
                >
                  Simpan
                </Button>
              </div>
            </div>
          );
        return '';
      })}

      {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}
      {/* </form> */}
    </>
  );
};

export default FormProductUnit;
