import { useState } from "react";
import api from "../../../../service/api";
const username = 'autogate';
const password = '#m4ritime6atew4y';
const encodedCredentials = btoa(`${username}:${password}`);
const useLongStayCargo = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const getLongStayCargo = async (
    branchCode,
    terminalCode,
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
        "/GetAMSLongStayCargoDT",
        {
          branchCode,
          terminalCode,
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

  return { getLongStayCargo, loading, error, data };
};

export default useLongStayCargo;
