/* eslint-disable no-underscore-dangle */
import axios from 'axios';

const apiUrl = 'http://localhost:8082';

export const getToken = async ({ email, password }) => {
  const reqBody = { email, password };
  try {
    const response = await axios.post(`${apiUrl}/api/auth`, reqBody);
    const resJson = await response.data;
    return resJson;
  } catch (err) {
    const errResponse = err.response.data;
    return errResponse;
  }
};

export const fetchOrders = async (token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  try {
    const response = await axios.get(`${apiUrl}/api/orders`, config);
    const resJson = await response.data;
    return resJson;
  } catch (err) {
    const errResponse = err.response.data;
    return errResponse;
  }
};

export const updateOrder = async (updatedObj, token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  try {
    const response = await axios.put(`${apiUrl}/api/orders/${updatedObj._id}`, updatedObj, config);
    const resJson = await response.data;
    return resJson;
  } catch (err) {
    const errResponse = err.response.data;
    return errResponse;
  }
};
