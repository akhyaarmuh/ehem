import { FaEdit } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import Table from './table';
import Create from './create';
import Delete from './delete';
import Pagination from './pagination';
import ModalsUpdate from './modals-update';
import { Button } from '../../../components';
import { toRupiah } from '../../../utilities';
import { ICategory } from '../../../types/ICategory';
import { getAllCategory } from '../../../api/categories';

const idFormUpdate = 'form-update-category';
const idModalsUpdate = 'update-category';
const initialDataSelected = { id: '', name: '' };

const Categories = () => {
  const [params, setParams] = useSearchParams();

  const [data, setData] = useState<ICategory[]>([]);
  const [rows, setRows] = useState(0);
  const [pages, setPages] = useState(0);
  const [queries, setQueries] = useState<any>({
    name: params.get('name') || '',
    limit: 20,
    page: Number(params.get('page')) || 1,
  });
  const [dataSelected, setDataSelected] = useState<ICategory>(initialDataSelected);

  useEffect(() => {
    const fetchAll = async () => {
      await getCategories();
    };

    for (const property in queries) {
      if (queries[property]) {
        params.set(property, queries[property]);
      } else {
        params.delete(property);
      }
    }
    setParams(params);

    fetchAll();
  }, [queries]);

  const getCategories = async () => {
    try {
      const { data, rows, pages } = await getAllCategory(queries);
      setData(data);
      setRows(rows);
      setPages(pages);
    } catch (error: any) {
      console.log('getCategories: ', error.message);
    }
  };

  const changeQueries = (key: string, value: string | number) => {
    if (key === 'page') {
      setQueries({ ...queries, page: value });
    } else setQueries({ ...queries, [key]: value, page: 1 });
  };

  const showModalsUpdate = (data: ICategory) => {
    setDataSelected(data);
    (window as any)[idModalsUpdate].show();

    const form = document.querySelector(`#${idFormUpdate}`) as HTMLFormElement;
    (form.elements[0] as HTMLInputElement).focus();
  };

  return (
    <>
      <Create fetchData={getCategories} />
      <Table changeQueries={changeQueries}>
        {data.map((item, i) => (
          <tr key={item.id}>
            <td>{toRupiah((queries.page - 1) * queries.limit + i + 1)}</td>
            <td>{item.name}</td>
            <td className="flex justify-end gap-1">
              <Button
                outline
                color="info"
                size="xs"
                onClick={() => showModalsUpdate(item)}
              >
                <FaEdit />
              </Button>
              <Delete id={item.id} name={item.name} fetchData={getCategories} />
            </td>
          </tr>
        ))}
      </Table>
      <Pagination
        page={queries.page}
        pages={pages}
        rows={rows}
        setPage={(toPage) => changeQueries('page', toPage)}
      />
      <ModalsUpdate
        data={dataSelected}
        fetchData={getCategories}
        idModals={idModalsUpdate}
        idForm={idFormUpdate}
      />
    </>
  );
};

export default Categories;
