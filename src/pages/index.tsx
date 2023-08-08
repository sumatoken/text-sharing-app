import { useState, useEffect } from 'react';
type Message = {
  id: number;
  message: string;
  author: string;
  createdAt: string;
  updatedAt: string;
};

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('/api/messages')
      .then(response => response.json())
      .then(data => setMessages(data.reverse()));
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const response = await fetch('/api/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, author: name }),
    });

    const newMessage = await response.json();
    setMessages([newMessage, ...messages]);
    setName('');
    setMessage('');
  };

  return (
    <div className="p-8">
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="mb-4">
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-2 p-2 w-full border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Message</label>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="mt-2 p-2 w-full border rounded text-black"
          />
        </div>
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded mr-4">Send</button>
        <button type="button" onClick={() => window.location.reload()} className="px-4 py-2 bg-gray-500 text-white rounded">Refresh</button>
      </form>


      <div>
        {messages.map(msg => (
          <div key={msg.id} className="mb-4 p-4 border rounded">
            <p><strong>{msg.author}</strong>: {msg.message}</p>
            <small className="text-gray-400">{new Date(msg.createdAt).toLocaleString()}</small>
          </div>
        ))}
      </div>
    </div>
  );
}
