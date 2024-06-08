import { ChangeEvent, FormEvent, useState } from 'react';

import { activateShopById } from '../../api/shops';
import { Button, Input, Modals } from '../../components';

const idModals = 'activate-shop';
const idForm = 'form-activate-shop';
const handleModals = (action: 'open' | 'close') => {
  if (action === 'open') {
    (window as any)[idModals].showModal();

    const form = document.querySelector(`#${idForm}`) as HTMLFormElement;
    (form.elements[0] as HTMLInputElement).focus();
  } else {
    (window as any)[idModals].close();
  }
};

interface ModalsActivateProps {
  id: string;
  fetchData: () => Promise<void>;
}

const ModalsActivate: React.FC<ModalsActivateProps> = ({ id, fetchData }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [payload, setPayload] = useState({ license_key: '' });
  const [errorPayload, setErrorPayload] = useState({ license_key: '' });
  const [errorMessage, setErrorMessage] = useState('');

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setErrorPayload({ ...errorPayload, [e.target.name]: '' });
    setPayload({ ...payload, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await activateShopById(id, payload);
      await fetchData();
      handleModals('close');
      setPayload({ license_key: '' });
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
        size="sm"
        color="neutral"
        onClick={() => {
          setErrorMessage('');
          handleModals('open');
        }}
      >
        Aktifkan Toko
      </Button>

      <Modals idModals={idModals} isSubmitting={isSubmitting}>
        <form id={idForm} onSubmit={handleSubmit}>
          <Input
            type="text"
            label="Kode Aktifasi"
            name="license_key"
            placeholder="Masukan kode aktifasi anda..."
            autoComplete="off"
            required
            value={payload.license_key}
            error={errorPayload.license_key}
            onChange={handleChangeInput}
          />

          {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}

          <div className="modal-action">
            <Button size="sm" color="primary" disabled={isSubmitting}>
              Aktifasi
            </Button>
          </div>
        </form>
      </Modals>
    </>
  );
};

export default ModalsActivate;
