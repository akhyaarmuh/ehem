import { useState, useEffect, FormEvent, ChangeEvent } from 'react';

import { updateShopById } from '../../api/shops';
import { IShop, IUpdateShop } from '../../types/IShop';
import { Modals, Input, Button } from '../../components';

const initialPayload = { name: '', no_hp: '', address: '', foot_note: '', pole_note: '' };
const initialErrorPayload = {
  name: '',
  no_hp: '',
  address: '',
  foot_note: '',
  pole_note: '',
};

interface ModalsProps {
  data: IShop;
  fetchData: () => Promise<void>;
  idModals: string;
  idForm: string;
}

const ModalsUpdate: React.FC<ModalsProps> = ({ data, fetchData, idModals, idForm }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [payload, setPayload] = useState<IUpdateShop>(initialPayload);
  const [errorPayload, setErrorPayload] = useState(initialErrorPayload);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setErrorMessage('');
    setErrorPayload(initialErrorPayload);

    setPayload({
      name: data.name,
      no_hp: data.no_hp,
      address: data.address,
      foot_note: data.foot_note || '',
      pole_note: data.pole_note || '',
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
      await updateShopById(data.id, payload);
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
      <h3 className="font-bold text-lg mb-4">Ubah Data Toko</h3>

      <form id={idForm} onSubmit={handleUpdate}>
        <div className="grid grid-cols-1 tablet:grid-cols-[repeat(auto-fit,_minmax(45%,_1fr))] gap-2 gap-x-4">
          <Input
            type="text"
            label="Nama Toko"
            name="name"
            placeholder="Masukan nama toko..."
            autoComplete="off"
            required
            value={payload.name}
            error={errorPayload.name}
            onChange={handleChangeInput}
          />
          <Input
            type="text"
            label="No. Telepon"
            name="no_hp"
            placeholder="Masukan no. telepon..."
            autoComplete="off"
            required
            value={payload.no_hp}
            error={errorPayload.no_hp}
            onChange={handleChangeInput}
          />
          <Input
            type="text"
            label="Alamat Toko"
            name="address"
            placeholder="Masukan alamat toko..."
            autoComplete="off"
            required
            value={payload.address}
            error={errorPayload.address}
            onChange={handleChangeInput}
          />
          <Input
            type="text"
            label="Pesan Nota"
            name="foot_note"
            placeholder="Masukan pesan nota..."
            autoComplete="off"
            value={payload.foot_note}
            error={errorPayload.foot_note}
            onChange={handleChangeInput}
          />
          <Input
            type="text"
            label="Pesan Display"
            name="pole_note"
            placeholder="Masukan pesan pada pole display..."
            autoComplete="off"
            value={payload.pole_note}
            error={errorPayload.pole_note}
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
