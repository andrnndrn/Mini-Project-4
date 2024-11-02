import axios from "axios";

const API_URL = import.meta.env.VITE_BASE_URL;

export const get = async () => {
  const res = await axios.get(`${API_URL}/students`, {
    headers: {
      "Content-Type": "application/json",
      "api-key": "RJS1-202402",
    },
  });
  return res.data;
};

export const post = async (data) => {
  const res = await axios.post(`${API_URL}/students`, data, {
    headers: {
      "Content-Type": "application/json",
      "api-key": "RJS1-202402",
    },
  });
  return res.data;
};

export const del = async (id) => {
  const res = await axios.delete(`${API_URL}/students/${id}`, {
    headers: {
      "Content-Type": "application/json",
      "api-key": "RJS1-202402",
    },
  });
  return res.data;
};

export const edit = async (id, data) => {
    const res = await axios.put(`${API_URL}/students/${id}`, data, {
      headers: {
        "Content-Type": "application/json",
        "api-key": "RJS1-202402",
      },
    });
    return res.data;
};
  
export const info = async (id) => {
    const res = await axios.get(`${API_URL}/students/${id}`, {
      headers: {
        "Content-Type": "application/json",
        "api-key": "RJS1-202402",
      },
    });
    return res.data;
};