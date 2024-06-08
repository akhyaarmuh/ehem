import { FaEdit } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import Table from './table';
import Create from './create';
import Delete from './delete';
import Pagination from './pagination';
import ModalsUpdate from './modals-update';
import { IUnit } from '../../../types/IUnit';
import { Button } from '../../../components';
import { toRupiah } from '../../../utilities';
import { getAllUnit } from '../../../api/units';

const idFormUpdate = 'form-update-unit';
const idModalsUpdate = 'update-unit';
const initialDataSelected = { id: '', name: '' };

const Units = () => {
  const [params, setParams] = useSearchParams();

  const [data, setData] = useState<IUnit[]>([]);
  const [rows, setRows] = useState(0);
  const [pages, setPages] = useState(0);
  const [queries, setQueries] = useState<any>({
    name: params.get('name') || '',
    limit: 20,
    page: Number(params.get('page')) || 1,
  });
  const [dataSelected, setDataSelected] = useState<IUnit>(initialDataSelected);

  useEffect(() => {
    const fetchAll = async () => {
      await getUnits();
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

  const getUnits = async () => {
    try {
      const { data, rows, pages } = await getAllUnit(queries);
      setData(data);
      setRows(rows);
      setPages(pages);
    } catch (error: any) {
      console.log('getUnits: ', error.message);
    }
  };

  const changeQueries = (key: string, value: string | number) => {
    if (key === 'page') {
      setQueries({ ...queries, page: value });
    } else setQueries({ ...queries, [key]: value, page: 1 });
  };

  const showModalsUpdate = (data: IUnit) => {
    setDataSelected(data);
    (window as any)[idModalsUpdate].show();

    const form = document.querySelector(`#${idFormUpdate}`) as HTMLFormElement;
    (form.elements[0] as HTMLInputElement).focus();
  };

  return (
    <>
      <Create fetchData={getUnits} />

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
              <Delete id={item.id} name={item.name} fetchData={getUnits} />
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
        fetchData={getUnits}
        idModals={idModalsUpdate}
        idForm={idFormUpdate}
      />
    </>
  );
};

export default Units;
