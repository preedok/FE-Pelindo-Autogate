// src/views/transaction/datas/store.js
import { create } from "zustand";
import { fetchTransactionHeader, fetchTransactionDetail } from "./client";

const useTransactionStore = create((set) => ({
  transactionHeader: [],
  transactionDetail: [],
  fetchHeader: async () => {
    const data = await fetchTransactionHeader();
    set({ transactionHeader: data.ResponseData });
  },
  fetchDetail: async (noTiket) => {
    const data = await fetchTransactionDetail(noTiket);
    set({ transactionDetail: data.ResponseData });
  },
}));

export default useTransactionStore;
