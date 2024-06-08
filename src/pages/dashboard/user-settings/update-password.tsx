import { ChangeEvent, FormEvent, useState } from 'react';

import { mySwal } from '../../../utilities';
import { Button, Input, Modals } from '../../../components';
import { updateUserPasswordById } from '../../../api/users';

const idModals = 'update-password';
const idForm = 'form-update-password';
const handleModals = (action: 'open' | 'close') => {
  if (action === 'open') {
    (window as any)[idModals].showModal();

    const form = document.querySelector(`#${idForm}`) as HTMLFormElement;
    (form.elements[0] as HTMLInputElement).focus();
  } else {
    (window as any)[idModals].close();
  }
};

interface UpdatePasswordProps {
  id: string;
}

const UpdatePassword: React.FC<UpdatePasswordProps> = ({ id }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [payload, setPayload] = useState({ newPassword: '', password: '' });
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorPayload, setErrorPayload] = useState({ newPassword: '', password: '' });
  const [errorMessage, setErrorMessage] = useState('');

  const showModals = () => {
    setErrorMessage('');
    setErrorPayload({ newPassword: '', password: '' });
    setPayload({ newPassword: '', password: '' });
    setConfirmPassword('');
    handleModals('open');
  };

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setErrorPayload({ ...errorPayload, [e.target.name]: '' });
    setPayload({ ...payload, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await updateUserPasswordById(id, payload);
      setErrorMessage('');
      handleModals('close');
      mySwal.fire({
        title: 'Berhasil!',
        text: 'Katasandi anda telah diperbarui!',
        icon: 'success',
      });
    } catch (error: any) {
      if (error.statusCode === 422) setErrorPayload({ ...errorPayload, ...error.data });
      else setErrorMessage(error.message);
    }

    setIsSubmitting(false);
  };

  return (
    <>
      <Button block color="warning" onClick={showModals}>
        Perbarui Katasandi
      </Button>

      <Modals idModals={idModals}>
        <h3>Perbarui Katasandi</h3>

        <form id={idForm} onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 tablet:grid-cols-[repeat(auto-fit,_minmax(45%,_1fr))] gap-2 gap-x-4">
            <Input
              required
              type="text"
              label="Katasandi Baru"
              name="newPassword"
              placeholder="Katasandi baru..."
              autoComplete="off"
              disabled={isSubmitting}
              onChange={handleChangeInput}
              value={payload.newPassword}
              error={errorPayload.newPassword}
            />
            <Input
              required
              type="text"
              label="Ulangi Katasandi Baru"
              name="confirmPassword"
              placeholder="Ulangi katasandi baru..."
              autoComplete="off"
              disabled={isSubmitting}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setConfirmPassword(e.target.value)
              }
              value={confirmPassword}
              pattern={payload.newPassword}
            />
            <Input
              required
              type="password"
              label="Katasandi Lama"
              name="password"
              placeholder="Katasandi lama..."
              autoComplete="off"
              disabled={isSubmitting}
              onChange={handleChangeInput}
              value={payload.password}
              error={errorPayload.password}
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

export default UpdatePassword;
