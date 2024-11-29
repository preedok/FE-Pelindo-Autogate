import { useState } from "react";
import api from "../../../../service/api";

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
            Authorization: "Basic " + btoa("<username>:<password>"),
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
