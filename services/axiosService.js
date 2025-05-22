import axios from 'axios';

const axiosInstance = axios.create();


const requisition = async (url, method, data = null, params= {}) => {

  try {
    const response = await axiosInstance({
      method,
      url,
      data,
      params,
    });
    
    return response.data;
  } catch (error) {
    console.error('Error in requisition:', error);
    throw error;
  }
};

const get = (url, params= {}) => {
  return requisition(url, 'get', null, params);
};

export default { get };