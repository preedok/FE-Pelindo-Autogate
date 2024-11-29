import { useState } from "react";
import api from "../../../../service/api";
const username = process.env.REACT_APP_API_USERNAME;
const password = process.env.REACT_APP_API_PASSWORD;
const encodedCredentials = btoa(`${username}:${password}`);
const useTransactionDetail = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const getTransactionDetail = async (
    branchCode,
    terminalCode,
    noTiket,
    length,
    start,
    draw,
    search,
    order,
    columns
  ) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.post(
        "/GetAMSTransactionDetailDT",
        {
          branchCode,
          terminalCode,
          noTiket,
          length,
          start,
          draw,
          search,
          order,
          columns,
        },
        {
          headers: {
            'Authorization': `Basic ${encodedCredentials}`,
            'Content-Type': 'application/json',
          },
        }
      );
      setData(response.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return { getTransactionDetail, loading, error, data };
};

export default useTransactionDetail;
