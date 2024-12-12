const API_BASE_URL = "https://ptosc-integration-api.pelindo.co.id/AMS";

export const getDashboardTransaction = async (lanePosition) => {
  try {
    const response = await fetch(`${API_BASE_URL}/GetAMSDashboardTransaction`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Basic " + btoa("autogate:#m4ritime6atew4y"),
      },
      body: JSON.stringify({ lanePosition }),
    });

    if (!response.ok) {
      throw new Error(`Error fetching dashboard transaction: ${response.statusText}`);
    }

    const data = await response.json();
    return data; // Return the parsed JSON data
  } catch (error) {
    console.error("Error in getDashboardTransaction:", error);
    throw error;
  }
};
export const getDashboardTransactionDetail = async (noTiket) => {
  try {
    const response = await fetch(`${API_BASE_URL}/GetAMSDashboardDetailDT`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Basic " + btoa("autogate:#m4ritime6atew4y"),
      },
      body: JSON.stringify({
        noTiket,
        length: 5,
        start: 0,
        draw: 1,
        search: "",
        order: null,
        columns: null,
      }),
    });

    if (!response.ok) {
      throw new Error(`Error fetching transaction detail: ${response.statusText}`);
    }

    const data = await response.json();
    console.log("Fetched transaction detail data:", data);
    return data;
  } catch (error) {
    console.error("Error in getDashboardTransactionDetail:", error);
    throw error;
  }
};
export const getLongStayCargo = async (branchCode, terminalCode, search) => {
  try {
    const response = await fetch(`${API_BASE_URL}/GetAMSLongStayCargoDT`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Basic " + btoa("autogate:#m4ritime6atew4y"),
      },
      body: JSON.stringify({
        branchCode,
        terminalCode,
        length: 10,
        start: 0,
        draw: 1,
        search,
        order: null,
        columns: null,
      }),
    });

    if (!response.ok) {
      throw new Error(`Error fetching long stay cargo: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error in getLongStayCargo:", error);
    throw error;
  }
};