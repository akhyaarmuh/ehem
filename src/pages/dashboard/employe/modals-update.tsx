import { useState, FormEvent, useEffect } from 'react';

import { Modals, Button, MySelect } from '../../../components';
import { updateEmployeById } from '../../../api/employe';
import { IEmploye, IUpdateEmploye } from '../../../types/IEmploye';

const initialErrorPayload = { role: '', status: '' };

interface ModalsProps {
  data: IEmploye;
  fetchData: () => Promise<void>;
  idModals: string;
  idForm: string;
}

const ModalsUpdate: React.FC<ModalsProps> = ({ data, fetchData, idModals, idForm }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [payload, setPayload] = useState<IUpdateEmploye>({
    role: 'cashier',
    status: false,
  });
  const [role, setRole] = useState<any>([]);
  const [status, setStatus] = useState<any>([]);
  const [errorPayload, setErrorPayload] = useState(initialErrorPayload);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setErrorMessage('');
    setErrorPayload(initialErrorPayload);
    setRole(
      data.role === 'admin'
        ? { value: 'admin', label: 'Admin' }
        : { value: 'cashier', label: 'Kasir' }
    );
    setStatus(
      data.status
        ? { value: 'active', label: 'Aktif' }
        : { value: 'inactive', label: 'Tidak Aktif' }
    );

    setPayload({
      role: data.role,
      status: data.status,
    });
  }, [data]);

  const handleChangeRole = (e: any) => {
    if (e.value === 'cashier' || e.value === 'admin') {
      setRole(e);
      setPayload({ ...payload, role: e.value });
    }
  };
  const handleChangeStatus = (e: any) => {
    setStatus(e);
    setPayload({ ...payload, status: e.value === 'active' ? true : false });
  };

  const handleUpdate = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await updateEmployeById(data.id, payload);
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
          <MySelect<{ value: string; label: string }>
            label="Status"
            name="status"
            required
            placeholder="Status karyawan..."
            options={[
              { value: 'active', label: 'Aktif' },
              { value: 'inactive', label: 'Tidak Aktif' },
            ]}
            value={status}
            error={errorPayload.status}
            onChange={handleChangeStatus}
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
