// src/views/transaction/datas/client.js
const API_URL = "https://ptosc-integration-api.pelindo.co.id/AMS"; // Ganti dengan URL API yang sesuai

export const fetchTransactionHeader = async () => {
  const response = await fetch(`${API_URL}/GetAMSTransactionHeaderDT`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Basic " + btoa("autogate:#m4ritime6atew4y"),
    },
    body: JSON.stringify({
      branchCode: "4100",
      terminalCode: "41001",
      direction: "RCV",
      length: 10,
      start: 0,
      draw: 1,
      search: "",
      order: [
        {
          column: 2,
          dir: "DESC",
          name: "JUMLAH_VIN",
        },
      ],
      columns: [
        {
          data: "TGL_GATE_IN",
          name: "TGL_GATE_IN",
          searchable: true,
          orderable: true,
        },
        {
          data: "TGL_GATE_OUT",
          name: "TGL_GATE_OUT",
          searchable: true,
          orderable: true,
        },
        {
          data: "JUMLAH_VIN",
          name: "JUMLAH_VIN",
          searchable: true,
          orderable: true,
        },
      ],
    }),
  });
  return response.json();
};

export const fetchTransactionDetail = async (noTiket) => {
  const response = await fetch(`${API_URL}/GetAMSTransactionDetailDT`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Basic " + btoa("autogate:#m4ritime6atew4y"),
    },
    body: JSON.stringify({
      branchCode: "4100",
      terminalCode: "41001",
      noTiket: noTiket,
      length: 10,
      start: 0,
      draw: 1,
      search: "",
      order: [
        {
          column: 0,
          dir: "DESC",
          name: "NO_VIN",
        },
      ],
      columns: [
        { data: "NO_VIN", name: "NO_VIN", searchable: true, orderable: true },
      ],
    }),
  });
  return response.json();
};
