import { create } from "zustand";
import {
  getDashboardTransaction,
  getDashboardTransactionDetail,
  getLongStayCargo,
} from "./client";

const useDashboardStore = create((set) => ({
  dashboardTransaction: [],
  dashboardTransactionDetail: [],
  longStayCargo: [],

  fetchDashboardTransaction: async (lanePosition) => {
    const data = await getDashboardTransaction(lanePosition);
    set({ dashboardTransaction: data.ResponseData || [] });
  },

  fetchDashboardTransactionDetail: async (noTiket) => {
    const data = await getDashboardTransactionDetail(noTiket);
    set({ dashboardTransactionDetail: data.ResponseData || [] });
  },

  fetchLongStayCargo: async (branchCode, terminalCode, search) => {
    const data = await getLongStayCargo(branchCode, terminalCode, search);
    set({ longStayCargo: data.ResponseData || [] });
  },
}));

export default useDashboardStore;