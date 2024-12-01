import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { gateClient } from './client';

export const useGateStore = create(devtools((set) => ({
  // Gate Transaction State
  gateTransaction: null,
  gateTransactionLoading: false,
  gateTransactionError: null,

  // Process Gate Transaction (In or Out)
  processGateTransaction: async (params) => {
    set({ 
      gateTransactionLoading: true, 
      gateTransactionError: null 
    });
    try {
      const response = await gateClient.processGateTransaction(params);
      set({ 
        gateTransaction: response, 
        gateTransactionLoading: false 
      });
      return response;
    } catch (error) {
      set({ 
        gateTransactionError: error.message, 
        gateTransactionLoading: false 
      });
      throw error;
    }
  },

  // Reset gate transaction state
  resetGateTransaction: () => set({ 
    gateTransaction: null, 
    gateTransactionError: null 
  }),
})));