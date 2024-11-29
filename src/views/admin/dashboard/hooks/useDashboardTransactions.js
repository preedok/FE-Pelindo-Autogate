import { useState, useEffect } from "react";
import axios from "axios";

export const useDashboardTransactions = (lanePosition) => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardTransactions = async () => {
      try {
        setLoading(true);
        const response = await axios.post(
          "https://ptosc-integration-api.pelindo.co.id/AMS/GetAMSDashboardTransaction",
          { lanePosition },
          {
            headers: {
              Authorization: `Basic ${btoa(
                `${process.env.REACT_APP_API_USERNAME}:${process.env.REACT_APP_API_PASSWORD}`
              )}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.data.ResponseStatus === "success") {
          setTransactions(response.data.ResponseData);
        } else {
          throw new Error(
            response.data.ResponseMessage || "Failed to fetch transactions"
          );
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (lanePosition) {
      fetchDashboardTransactions();
    }
  }, [lanePosition]);

  return { transactions, loading, error };
};

export const useDashboardTransactionDetails = (noTiket, options = {}) => {
  const [details, setDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const {
    length = 10,
    start = 0,
    draw = 1,
    search = "",
    order = [],
    columns = [],
  } = options;

  useEffect(() => {
    const fetchTransactionDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.post(
          "https://ptosc-integration-api.pelindo.co.id/AMS/GetAMSDashboardDetailDT",
          {
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
              Authorization: `Basic ${btoa(
                `${process.env.REACT_APP_API_USERNAME}:${process.env.REACT_APP_API_PASSWORD}`
              )}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.data.ResponseStatus === "success") {
          setDetails(response.data.ResponseData[0]?.ResponseData || []);
        } else {
          throw new Error(
            response.data.ResponseMessage ||
              "Failed to fetch transaction details"
          );
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (noTiket) {
      fetchTransactionDetails();
    }
  }, [noTiket, length, start, draw, search, order, columns]);

  return { details, loading, error };
};
