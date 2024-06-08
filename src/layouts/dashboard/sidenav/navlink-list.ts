import * as IconMd from 'react-icons/md';
import * as IconFa from 'react-icons/fa';
import { BsBoxSeam } from 'react-icons/bs';
import { TbHomeFilled } from 'react-icons/tb';
import { IoStorefront } from 'react-icons/io5';
import { FaPeopleGroup } from 'react-icons/fa6';
import { RiUserSettingsLine } from 'react-icons/ri';
import { TbBookUpload, TbBookDownload } from 'react-icons/tb';

export default [
  { label: 'Beranda', to: '/dashboard', Icon: TbHomeFilled },

  { label: 'Transaksi' },
  { label: 'Kasir', to: '/sales-orders', Icon: IconMd.MdOutlinePointOfSale },
  {
    label: 'Tambah Stok',
    to: '/dashboard/purchase-orders',
    Icon: IconFa.FaCartArrowDown,
  },

  { label: 'Nota Transaksi' },
  { label: 'Penjualan', to: '/dashboard/sales-transactions', Icon: TbBookUpload },
  { label: 'Pembelian', to: '/dashboard/purchase-transactions', Icon: TbBookDownload },

  { label: 'Data Master' },
  { label: 'Kategori', to: '/dashboard/categories', Icon: IconMd.MdOutlineCategory },
  { label: 'Satuan', to: '/dashboard/units', Icon: IconFa.FaUnity },
  { label: 'Produk', to: '/dashboard/products', Icon: BsBoxSeam },
  { label: 'Agen', to: '/dashboard/suppliers', Icon: IconFa.FaPeopleCarry },
  { label: 'Pelanggan', to: '/dashboard/customers', Icon: IconFa.FaUsers },
  { label: 'Karyawan', to: '/dashboard/employe', Icon: FaPeopleGroup },
  { label: 'Toko', to: '/shops', Icon: IoStorefront },

  { label: 'Pengaturan' },
  { label: 'Pengguna', to: '/dashboard/user-settings', Icon: RiUserSettingsLine },
];
