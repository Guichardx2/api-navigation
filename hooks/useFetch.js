import { useState, useEffect } from "react";
import axiosService from "../services/axiosService";

export const useFetch = (url, params = {}) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosService.get(url, params);
        console.log("Fetched data:", response);
        setData(response);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [url, JSON.stringify(params)]);

  return { data };
};
