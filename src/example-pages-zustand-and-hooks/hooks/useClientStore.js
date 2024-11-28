import { useClientStore } from '../datas/store';

export const useClients = () => {
  const { clients, loadClients, addClient, removeClient } = useClientStore();
  return { clients, loadClients, addClient, removeClient };
};