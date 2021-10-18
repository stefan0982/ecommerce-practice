import axios from 'axios';

export const mongo = axios.create({
  baseURL: `http://localhost:5000`,
  // headers: {
  //   'Access-Control-Allow-Origin': '*'
  // }
});
