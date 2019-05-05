import axios from 'axios';

export const setToken = (token) => {
  if(token) {
    axios.defaults.headers.common["auth"] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common["auth"];
  }
};

export function apiCall(method, path, data) {
  return new Promise((resolve, reject) => {
    return axios[method](path, data)
      .then(res => {
        return resolve(res.data);
      })
      .catch(err => {
        return reject(err.response.data.error);
      });
  });
}
