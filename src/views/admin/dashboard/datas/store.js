import { create } from "zustand";
import { dashboardClient } from "./client";

export const useDashboardStore = create((set) => ({
  transactions: [],
  transactionDetails: [],
  isLoading: false,
  error: null,
  fetchDashboardTransaction: async (lanePosition) => {
    set({ isLoading: true, error: null });
    try {
      const data = await dashboardClient.getDashboardTransaction(lanePosition);
      set({
        transactions: data.ResponseData || [],
        isLoading: false,
      });
      return data;
    } catch (error) {
      set({
        error: error.message,
        isLoading: false,
      });
      throw error;
    }
  },
  fetchDashboardTransactionDetail: async (params) => {
    set({ isLoading: true, error: null });
    try {
      const data = await dashboardClient.getDashboardTransactionDetail(params);
      set({
        transactionDetails: data.ResponseData || [],
        isLoading: false,
      });
      return data;
    } catch (error) {
      set({
        error: error.message,
        isLoading: false,
      });
      throw error;
    }
  },
}));
