export interface ISupplier {
  id: string;
  name: string;
  address: string;
}

export interface ICreateSupplier {
  name: string;
  address: string;
}

export interface IUpdateSupplier {
  name: string;
  address: string;
}

export interface ISelectSupplier {
  value: string;
  label: string;
}
