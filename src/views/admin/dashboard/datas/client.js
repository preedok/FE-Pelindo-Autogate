
const API_BASE_URL = "https://ptosc-integration-api.pelindo.co.id/AMS";

export const getDashboardTransaction = async (lanePosition) => {
  const response = await fetch(`${API_BASE_URL}/GetAMSDashboardTransaction`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Basic " + btoa("autogate:#m4ritime6atew4y"), 
    },
    body: JSON.stringify({ lanePosition }),
  });
  return response.json();
};
export const getDashboardTransactionDetail = async (noTiket) => {
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
      order: [{ column: 0, dir: "DESC", name: "NO_VIN" }],
      columns: [
        {
          data: "NO_VIN",
          name: "NO_VIN",
          searchable: true,
          orderable: true,
          search: { value: "", regex: "" },
        },
      ],
    }),
  });
  return response.json();
};
export const getLongStayCargo = async () => {
  const response = await fetch(`${API_BASE_URL}/GetAMSLongStayCargoDT`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Basic " + btoa("autogate:#m4ritime6atew4y"), 
    },
    body: JSON.stringify({
      branchCode: "4100",
      terminalCode: "41001",
      length: 10,
      start: 0,
      draw: 1,
      search: "",
      order: [{ column: 2, dir: "DESC", name: "LAMA_TIMBUN" }],
      columns: [
        {
          data: "NO_VIN",
          name: "NO_VIN",
          searchable: true,
          orderable: true,
          search: { value: "", regex: "" },
        },
        {
          data: "NM_OWNER",
          name: "NM_OWNER",
          searchable: true,
          orderable: true,
          search: { value: "", regex: "" },
        },
        {
          data: "LAMA_TIMBUN",
          name: "LAMA_TIMBUN",
          searchable: true,
          orderable: true,
          search: { value: "", regex: "" },
        },
        {
          data: "NM_YBLOK",
          name: "NM_YBLOK",
          searchable: true,
          orderable: true,
          search: { value: "", regex: "" },
        },
        {
          data: "NO_BL",
          name: "NO_BL",
          searchable: true,
          orderable: true,
          search: { value: "", regex: "" },
        },
      ],
    }),
  });
  return response.json();
};
