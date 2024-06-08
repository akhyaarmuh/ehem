import { useState, FormEvent, useEffect, ChangeEvent } from 'react';

import { getAllCategory } from '../../../../api/categories';
import { updateProductById } from '../../../../api/products';
import { rupiahToInt, toRupiah } from '../../../../utilities';
import { Input, Button, MySelect } from '../../../../components';
import { IProduct, IUpdateProduct } from '../../../../types/IProduct';

const initialPayload: IUpdateProduct = {
  name: '',
  category_id: '',
  description: '',
  min_stock: 0,
};
const initialErrorPayload = {
  name: '',
  category_id: '',
  description: '',
  min_stock: '',
};

interface FormProductProps {
  data: IProduct;
  idModals: string;
  idForm: string;
  fetchData: () => Promise<void>;
}

const FormProduct: React.FC<FormProductProps> = (props) => {
  const { data, idModals, idForm, fetchData } = props;

  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState<any>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [payload, setPayload] = useState(initialPayload);
  const [errorPayload, setErrorPayload] = useState(initialErrorPayload);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const getAll = async () => {
      await getCategories();
    };

    getAll();
  }, []);

  useEffect(() => {
    setErrorMessage('');
    setErrorPayload(initialErrorPayload);

    setPayload({
      name: data.name,
      category_id: data.category.id,
      description: data.description || '',
      min_stock: data.min_stock,
    });
    setCategory([{ value: data.category.id, label: data.category.name }]);
  }, [data]);

  const getCategories = async () => {
    const { data } = await getAllCategory({ limit: 0 });
    const categories: any = data.map((item) => ({ label: item.name, value: item.id }));
    setCategories(categories);
  };

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;

    setErrorPayload({ ...errorPayload, [name]: '' });

    if (name === 'min_stock') {
      setPayload({ ...payload, [name]: rupiahToInt(value) });
    } else setPayload({ ...payload, [name]: value });
  };

  const handelChangeSelect = (e: any) => {
    setErrorPayload({ ...errorPayload, category_id: '' });
    setPayload({ ...payload, category_id: e.value });
    setCategory(e);
  };

  const handleUpdate = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await updateProductById(data.id, payload);
      await fetchData();
      (window as any)[idModals].close();
    } catch (error: any) {
      if (error.statusCode === 422) setErrorPayload({ ...errorPayload, ...error.data });
      else setErrorMessage(error.message);
    }

    setIsSubmitting(false);
  };

  return (
    <form id={idForm} onSubmit={handleUpdate}>
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
          onChange={handelChangeSelect}
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
          label={`Minimal Stok (${data.product_unit_details[0]?.unit.name})`}
          name="min_stock"
          placeholder="Minimal stok dalam satuan  terkecil..."
          autoComplete="off"
          disabled={isSubmitting}
          onChange={handleChangeInput}
          value={toRupiah(payload.min_stock, false)}
          error={errorPayload.min_stock}
        />
      </div>

      {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}

      <div className="modal-action">
        <Button size="sm" color="primary" disabled={isSubmitting}>
          Ubah
        </Button>
      </div>
    </form>
  );
};

export default FormProduct;
