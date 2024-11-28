import create from 'zustand';
import { fetchClients, createClient, deleteClient } from './api';
import { Client } from './type';

interface ClientStore {
  clients: Client[];
  loadClients: () => Promise<void>;
  addClient: (client: Client) => Promise<void>;
  removeClient: (id: number) => Promise<void>;
}

export const useClientStore = create<ClientStore>((set) => ({
  clients: [],
  loadClients: async () => {
    const clients = await fetchClients();
    set({ clients });
  },
  addClient: async (client) => {
    const newClient = await createClient(client);
    set((state) => ({ clients: [...state.clients, newClient] }));
  },
  removeClient: async (id) => {
    await deleteClient(id);
    set((state) => ({ clients: state.clients.filter(client => client.id !== id) }));
  },
}));