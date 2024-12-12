import { create } from "zustand";
import { fetchTransactionHeader, fetchTransactionDetail } from "./client";

const useTransactionStore = create((set) => ({
  transactionHeader: [],
  transactionDetail: [],
  fetchHeader: async (noTiket, branchCode, terminalCode, direction) => {
    const data = await fetchTransactionHeader(noTiket, branchCode, terminalCode, direction);
    set({ transactionHeader: data.ResponseData || [] });
  },
  fetchDetail: async (noTiket, branchCode, terminalCode) => {
    const data = await fetchTransactionDetail(noTiket, branchCode, terminalCode);
    set({ transactionDetail: data.ResponseData || [] });
  },
}));

export default useTransactionStore; // Default export