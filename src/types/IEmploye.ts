export interface IEmploye {
  id: string;
  full_name: string;
  email: string;
  role: 'admin' | 'cashier';
  status: boolean;
}

export interface ICreateEmploye {
  full_name: string;
  email: string;
  password: string;
  role: 'admin' | 'cashier';
}

export interface IUpdateEmploye {
  role: 'admin' | 'cashier';
  status: boolean;
}

export interface ISelectEmploye {
  value: string;
  label: string;
}
