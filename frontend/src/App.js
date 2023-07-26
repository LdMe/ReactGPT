import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const getMessage = async () => {
    setLoading(true);
    let response = await fetch(`http://localhost:3003/?message=${message}`);
    let data = await response.text();
    setResponse(data);
    setLoading(false);
  }
  return (
    <div className="App">
      <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
      <button onClick={getMessage}>Enviar</button>
      {loading && <p>Cargando...</p>}
      <p>{response}</p>
    </div>
  );
}

export default App;
