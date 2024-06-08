export interface IProduct {
  id: string;
  name: string;
  description: string | null;
  min_stock: number;
  category: {
    id: string;
    name: string;
  };
  product_unit_details: {
    id: string;
    code: string;
    quantity: number;
    unit: {
      name: string;
    };
    price: {
      price: number;
      sale_price: number;
    }[];
  }[];
  product_stock_details: {
    capital: number;
    stock: number;
  }[];
}

export interface ICreateProduct {
  name: string;
  category_id: string;
  description: string;
  min_stock: number;
  unit_detail: {
    unit_id: string;
    code: string;
    quantity: number;
    price: number;
    sale_price: number;
  }[];
  stock_detail: {
    capital: number;
    stock: number;
  }[];
}

export interface IUpdateProduct {
  name: string;
  category_id: string;
  description: string;
  min_stock: number;
}

export interface IUpdateProductCode {
  code: string;
}

export interface IUpdateProductPrice {
  price: number;
  sale_price: number;
}

export interface IUpdateProductStock {
  stock_detail: {
    capital: number;
    stock: number;
  }[];
}
