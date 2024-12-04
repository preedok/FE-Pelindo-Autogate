
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
    set({ dashboardTransaction: data.ResponseData });
  },

  fetchDashboardTransactionDetail: async (noTiket) => {
    const data = await getDashboardTransactionDetail(noTiket);
    set({ dashboardTransactionDetail: data.ResponseData });
  },

  fetchLongStayCargo: async () => {
    const data = await getLongStayCargo();
    set({ longStayCargo: data.ResponseData });
  },
}));

export default useDashboardStore;
