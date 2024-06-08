export interface ICustomer {
  id: string;
  full_name: string;
  address: string;
}

export interface ICreateCustomer {
  full_name: string;
  address: string;
}

export interface IUpdateCustomer {
  full_name: string;
  address: string;
}

export interface ISelectCustomer {
  value: string;
  label: string;
}
