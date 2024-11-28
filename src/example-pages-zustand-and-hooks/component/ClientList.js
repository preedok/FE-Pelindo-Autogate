import React from 'react';
import { useClients } from '../hooks/useClientStore';

const ClientList = () => {
  const { clients, removeClient } = useClients();

  return (
    <ul>
      {clients.map(client => (
        <li key={client.id}>
          {client.name} - {client.email}
          <button onClick={() => removeClient(client.id)}>Remove</button>
        </li>
      ))}
    </ul>
  );
};

export default ClientList;