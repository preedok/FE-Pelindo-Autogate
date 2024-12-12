import { create } from "zustand";
import { fetchTransactionHeader, fetchTransactionDetail } from "./client";

const useTransactionStore = create((set) => ({
  transactionHeader: [],
  transactionDetail: [],
  fetchHeader: async (branchCode, terminalCode, direction) => {
    const data = await fetchTransactionHeader(branchCode, terminalCode, direction);
    set({ transactionHeader: data.ResponseData });
  },
  fetchDetail: async (noTiket) => {
    const data = await fetchTransactionDetail(noTiket);
    set({ transactionDetail: data.ResponseData });
  },
}));

export default useTransactionStore;