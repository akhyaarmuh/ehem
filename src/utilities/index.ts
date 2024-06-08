import Swal from 'sweetalert2';
import { IProduct } from '../types/IProduct';

export const mySwal = Swal.mixin({
  customClass: {
    cancelButton: 'btn btn-sm btn-sa',
    closeButton: 'btm btn-sm btn-sa',
    confirmButton: 'btn btn-sm btn-sa btn-primary',
    denyButton: 'btn btn-sm btn-sa btn-error',
  },
  buttonsStyling: false,
});

export const toRupiah = (int: number, show: boolean = true): string => {
  if (int === 0 && show) return '0';

  if (int === 0) return '';

  return int.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1.');
};

export const rupiahToInt = (subject: string): number => {
  let subjectSanitized = subject.replace(/\D/g, '');

  subjectSanitized.charAt(0) == '0' && subjectSanitized.replace('0', '');

  return Number(subjectSanitized);
};

export const getStockDetail = (product: IProduct, stock: number) => {
  let sisaStock = stock;
  let stringStock = '';
  const units = [...product.product_unit_details].reverse();

  units.forEach((unt) => {
    const stock = Math.floor(sisaStock / unt.quantity);
    if (stock) {
      stringStock += `${stock} (${unt.unit.name}), `;
      sisaStock = sisaStock % unt.quantity;
    }
  });

  return stringStock;
};

export const getStatusShop = (date: string) => {
  const now = new Date().getTime();
  const exp = new Date(date).getTime();

  return exp >= now ? true : false;
};

export const displayDate = (date: string) => {
  const display = new Date(date);

  return `${display.getDate()}-${display.getMonth() + 1}-${display.getFullYear()}`;
};
