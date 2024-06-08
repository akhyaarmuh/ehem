export interface ICategory {
  id: string;
  name: string;
}

export interface ICreateCategory {
  name: string;
}

export interface IUpdateCategory {
  name: string;
}

export const dummyCategory = [
  { _id: '111', name: 'Makanan' },
  { _id: '222', name: 'Minuman' },
  { _id: '333', name: 'Obat' },
  { _id: '444', name: 'Snack' },
];

export interface ISelectCategory {
  value: string;
  label: string;
}
