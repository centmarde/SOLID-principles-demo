import type  { IDataService, User } from '../interfaces/IDataService';

export class UserService implements IDataService<User> {
  async fetchData(): Promise<User[]> {
    // Low-level implementation detail
    const response = await fetch('/api/users');
    if (!response.ok) {
      throw new Error('Failed to fetch users');
    }
    return response.json();
  }
}

export class MockUserService implements IDataService<User> {
  async fetchData(): Promise<User[]> {
    // Mock implementation for testing
    return Promise.resolve([
      { id: 1, name: 'John Doe', email: 'john@example.com' },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
    ]);
  }
}
