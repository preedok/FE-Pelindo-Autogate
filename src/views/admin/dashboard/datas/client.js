import axios from "axios";

const BASE_URL = "https://ptosc-integration-api.pelindo.co.id/AMS";
const USERNAME = "autogate";
const PASSWORD = "#m4ritime6atew4y";

export const dashboardClient = {
  createBasicAuthHeader(username, password) {
    const credentials = btoa(`${username}:${password}`);
    return `Basic ${credentials}`;
  },

  async getDashboardTransaction(lanePosition) {
    try {
      const response = await axios.post(
        `${BASE_URL}/GetAMSDashboardTransaction`,
        { lanePosition },
        {
          headers: {
            Authorization: this.createBasicAuthHeader(USERNAME, PASSWORD),
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      this.handleError(error, "getDashboardTransaction");
      throw error;
    }
  },

  async getDashboardTransactionDetail(params) {
    try {
      const response = await axios.post(
        `${BASE_URL}/GetAMSDashboardDetailDT`,
        params,
        {
          headers: {
            Authorization: this.createBasicAuthHeader(USERNAME, PASSWORD),
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      this.handleError(error, "getDashboardTransactionDetail");
      throw error;
    }
  },
  handleError(error, methodName) {
    console.group(`Error in ${methodName}`);
    if (error.response) {
      console.error("Response Data:", error.response.data);
      console.error("Status Code:", error.response.status);
      console.error("Response Headers:", error.response.headers);
    } else if (error.request) {
      console.error("No response received:", error.request);
    } else {
      console.error("Error Message:", error.message);
    }
    console.groupEnd();
  },
};
export const fetchDashboardData = async () => {
  try {
    const transactionData = await dashboardClient.getDashboardTransaction(
      "IN-1"
    );
    const detailParams = {
      noTiket: "example-ticket",
      length: 10,
      start: 0,
      draw: 1,
    };
    const detailData = await dashboardClient.getDashboardTransactionDetail(
      detailParams
    );
    return {
      transactionData,
      detailData,
    };
  } catch (error) {
    console.error("Failed to fetch dashboard data:", error);
    throw error;
  }
};
