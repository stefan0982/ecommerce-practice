import { mongo }   from './mongo'
import { API_MAP } from './apiMap'

export const getProducts = () => {
  return mongo.get(`${API_MAP.product}`)
}

export const getProduct = id => {
  return mongo.get(`${API_MAP.product}/${id}`)
}

export const loginUser = body => {
  return mongo.post(`${API_MAP.user}/login`, body)
}

export const getAllUsers = token => {
  return mongo.get(`${API_MAP.user}/`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
}

const getUsers = token => {
  mongo.interceptors.request.use(function (config) {
    // Do something before request is sent
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

// Add a response interceptor
  mongo.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  }, function (error) {
    return Promise.reject(error);
  });
}

