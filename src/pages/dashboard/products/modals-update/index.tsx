import { useEffect, useState } from 'react';

import FormProduct from './form-product';
import { Modals } from '../../../../components';
import FormProductUnit from './form-product-unit';
import FormProductStock from './form-product-stock';
import { IProduct } from '../../../../types/IProduct';

interface ModalsProps {
  data: IProduct;
  idModals: string;
  idForm: string;
  fetchData: () => Promise<void>;
}

const ModalsUpdate: React.FC<ModalsProps> = ({ data, idModals, idForm, fetchData }) => {
  const [tab, setTab] = useState('product');

  useEffect(() => {
    setTab('product');
  }, [data]);

  const changeTab = (title: string) => {
    setTab(title);
  };

  return (
    <Modals idModals={idModals} className="h-[405px]">
      <h3 className="font-bold text-lg mb-4">Ubah Produk</h3>

      <div role="tablist" className="tabs tabs-lifted">
        <button
          role="tab"
          className={`tab ${tab === 'product' ? 'tab-active' : ''}`}
          onClick={() => changeTab('product')}
        >
          Detil Produk
        </button>
        <button
          role="tab"
          className={`tab ${tab === 'unit' ? 'tab-active' : ''}`}
          onClick={() => changeTab('unit')}
        >
          Satuan
        </button>
        <button
          role="tab"
          className={`tab ${tab === 'stock' ? 'tab-active' : ''}`}
          onClick={() => changeTab('stock')}
        >
          Stok
        </button>
      </div>

      {/* form product */}
      <div className={`${tab !== 'product' ? 'hidden' : ''}`}>
        <FormProduct
          data={data}
          idForm={idForm}
          idModals={idModals}
          fetchData={fetchData}
        />
      </div>

      {/* form unit detail */}
      <div className={`${tab !== 'unit' ? 'hidden' : ''}`}>
        <FormProductUnit data={data} fetchData={fetchData} />
      </div>

      {/* form stock detail */}
      <div className={`${tab !== 'stock' ? 'hidden' : ''}`}>
        <FormProductStock data={data} fetchData={fetchData} />
      </div>
    </Modals>
  );
};

export default ModalsUpdate;
