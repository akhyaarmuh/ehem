import { useNavigate } from 'react-router-dom';
import { useState, ChangeEvent, FormEvent } from 'react';

import { resetPassword } from '../../api/auth';
import { Input, Button, Checkbox } from '../../components';

const Form = () => {
  const navigate = useNavigate();

  const [errorForm, setErrorForm] = useState({ email: '' });
  const [data, setData] = useState({ email: '' });
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setErrorForm({ ...errorForm, [e.target.name]: '' });
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await resetPassword(data);
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
      <div className="grid gap-6">
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
      </div>

      {/* privasi and policy */}
      <div className="my-6 flex justify-between">
        <Checkbox
          name="term"
          label="Saya menerima syarat dan ketentuan yang berlaku"
          required={true}
        />
      </div>

      {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}

      {/* button submit */}
      <Button
        block
        color="primary"
        size="sm"
        type="submit"
        disabled={isSubmitting}
        loading={isSubmitting}
      >
        Setel ulang katasandi
      </Button>
    </form>
  );
};

export default Form;
