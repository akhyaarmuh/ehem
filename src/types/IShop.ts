export interface IShop {
  id: string;
  name: string;
  no_hp: string;
  address: string;
  expired_at: string;
  foot_note?: string;
  pole_note?: string;
}

export interface ICreateShop {
  name: string;
  no_hp: string;
  address: string;
}

export interface IUpdateShop {
  name: string;
  no_hp: string;
  address: string;
  foot_note?: string;
  pole_note?: string;
}

export interface IActivateShop {
  license_key: string;
}
