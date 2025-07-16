import {useState, useEffect} from 'react';

type DataItem = any; // Replace 'any' with a more specific type when available

function DataList({fetchData, renderItem}: {
  fetchData: () => Promise<DataItem[]>,
  renderItem: (item: DataItem) => React.ReactNode
}) {
const [data, setData] = useState<DataItem[]>([]);
const [error, setError] = useState<Error | null>(null);

useEffect(() => {
fetchData()
 .then(setData)
 .catch(setError);
}, [fetchData]);

if (error) {
return <div> Error Loading data! </div>;
}

return <ul> {data.map(item => renderItem(item))}</ul>;
}

export default DataList;