import { useState } from "react";
import api from "../../../../service/api";
const username = 'autogate';
const password = '#m4ritime6atew4y';
const encodedCredentials = btoa(`${username}:${password}`);
const useGateInOut = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const gateInOut = async (trx, posisi, laneposisi, virtualgate) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.post(
        "/AmsGateInOutInter",
        {
          trx,
          posisi,
          laneposisi,
          virtualgate,
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

  return { gateInOut, loading, error, data };
};

export default useGateInOut;
