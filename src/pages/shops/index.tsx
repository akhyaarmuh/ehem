import { jwtDecode } from 'jwt-decode';
import { useState, useEffect } from 'react';
import { IoStorefront } from 'react-icons/io5';
import { useNavigate, Link } from 'react-router-dom';

import Create from './create';
import Delete from './delete';
import { signIn } from '../../api/auth';
import { IShop } from '../../types/IShop';
import { Button } from '../../components';
import ModalsUpdate from './modals-update';
import { getAllShop } from '../../api/shops';
import ModalsActivate from './modals-activate';
import { getStatusShop, displayDate } from '../../utilities';
import { signIn as setUser } from '../../redux/user/userSlice';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';

const idModalsUpdate = 'update-shop';
const idFormUpdate = 'form-update-shop';
const initialDataSelected = { id: '', name: '', no_hp: '', address: '', expired_at: '' };

const Shops = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const email = useAppSelector((state) => state.user.email);
  const shop = useAppSelector((state) => state.user.shop);
  const [data, setData] = useState<IShop[]>([]);
  const [dataSelected, setDataSelected] = useState<IShop>(initialDataSelected);

  useEffect(() => {
    const fetchAll = async () => {
      await getShops();
    };

    fetchAll();
  }, []);

  const getShops = async () => {
    try {
      const { data } = await getAllShop();
      setData(data);
    } catch (error: any) {
      console.log('getShops: ', error.message);
    }
  };

  const getInShop = async (shop_id: string) => {
    try {
      const refreshToken = await signIn({ email, password: '', shop_id });
      const decoded: any = jwtDecode(refreshToken!);
      dispatch(setUser(decoded));
      navigate('/dashboard');
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const showModalsUpdate = (data: IShop) => {
    setDataSelected(data);
    (window as any)[idModalsUpdate].show();

    const form = document.querySelector(`#${idFormUpdate}`) as HTMLFormElement;
    (form.elements[0] as HTMLInputElement).focus();
  };

  return (
    <>
      <h3 className="text-center">Kelola Toko Anda</h3>

      <div className="flex justify-center gap-4 my-2">
        {shop && (
          <Link to="/dashboard">
            <Button color="link">Kembali ke beranda</Button>
          </Link>
        )}
        <Create fetchData={getShops} />
      </div>

      <div className="flex justify-center gap-4 flex-wrap">
        {data.map((item, i) => {
          const isActive = getStatusShop(item.expired_at);
          return (
            <div key={i} className="card card-compact w-96 glass shadow-xl">
              <figure className="pt-2">
                <IoStorefront size={100} />
              </figure>
              <div className="card-body">
                <h2 className="card-title mb-0">
                  {item.name}
                  {isActive ? (
                    <div className="badge badge-primary">active</div>
                  ) : (
                    <div className="badge badge-secondary">expired</div>
                  )}
                </h2>
                <span className="text-accent">
                  Aktif sampai: {displayDate(item.expired_at)}
                </span>
                <p>{item.address}</p>
                <div className="card-actions justify-end">
                  {!isActive ? (
                    <>
                      <ModalsActivate id={item.id} fetchData={getShops} />
                      <Delete id={item.id} fetchData={getShops} name={item.name} />
                    </>
                  ) : (
                    <>
                      <Button
                        size="sm"
                        color="neutral"
                        onClick={() => showModalsUpdate(item)}
                      >
                        Ubah
                      </Button>
                      <Button
                        size="sm"
                        color="neutral"
                        onClick={() => getInShop(item.id)}
                      >
                        Masuk
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <ModalsUpdate
        data={dataSelected}
        idForm={idFormUpdate}
        idModals={idModalsUpdate}
        fetchData={getShops}
      />
    </>
  );
};

export default Shops;
