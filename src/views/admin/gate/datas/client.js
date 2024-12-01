import axios from 'axios';

const BASE_URL = import.meta.env.REACT_APP_BASE_URL;
const USERNAME = import.meta.env.REACT_APP_USERNAME
const PASSWORD = import.meta.env.REACT_APP_PASSWORD

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