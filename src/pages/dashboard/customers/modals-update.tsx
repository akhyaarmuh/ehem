import { useState, ChangeEvent, FormEvent, useEffect } from 'react';

import { Modals, Input, Button } from '../../../components';
import { updateCustomerById } from '../../../api/customers';
import { ICustomer, IUpdateCustomer } from '../../../types/ICustomer';

const initialPayload = { full_name: '', address: '' };
const initialErrorPayload = { full_name: '', address: '' };

interface ModalsProps {
  data: ICustomer;
  fetchData: () => Promise<void>;
  idModals: string;
  idForm: string;
}

const ModalsUpdate: React.FC<ModalsProps> = ({ data, fetchData, idModals, idForm }) => {
  const [id, setId] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [payload, setPayload] = useState<IUpdateCustomer>(initialPayload);
  const [errorPayload, setErrorPayload] = useState(initialErrorPayload);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setErrorMessage('');
    setErrorPayload(initialErrorPayload);

    setId(data.id);
    setPayload({
      full_name: data.full_name,
      address: data.address,
    });
  }, [data]);

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setErrorPayload({ ...errorPayload, [e.target.name]: '' });
    setPayload({ ...payload, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await updateCustomerById(id, payload);
      await fetchData();
      (window as any)[idModals].close();
    } catch (error: any) {
      if (error.statusCode === 422) setErrorPayload({ ...errorPayload, ...error.data });
      else setErrorMessage(error.message);
    }

    setIsSubmitting(false);
  };

  return (
    <Modals idModals={idModals} isSubmitting={isSubmitting}>
      <h3 className="font-bold text-lg mb-4">Ubah Data Pelanggan</h3>

      <form id={idForm} onSubmit={handleUpdate}>
        <div className="grid grid-cols-1 tablet:grid-cols-[repeat(auto-fit,_minmax(45%,_1fr))] gap-2 gap-x-4">
          <Input
            type="text"
            label="Nama Lengkap"
            name="full_name"
            placeholder="Masukan nama lengkap..."
            autoComplete="off"
            required
            value={payload.full_name}
            error={errorPayload.full_name}
            onChange={handleChangeInput}
          />
          <Input
            type="text"
            label="Alamat"
            name="address"
            placeholder="Masukan alamat pelanggan..."
            autoComplete="off"
            required
            value={payload.address}
            error={errorPayload.address}
            onChange={handleChangeInput}
          />
        </div>

        {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}

        <div className="modal-action">
          <Button size="sm" color="primary" disabled={isSubmitting}>
            Ubah
          </Button>
        </div>
      </form>
    </Modals>
  );
};

export default ModalsUpdate;
