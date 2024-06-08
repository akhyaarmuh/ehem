import { FormEvent, useState, ChangeEvent } from 'react';

import { createShop } from '../../api/shops';
import { Button, Modals, Input } from '../../components';

const initialPayload = { name: '', no_hp: '', address: '' };
const idModals = 'create-shop';
const idForm = 'form-create-shop';
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [payload, setPayload] = useState(initialPayload);
  const [errorPayload, setErrorPayload] = useState({ name: '', no_hp: '', address: '' });
  const [errorMessage, setErrorMessage] = useState('');

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setErrorPayload({ ...errorPayload, [e.target.name]: '' });
    setPayload({ ...payload, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await createShop(payload);
      await fetchData();
      handleModals('close');
      setPayload(initialPayload);
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
        color="link"
        onClick={() => {
          setErrorMessage('');
          handleModals('open');
        }}
      >
        Tambah toko
      </Button>

      <Modals idModals={idModals} isSubmitting={isSubmitting}>
        <h3 className="font-bold text-lg mb-4">Tambah Toko</h3>

        <form id={idForm} onSubmit={handleSubmit}>
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
              placeholder="Masukan no. handphone toko..."
              autoComplete="off"
              required
              value={payload.no_hp}
              error={errorPayload.no_hp}
              onChange={handleChangeInput}
            />
            <Input
              type="text"
              label="Alamat"
              name="address"
              placeholder="Masukan alamat toko..."
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
    </>
  );
};

export default Create;
