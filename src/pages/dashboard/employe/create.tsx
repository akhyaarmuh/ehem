import { IoMdAdd } from 'react-icons/io';
import { useState, ChangeEvent, FormEvent } from 'react';

import { createEmploye } from '../../../api/employe';
import { ICreateEmploye } from '../../../types/IEmploye';
import { Button, Input, Modals, MySelect } from '../../../components';

const initialPayload: ICreateEmploye = {
  full_name: '',
  email: '',
  password: '',
  role: 'admin',
};
const idModals = 'create-employe';
const idForm = 'form-create-employe';
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
  const [payload, setPayload] = useState(initialPayload);
  const [errorPayload, setErrorPayload] = useState({
    email: '',
    full_name: '',
    password: '',
    role: '',
  });
  const [role, setRole] = useState({ value: 'admin', label: 'Admin' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setErrorPayload({ ...errorPayload, [e.target.name]: '' });
    setPayload({ ...payload, [e.target.name]: e.target.value });
  };

  const handleChangeRole = (e: any) => {
    if (e.value === 'cashier' || e.value === 'admin') setRole(e);
    setPayload({ ...payload, role: e.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await createEmploye(payload);
      await fetchData();
      handleModals('close');
      setPayload(initialPayload);
      setRole({ value: 'admin', label: 'Admin' });
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
        color="primary"
        onClick={() => {
          setErrorMessage('');
          handleModals('open');
        }}
      >
        <IoMdAdd size={20} />
        Karyawan
      </Button>

      <Modals idModals={idModals} isSubmitting={isSubmitting}>
        <h3>Tambah Karyawan</h3>

        <form id={idForm} onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 tablet:grid-cols-[repeat(auto-fit,_minmax(45%,_1fr))] gap-2 gap-x-4">
            <Input
              required
              type="text"
              label="Nama Lengkap"
              name="full_name"
              placeholder="Masukan nama lengkap karyawan..."
              autoComplete="off"
              disabled={isSubmitting}
              onChange={handleChangeInput}
              value={payload.full_name}
              error={errorPayload.full_name}
            />
            <Input
              required
              type="text"
              label="Email"
              name="email"
              placeholder="Masukan email karyawan..."
              autoComplete="off"
              disabled={isSubmitting}
              onChange={handleChangeInput}
              value={payload.email}
              error={errorPayload.email}
            />
            <Input
              required
              type="password"
              label="Katasandi"
              name="password"
              placeholder="Masukan katasandi..."
              autoComplete="off"
              disabled={isSubmitting}
              onChange={handleChangeInput}
              value={payload.password}
              error={errorPayload.password}
            />

            <MySelect<{ value: string; label: string }>
              label="Role"
              name="role"
              required
              placeholder="Role karyawan..."
              options={[
                { value: 'admin', label: 'Admin' },
                { value: 'cashier', label: 'Kasir' },
              ]}
              value={role}
              error={errorPayload.role}
              onChange={handleChangeRole}
            />
          </div>

          {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}

          <div className="modal-action">
            <Button size="sm" color="primary" disabled={isSubmitting}>
              Simpan
            </Button>
          </div>
        </form>
      </Modals>
    </>
  );
};

export default Create;
