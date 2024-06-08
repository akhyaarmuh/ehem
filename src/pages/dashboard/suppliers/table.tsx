import { useSearchParams } from 'react-router-dom';
import { useState, ChangeEvent, KeyboardEvent } from 'react';

interface TableProps {
  changeQueries: (key: string, value: string | number) => void;
  children: React.ReactNode;
}

const Table: React.FC<TableProps> = ({ changeQueries, children }) => {
  const [params] = useSearchParams();

  const [queries, setQueries] = useState<any>({
    name: params.get('name') || '',
  });

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setQueries({ ...queries, [e.target.name]: e.target.value });
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
                placeholder="Masukan nama agen..."
                value={queries.full_name}
                onChange={handleChangeInput}
                onKeyDown={handleKeydownInput}
              />
            </th>
            <th></th>
            <th></th>
          </tr>
          <tr>
            <th className="w-[30px]"></th>
            <th>Nama Agen</th>
            <th>Alamat</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
};

export default Table;
