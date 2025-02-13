import { useState, useEffect } from "react";
import './App.css';

const getStatus = async () => {
  try {
    const response = await fetch('http://bigrobot.ca:3000/auth/status', {
      mode: 'cors',
      credentials: 'include'
    });
    if (response.ok) {
      return await response.json();
    } else {
      throw new Error(`Authentication failed with status code ${response.status}`);
    }
  } catch (error) {
    console.error('Error during Status:', error);
    return { data: null }; 
  }
};

function App() {
  const [data, setData] = useState<any>({ data: null });
  const [loading, setLoading] = useState(true);

  
  const fetchData = async () => {
    setLoading(true);
    try {
      const result = await getStatus();
      setData({ data: result }); 
      setLoading(false);
    } catch (error) {
      console.error('Error during Status:', error);
      setData({ data: null }); 
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(); 
  }, []); 
  if (loading) return <div>Loading...</div>;

  return (
    <>
      <div>
        {data.data ? JSON.stringify(data.data, null, 2) : "Data not found"}
      </div>
      <button onClick={fetchData}>Fetch Status</button>
    </>
  );
}

export default App;