const mockAxios = jest.createMockFromModule('axios');

// Mock the `get` method
mockAxios.get = jest.fn(() => Promise.resolve({ data: {} }));

// Mock the `post` method
mockAxios.post = jest.fn(() => Promise.resolve({ data: {} }));

// Mock the `put` method
mockAxios.put = jest.fn(() => Promise.resolve({ data: {} }));

// Mock the `delete` method
mockAxios.delete = jest.fn(() => Promise.resolve({ data: {} }));

export default mockAxios;