import axios from 'axios';


const BASE_URL = 'https://ptosc-integration-api.pelindo.co.id/AMS';
const USERNAME = 'autogate'
const PASSWORD = '#m4ritime6atew4y'

export const gateClient = {
  async processGateTransaction(params) {
    try {
      const response = await axios.post(
        `${BASE_URL}/AmsGateInOutInter`,
        {
          trx: params.trx,
          posisi: params.posisi, // 'IN' or 'OUT'
          laneposisi: params.laneposisi || '',
          virtualgate: params.virtualgate || ''
        },
        {
          headers: {
            Authorization: `Basic ${btoa(`${USERNAME}:${PASSWORD}`)}`,
            'Content-Type': 'application/json'
          }
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error processing gate transaction:', error);
      throw error;
    }
  }
};