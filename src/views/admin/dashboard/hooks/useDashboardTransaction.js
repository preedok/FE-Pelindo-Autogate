import { useState } from "react";
import api from "../../../../service/api";

const useDashboardTransaction = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const getDashboardTransaction = async (lanePosition) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.post(
        "/GetAMSDashboardTransaction",
        {
          lanePosition,
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

  return { getDashboardTransaction, loading, error, data };
};

export default useDashboardTransaction;
