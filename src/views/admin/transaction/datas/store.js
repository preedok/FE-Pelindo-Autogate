import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { transactionClient } from "./client";

export const useTransactionStore = create(
  devtools((set) => ({
    headerTransactions: [],
    headerTransactionLoading: false,
    headerTransactionError: null,
    fetchHeaderTransactions: async (params) => {
      set({ headerTransactionLoading: true, headerTransactionError: null });
      try {
        const response = await transactionClient.getHeaderTransactions(params);
        set({
          headerTransactions: response.ResponseData[0]?.ResponseData || [],
          headerTransactionLoading: false,
        });
      } catch (error) {
        set({
          headerTransactionError: error.message,
          headerTransactionLoading: false,
        });
      }
    },
    detailTransactions: [],
    detailTransactionLoading: false,
    detailTransactionError: null,
    fetchDetailTransactions: async (params) => {
      set({ detailTransactionLoading: true, detailTransactionError: null });
      try {
        const response = await transactionClient.getDetailTransactions(params);
        set({
          detailTransactions: response.ResponseData[0]?.ResponseData || [],
          detailTransactionLoading: false,
        });
      } catch (error) {
        set({
          detailTransactionError: error.message,
          detailTransactionLoading: false,
        });
      }
    },
    resetHeaderTransactions: () =>
      set({ headerTransactions: [], headerTransactionError: null }),
    resetDetailTransactions: () =>
      set({ detailTransactions: [], detailTransactionError: null }),
  }))
);