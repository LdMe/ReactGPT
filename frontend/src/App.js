import './App.css';
import { useState } from 'react';
import Message from './components/Message';
import Button from './components/Button';

function App() {
  const [message, setMessage] = useState('');
  const [messageList, setMessageList] = useState([]); // [{content: 'Hola', role: 'user'}, {content: 'Hola', role: 'assistant'}]
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const getMessage = async () => {
    setLoading(true);
    let newMessageList = [...messageList];
    newMessageList.push({ content: message, role: 'user' });
    let response = await fetch(`http://localhost:3003/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newMessageList)
    });
    let data = await response.text();
    newMessageList.push({ content: data, role: 'assistant' });
    setMessageList(newMessageList);
    setResponse(data);
    setLoading(false);
    setMessage('');
  }
  const deleteMessage = (index) =>{
    let newMessageList = [...messageList];
    newMessageList.splice(index,1);
    setMessageList(newMessageList);
  }
  return (
    <div className="App">

      {loading && <p>Cargando...</p>}
      {messageList.map((message, index) => {
        return (
          <Message 
            key={index} 
            variant={message.role}
            onDelete={() => {deleteMessage(index)}}
          >
            {message.content}
          </Message>
        );
      })}
      <textarea type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
      <Button onClick={getMessage} variant="red bg-dark border-round">
        Enviar
      </Button>
    </div>
  );
}

export default App;
