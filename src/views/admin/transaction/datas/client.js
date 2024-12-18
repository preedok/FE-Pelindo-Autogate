const API_URL = "https://ptosc-integration-api.pelindo.co.id/AMS";

export const fetchTransactionHeader = async (branchCode, terminalCode, search, direction) => {
  const response = await fetch(`${API_URL}/GetAMSTransactionHeaderDT`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Basic " + btoa("autogate:#m4ritime6atew4y"),
    },
    body: JSON.stringify({
      branchCode,
      terminalCode,
      direction,
      length: 10,
      start: 0,
      draw: 1,
      search,
      order: null,
      columns: null,
    }),
  });
  return response.json();
};

export const fetchTransactionDetail = async (noTiket, branchCode, terminalCode) => {
  const response = await fetch(`${API_URL}/GetAMSTransactionDetailDT`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Basic " + btoa("autogate:#m4ritime6atew4y"),
    },
    body: JSON.stringify({
      branchCode,
      terminalCode,
      noTiket,
      length: 10,
      start: 0,
      draw: 1,
      search: "",
      order: null,
      columns: null,
    }),
  });
  return response.json();
};