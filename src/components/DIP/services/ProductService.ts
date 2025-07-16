import type { IDataService, Product } from '../interfaces/IDataService';

export class ProductService implements IDataService<Product> {
  async fetchData(): Promise<Product[]> {
    // Low-level implementation detail
    const response = await fetch('/api/products');
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    return response.json();
  }
}

export class MockProductService implements IDataService<Product> {
  async fetchData(): Promise<Product[]> {
    // Mock implementation for testing
    return Promise.resolve([
      { id: 1, title: 'Laptop', price: 999.99 },
      { id: 2, title: 'Phone', price: 599.99 }
    ]);
  }
}
