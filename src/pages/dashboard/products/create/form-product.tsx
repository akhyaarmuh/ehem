import { GroupBase } from 'react-select';
import { ChangeEvent, useEffect, useState, forwardRef, useImperativeHandle } from 'react';

import { toRupiah } from '../../../../utilities';
import { getAllUnit } from '../../../../api/units';
import { Input, MySelect } from '../../../../components';
import { getAllCategory } from '../../../../api/categories';

interface FormProductProps {
  ref: any;
  isSubmitting: boolean;
  payload: any;
  errorPayload: any;
  changeInput: (name: string, value: string) => void;
  changeSelect: (name: 'category' | 'unit', value: any) => void;
}

const FormProduct: React.FC<FormProductProps> = forwardRef((props, ref) => {
  const { isSubmitting, payload, errorPayload, ...rest } = props;

  const [categories, setCategories] = useState([]);
  const [units, setUnits] = useState([]);
  const [category, setCategory] = useState([]);
  const [unit, setUnit] = useState([]);

  useImperativeHandle(ref, () => ({
    resetSelectOption() {
      setCategory([]);
      setUnit([]);
    },
  }));

  useEffect(() => {
    const getAll = async () => {
      await getCategories();
      await getUnits();
    };

    getAll();
  }, []);

  const getCategories = async () => {
    const { data } = await getAllCategory({ limit: 0 });
    const categories: any = data.map((item) => ({ label: item.name, value: item.id }));
    setCategories(categories);
  };
  const getUnits = async () => {
    const { data } = await getAllUnit({ limit: 0 });
    const units: any = data.map((item) => ({ label: item.name, value: item.id }));
    setUnits(units);
  };

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;

    rest.changeInput(name, value);
  };

  const handelChangeSelect = (name: 'category' | 'unit', value: any) => {
    if (name === 'category') setCategory(value);
    else if (name === 'unit') setUnit(value);

    rest.changeSelect(name, value);
  };

  return (
    <div className="grid grid-cols-1 tablet:grid-cols-[repeat(auto-fit,_minmax(45%,_1fr))] gap-2 gap-x-4">
      <Input
        required
        type="text"
        label="Nama"
        name="name"
        placeholder="Masukan nama produk..."
        autoComplete="off"
        disabled={isSubmitting}
        onChange={handleChangeInput}
        value={payload.name}
        error={errorPayload.name}
      />
      <MySelect<{ value: string; label: string }>
        label="Kategori"
        name="category"
        required
        placeholder="Pilih kategori produk..."
        options={categories}
        value={category}
        error={errorPayload.category_id}
        onChange={(e: any) => handelChangeSelect('category', e)}
      />
      <Input
        type="text"
        label="Keterangan"
        name="description"
        placeholder="Keterangan produk..."
        autoComplete="off"
        disabled={isSubmitting}
        onChange={handleChangeInput}
        value={payload.description}
        error={errorPayload.description}
      />
      <Input
        type="text"
        label="Minimal Stok"
        name="min_stock"
        placeholder="Minimal stok dalam satuan  terkecil..."
        autoComplete="off"
        disabled={isSubmitting}
        onChange={handleChangeInput}
        value={toRupiah(payload.min_stock, false)}
        error={errorPayload.min_stock}
      />

      <MySelect<
        { value: string; label: string },
        true,
        GroupBase<{ value: string; label: string }>
      >
        name="unit"
        required
        label="Satuan Jual"
        placeholder="Pilih satuan jual produk..."
        isMulti
        options={units}
        value={unit}
        error={errorPayload.category_id}
        onChange={(e: any) => handelChangeSelect('unit', e)}
      />
    </div>
  );
});

export default FormProduct;
