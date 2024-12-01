import axios from "axios";

const BASE_URL = import.meta.env.REACT_APP_BASE_URL;
const USERNAME = import.meta.env.REACT_APP_USERNAME
const PASSWORD = import.meta.env.REACT_APP_PASSWORD

export const transactionClient = {
  createBasicAuthHeader(username, password) {
    return `Basic ${btoa(`${username}:${password}`)}`;
  },
  getHeaderTransactions: async (params) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/GetAMSTransactionHeaderDT`,
        {
          branchCode: params.branchCode,
          terminalCode: params.terminalCode,
          direction: params.direction,
          length: params.length || 10,
          start: params.start || 0,
          draw: params.draw || 1,
          search: params.search || "",
          order: params.order || [],
          columns: params.columns || [],
        },
        {
          headers: {
            Authorization: `Basic ${btoa(`${USERNAME}:${PASSWORD}`)}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching transaction headers:", error);
      throw error;
    }
  },
  getDetailTransactions: async (params) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/GetAMSTransactionDetailDT`,
        {
          branchCode: params.branchCode,
          terminalCode: params.terminalCode,
          noTiket: params.noTiket,
          length: params.length || 10,
          start: params.start || 0,
          draw: params.draw || 1,
          search: params.search || "",
          order: params.order || [],
          columns: params.columns || [],
        },
        {
          headers: {
            Authorization: `Basic ${btoa(`${USERNAME}:${PASSWORD}`)}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching transaction details:", error);
      throw error;
    }
  },
};
