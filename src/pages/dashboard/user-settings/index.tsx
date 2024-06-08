import { useState, ChangeEvent, FormEvent } from 'react';

import { mySwal } from '../../../utilities';
import UpdatePassword from './update-password';
import { Button, Input } from '../../../components';
import { updateUserById } from '../../../api/users';
import { useAppSelector } from '../../../redux/hooks';

const UserSettings = () => {
  const id = useAppSelector((state) => state.user.id);
  const full_name: string = useAppSelector((state) => state.user.full_name);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [payload, setPayload] = useState({ full_name: full_name });
  const [errorPayload, setErrorPayload] = useState({ full_name: '' });
  const [errorMessage, setErrorMessage] = useState('');

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setErrorPayload({ ...errorPayload, [e.target.name]: '' });
    setPayload({ ...payload, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await updateUserById(id!, payload);
      setErrorMessage('');
      mySwal.fire({
        title: 'Berhasil!',
        text: 'Silakan masuk ulang untuk mendapatkan perubahan!',
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
      <h3>Data Pengguna</h3>

      <form onSubmit={handleSubmit} className="mb-2">
        <Input
          autoFocus
          required
          type="text"
          label="Nama Lengkap"
          name="full_name"
          placeholder="Masukan nama anda..."
          autoComplete="off"
          disabled={isSubmitting}
          onChange={handleChangeInput}
          value={payload.full_name}
          error={errorPayload.full_name}
        />

        {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}

        <Button block color="primary">
          Simpan
        </Button>
      </form>

      <UpdatePassword id={id!} />
    </>
  );
};

export default UserSettings;
