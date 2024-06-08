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
import { ICustomer } from '../../../types/ICustomer';
import { getAllCustomer } from '../../../api/customers';

const idModalsUpdate = 'update-customer';
const idFormUpdate = 'form-update-customer';
const initialDataSelected = { id: '', full_name: '', address: '' };

const Customers = () => {
  const [params, setParams] = useSearchParams();

  const [data, setData] = useState<ICustomer[]>([]);
  const [rows, setRows] = useState(0);
  const [pages, setPages] = useState(0);
  const [queries, setQueries] = useState<any>({
    name: params.get('full_name') || '',
    limit: 20,
    page: Number(params.get('page')) || 1,
  });
  const [dataSelected, setDataSelected] = useState<ICustomer>(initialDataSelected);

  useEffect(() => {
    const fetchAll = async () => {
      await getCustomers();
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

  const getCustomers = async () => {
    try {
      const { data, rows, pages } = await getAllCustomer(queries);
      setData(data);
      setRows(rows);
      setPages(pages);
    } catch (error: any) {
      console.log('getCustomers: ', error.message);
    }
  };

  const changeQueries = (key: string, value: string | number) => {
    if (key === 'page') {
      setQueries({ ...queries, page: value });
    } else setQueries({ ...queries, [key]: value, page: 1 });
  };

  const showModalsUpdate = (data: ICustomer) => {
    setDataSelected(data);
    (window as any)[idModalsUpdate].show();

    const form = document.querySelector(`#${idFormUpdate}`) as HTMLFormElement;
    (form.elements[0] as HTMLInputElement).focus();
  };

  return (
    <>
      <Create fetchData={getCustomers} />
      <Table changeQueries={changeQueries}>
        {data.map((item, i) => (
          <tr key={item.id}>
            <td>{toRupiah((queries.page - 1) * queries.limit + i + 1)}</td>
            <td>{item.full_name}</td>
            <td>{item.address}</td>
            <td className="flex justify-end gap-1">
              <Button
                outline
                color="info"
                size="xs"
                onClick={() => showModalsUpdate(item)}
              >
                <FaEdit />
              </Button>
              <Delete id={item.id} name={item.full_name} fetchData={getCustomers} />
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
        fetchData={getCustomers}
        idModals={idModalsUpdate}
        idForm={idFormUpdate}
      />
    </>
  );
};

export default Customers;
