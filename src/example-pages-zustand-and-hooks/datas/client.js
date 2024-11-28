// src/contoh/datas/api.js
const API_URL = 'https://api.example.com/clients'; // Ganti dengan URL API publik yang sesuai

export const fetchClients = async () => {
  const response = await fetch(API_URL);
  return response.json();
};

export const createClient = async (client) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(client),
  });
  return response.json();
};

export const deleteClient = async (id) => {
  await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });
};