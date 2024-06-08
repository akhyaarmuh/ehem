import * as react from 'react';
import { IoMdAdd } from 'react-icons/io';

import FormProduct from './form-product';
import FormProductUnit from './form-product-unit';
import FormProductStock from './form-product-stock';
import { rupiahToInt } from '../../../../utilities';
import { Button, Modals } from '../../../../components';
import { createProduct } from '../../../../api/products';
import { ICreateProduct } from '../../../../types/IProduct';

const initialPayload: ICreateProduct = {
  name: '',
  category_id: '',
  description: '',
  min_stock: 0,
  unit_detail: [],
  stock_detail: [],
};
const initialErrorPayload = {
  name: '',
  category_id: '',
  description: '',
  min_stock: '',
};
const idModals = 'create-product';
const idForm = 'form-create-product';
const handleModals = (action: 'open' | 'close') => {
  if (action === 'open') {
    (window as any)[idModals].showModal();

    const form = document.querySelector(`#${idForm}`) as HTMLFormElement;
    (form.elements[0] as HTMLInputElement).focus();
  } else {
    (window as any)[idModals].close();
  }
};

interface CreateProps {
  fetchData: () => Promise<void>;
}

const Create: React.FC<CreateProps> = ({ fetchData }) => {
  const childRef = react.useRef();

  const [payload, setPayload] = react.useState(initialPayload);
  const [errorPayload, setErrorPayload] = react.useState<any>(initialErrorPayload);
  const [unitSelected, setUnitSelected] = react.useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = react.useState(false);
  const [errorMessage, setErrorMessage] = react.useState('');

  const changeSelect = (name: 'category' | 'unit', value: any) => {
    if (name === 'category') {
      setErrorPayload({ ...errorPayload, category_id: '' });
      setPayload({ ...payload, category_id: value.value });
    } else if (name === 'unit') {
      setUnitSelected(value.map((item: any) => item.label));
      setPayload({
        ...payload,
        unit_detail: value.map((item: any, i: number) => ({
          unit_id: item.value,
          code: '',
          quantity: !i ? 1 : 0,
          price: 0,
          sale_price: 0,
        })),
      });
    }
  };

  const changeInput = (name: string, value: string) => {
    setErrorPayload({ ...errorPayload, [name]: '' });

    if (name === 'min_stock') {
      setPayload({ ...payload, [name]: rupiahToInt(value) });
    } else setPayload({ ...payload, [name]: value });
  };

  const changeDetailUnit = (name: string, value: string, i: number) => {
    if (name === 'quantity') {
      setErrorPayload({
        ...errorPayload,
        [`unit_detail[${i}].quantity`]: '',
      });
      setPayload({
        ...payload,
        unit_detail: payload.unit_detail.map((item, index) => ({
          ...item,
          quantity: index === i ? rupiahToInt(value) : item.quantity,
        })),
      });
    } else if (name === 'code') {
      setErrorPayload({ ...errorPayload, [`unit_detail[${i}].code`]: '' });
      setPayload({
        ...payload,
        unit_detail: payload.unit_detail.map((item, index) => ({
          ...item,
          code: index === i ? value : item.code,
        })),
      });
    } else if (name === 'price') {
      setErrorPayload({
        ...errorPayload,
        [`unit_detail[${i}].price`]: '',
      });
      setPayload({
        ...payload,
        unit_detail: payload.unit_detail.map((item, index) => ({
          ...item,
          price: index === i ? rupiahToInt(value) : item.price,
        })),
      });
    } else if (name === 'sale_price') {
      setErrorPayload({
        ...errorPayload,
        [`unit_detail[${i}].sale_price`]: '',
      });
      setPayload({
        ...payload,
        unit_detail: payload.unit_detail.map((item, index) => ({
          ...item,
          sale_price: index === i ? rupiahToInt(value) : item.sale_price,
        })),
      });
    }
  };

  const changeDetailStock = (type: string, i?: number, name?: string, value?: string) => {
    if (type === 'add') {
      setPayload({
        ...payload,
        stock_detail: [...payload.stock_detail, { stock: 0, capital: 0 }],
      });
    } else if (type === 'delete') {
      setPayload({
        ...payload,
        stock_detail: payload.stock_detail.filter((_item, ind) => ind !== i),
      });
    } else {
      if (name === 'stock') {
        setErrorPayload({
          ...errorPayload,
          [`stock_detail[${i}].stock`]: '',
        });
        setPayload({
          ...payload,
          stock_detail: payload.stock_detail.map((item, index) => ({
            ...item,
            stock: index === i ? rupiahToInt(value!) : item.stock,
          })),
        });
      } else if (name === 'capital') {
        setErrorPayload({
          ...errorPayload,
          [`stock_detail[${i}].capital`]: '',
        });
        setPayload({
          ...payload,
          stock_detail: payload.stock_detail.map((item, index) => ({
            ...item,
            capital: index === i ? rupiahToInt(value!) : item.capital,
          })),
        });
      }
    }
  };

  const handleSubmit = async (e: react.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await createProduct(payload);
      await fetchData();
      handleModals('close');
      setPayload(initialPayload);
      if (childRef.current) {
        const childElement = childRef.current as any;
        childElement.resetSelectOption();
      }
      setErrorMessage('');
    } catch (error: any) {
      if (error.statusCode === 422) setErrorPayload({ ...errorPayload, ...error.data });
      else setErrorMessage(error.message);
    }

    setIsSubmitting(false);
  };

  return (
    <>
      <Button
        size="sm"
        color="primary"
        onClick={() => {
          setErrorMessage('');
          handleModals('open');
        }}
      >
        <IoMdAdd size={20} />
        Produk
      </Button>

      <Modals idModals={idModals} isSubmitting={isSubmitting}>
        <h3>Tambah Produk</h3>

        <form id={idForm} onSubmit={handleSubmit}>
          <FormProduct
            ref={childRef}
            isSubmitting={isSubmitting}
            payload={payload}
            errorPayload={errorPayload}
            changeInput={changeInput}
            changeSelect={changeSelect}
          />

          <FormProductUnit
            payload={payload}
            errorPayload={errorPayload}
            unitSelected={unitSelected}
            changeDetailUnit={changeDetailUnit}
          />

          <FormProductStock
            payload={payload}
            errorPayload={errorPayload}
            unitSelected={unitSelected}
            changeDetailStock={changeDetailStock}
          />

          {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}
          <div className="modal-action">
            <Button size="sm" color="primary" disabled={isSubmitting}>
              Simpan
            </Button>
          </div>
        </form>
      </Modals>
    </>
  );
};

export default Create;
