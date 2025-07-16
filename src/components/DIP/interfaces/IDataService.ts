export interface IDataService<T> {
  fetchData(): Promise<T[]>;
}

export interface User {
  id: number;
  name: string;
  email: string;
}

export interface Product {
  id: number;
  title: string;
  price: number;
}
