import React, { useState } from 'react';
import { useClients } from '../hooks/useClientStore';

const AddClientForm = () => {
  const { addClient } = useClients();
  const [newClient, setNewClient] = useState({ name: '', email: '' });

  const handleAddClient = async () => {
    await addClient({ ...newClient, id: Date.now() });
    setNewClient({ name: '', email: '' });
  };

  return (
    <div>
      <h2>Add New Client</h2>
      <input
        type="text"
        placeholder="Name"
        value={newClient.name}
        onChange={(e) => setNewClient({ ...newClient, name: e.target.value })}
      />
      <input
        type="email"
        placeholder="Email"
        value={newClient.email}
        onChange={(e) => setNewClient({ ...newClient, email: e.target.value })}
      />
      <button onClick={handleAddClient}>Add Client</button>
    </div>
  );
};

export default AddClientForm;