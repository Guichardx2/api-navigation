import axios from 'axios';

const axiosInstance = axios.create();

axiosInstance.interceptors.response.use(
  response => response,
  error => {
    if (error.response && (error.response.status === 401 || error.response.status === 400)) {
      localStorage.removeItem('user');
      window.location.href = '#/login';
    }
    return Promise.reject(error);
  }
);

const get = (url, params= {}) => {
  return requisition(url, 'get', null, params);
};

const post = (url, data) => {
  return requisition(url, 'post', data);
};

const put = (url, data) => {
  return requisition(url, 'put', data);
};

const del = (url, data) => {
  return requisition(url, 'delete', data);
};

const requisition = async (url, method, data = null, params= {}) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const token = user ? user.token : null;

  const headers = {
    token: token,
    "id-company": localStorage.getItem('id-company'),
    "X-Requested-With" : "XMLHttpRequest"
  };

  try {
    const response = await axiosInstance({
      method,
      url,
      data,
      headers,
      params,
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

export default { get, post, put, del };