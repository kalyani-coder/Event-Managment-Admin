import axios from "axios";

const baseUrl = "http://localhost:8888/api";

const axiosClient = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

axiosClient.interceptors.request.use((config) => {
  return config;
});

axiosClient.interceptors.response.use((response) => {
  return response;
});

export const getRequest = async (url, params = {}) => {
  try {
    // Include params in the config object
    const requestConfig = {
      ...config,
      params: params, // Add params here
    };

    return await axiosClient.get(url, requestConfig); // Use requestConfig instead of config
  } catch (error) {
    throw error;
  }
};

export const urlVariables = {
  inventory_stocks: "inventory-stocks",
};
