import React, { useState } from 'react';
import DataList from './DataList';

// ABSTRACTION - High-level modules depend on this, not concrete implementations
interface DataProvider {
  getData(): Promise<string[]>;
}

// LOW-LEVEL MODULE 1 - Database implementation
class DatabaseProvider implements DataProvider {
  async getData(): Promise<string[]> {
    // Simulates database call
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(['Database Item 1', 'Database Item 2', 'Database Item 3']);
      }, 1000);
    });
  }
}

// LOW-LEVEL MODULE 2 - API implementation  
class ApiProvider implements DataProvider {
  async getData(): Promise<string[]> {
    // Simulates API call
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(['API Item A', 'API Item B', 'API Item C']);
      }, 500);
    });
  }
}

// HIGH-LEVEL MODULE - Depends on abstraction, not concrete classes
function DIPExample() {
  const [provider, setProvider] = useState<DataProvider>(new DatabaseProvider());
  const [providerType, setProviderType] = useState('database');

  const switchProvider = (type: string) => {
    setProviderType(type);
    if (type === 'database') {
      setProvider(new DatabaseProvider());
    } else {
      setProvider(new ApiProvider());
    }
  };

  const renderItem = (item: string) => (
    <li key={item} style={{ padding: '5px', margin: '2px' }}>
      {item}
    </li>
  );

  return (
    <div style={{ padding: '20px' }}>
      <h2>Dependency Inversion Principle Demo</h2>
      
      <div style={{ marginBottom: '20px' }}>
        <button 
          onClick={() => switchProvider('database')}
          style={{ 
            backgroundColor: providerType === 'database' ? '#007bff' : '#ccc',
            color: 'white',
            padding: '10px',
            margin: '5px',
            border: 'none',
            borderRadius: '4px'
          }}
        >
          Use Database
        </button>
        <button 
          onClick={() => switchProvider('api')}
          style={{ 
            backgroundColor: providerType === 'api' ? '#007bff' : '#ccc',
            color: 'white',
            padding: '10px',
            margin: '5px',
            border: 'none',
            borderRadius: '4px'
          }}
        >
          Use API
        </button>
      </div>

      <DataList 
        fetchData={() => provider.getData()}
        renderItem={renderItem}
      />

      <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '5px' }}>
        <h3>DIP Explained:</h3>
        <ul>
          <li><strong>High-level module:</strong> DIPExample component</li>
          <li><strong>Low-level modules:</strong> DatabaseProvider, ApiProvider</li>
          <li><strong>Abstraction:</strong> DataProvider interface</li>
          <li><strong>Key:</strong> High-level doesn't know about low-level details!</li>
        </ul>
      </div>
    </div>
  );
}

export default DIPExample;
