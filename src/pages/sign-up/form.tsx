import { useNavigate } from 'react-router-dom';
import { useState, ChangeEvent, FormEvent } from 'react';

import { signUp } from '../../api/auth';
import { Input, Button, Checkbox } from '../../components';

const Form = () => {
  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState('');
  const [errorForm, setErrorForm] = useState({
    full_name: '',
    email: '',
    password: '',
    confPassword: '',
  });
  const [confPassword, setConfPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [data, setData] = useState({ full_name: '', email: '', password: '' });

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === 'confPassword') {
      setConfPassword(e.target.value);
      setErrorForm({ ...errorForm, confPassword: '' });
    } else {
      setData({ ...data, [e.target.name]: e.target.value });
      setErrorForm({ ...errorForm, [e.target.name]: '' });
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (data.password !== confPassword) {
        throw {
          statusCode: 422,
          data: { confPassword: 'Konfirmasi katasandi tidak sama' },
        };
      }

      await signUp(data);
      navigate('/sign-in');
    } catch (error: any) {
      if (error.statusCode === 422) setErrorForm({ ...errorForm, ...error.data });
      else setErrorMessage(error.message);
    }

    setIsSubmitting(false);
  };

  return (
    <form className="mt-4 tablet:mt-6" onSubmit={handleSubmit}>
      {/* grid system */}
      <div className="grid gap-6 tablet:grid-cols-2">
        <Input
          name="full_name"
          label="Nama Lengkap"
          type="text"
          placeholder="Masukan nama lengkap..."
          required={true}
          error={errorForm.full_name}
          value={data.full_name}
          onChange={handleChangeInput}
        />
        <Input
          name="email"
          label="Email"
          type="email"
          placeholder="nama@email.com"
          required={true}
          error={errorForm.email}
          value={data.email}
          onChange={handleChangeInput}
        />
        <Input
          name="password"
          label="Katasandi"
          type="password"
          placeholder="*******"
          required={true}
          autoComplete="off"
          error={errorForm.password}
          value={data.password}
          onChange={handleChangeInput}
        />
        <Input
          name="confPassword"
          label="Konfirmasi Katasandi"
          type="password"
          placeholder="*******"
          required={true}
          autoComplete="off"
          error={errorForm.confPassword}
          value={confPassword}
          onChange={handleChangeInput}
        />
      </div>

      {/* privasi and policy */}
      <div className="my-6">
        <Checkbox
          label="Dengan mendaftar, Anda telah membuat akun, dan Anda menyetujui Ketentuan Penggunaan dan Kebijakan Privasi kami."
          required={true}
        />
        <Checkbox label="Email saya tentang pembaruan produk dan informasi." />
      </div>

      {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}

      <Button
        block
        size="sm"
        color="primary"
        type="submit"
        loading={isSubmitting}
        disabled={isSubmitting}
      >
        Buat akun
      </Button>
    </form>
  );
};

export default Form;
