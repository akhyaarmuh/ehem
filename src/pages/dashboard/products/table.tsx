import { useSearchParams } from 'react-router-dom';
import { useState, ChangeEvent, KeyboardEvent, useEffect } from 'react';

import { getAllCategory } from '../../../api/categories';

interface TableProps {
  changeQueries: (key: string, value: string | number) => void;
  children: React.ReactNode;
}

const Table: React.FC<TableProps> = ({ changeQueries, children }) => {
  const [params] = useSearchParams();

  const [categories, setCategories] = useState([]);
  const [queries, setQueries] = useState<any>({
    category_id: params.get('category_id') || '',
    name: params.get('name') || '',
    code: params.get('code') || '',
  });

  useEffect(() => {
    const getAll = async () => {
      await getCategories();
    };

    getAll();
  }, []);

  const getCategories = async () => {
    const { data } = await getAllCategory({ limit: 0 });
    const categories: any = data.map((item) => ({ label: item.name, value: item.id }));
    setCategories(categories);
  };

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setQueries({ ...queries, [e.target.name]: e.target.value });
  };

  const handleChangeCategory = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setQueries({ ...queries, category_id: value });

    changeQueries('category_id', value);
  };

  const handleKeydownInput = (e: KeyboardEvent<HTMLInputElement>) => {
    const key = e.currentTarget.name;
    if (e.key === 'Enter') changeQueries(e.currentTarget.name, queries[key]);
  };

  return (
    <div className="overflow-x-auto mt-2">
      <table className="table table-pin-rows">
        <thead>
          <tr>
            <th></th>
            <th>
              <input
                className="input input-bordered input-sm w-full font-normal"
                autoComplete="off"
                name="name"
                autoFocus
                placeholder="Masukan nama produk..."
                value={queries.name}
                onChange={handleChangeInput}
                onKeyDown={handleKeydownInput}
              />
            </th>
            <th>
              <input
                className="input input-bordered input-sm w-full font-normal"
                autoComplete="off"
                name="code"
                placeholder="Masukan kode produk..."
                value={queries.code}
                onChange={handleChangeInput}
                onKeyDown={handleKeydownInput}
              />
            </th>
            <th>
              <select
                className="select select-bordered select-sm w-full font-normal"
                value={queries.category_id}
                onChange={handleChangeCategory}
              >
                <option value="">Semua</option>
                {categories.map((category: any, i) => (
                  <option value={category.value} key={i}>
                    {category.label}
                  </option>
                ))}
              </select>
            </th>
            <th></th>
          </tr>
          <tr>
            <th className="w-[30px]"></th>
            <th>Nama Produk</th>
            <th>Keterangan</th>
            <th>Kategori</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
};

export default Table;
