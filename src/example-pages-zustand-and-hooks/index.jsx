import React, { useEffect } from 'react';
import { useClients } from './hooks/useClientStore';
import ClientList from './components/ClientList';
import AddClientForm from './components/AddClientForm';

const Index = () => {
  const { loadClients } = useClients();

  useEffect(() => {
    loadClients();
  }, [loadClients]);

  return (
    <div>
      <h1>Client List</h1>
      <ClientList />
      <AddClientForm />
    </div>
  );
};

export default Index;