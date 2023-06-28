import axios from 'axios';
import qs from 'qs';
import { useStoreAuth } from 'src/features/authentication/utils/user';

// declaration of axios
 const ApiInstance = axios.create(
  {
    baseURL: 'http://127.0.0.1:8080',
    paramsSerializer: params => qs.stringify(params)
  }
);
// Request interceptor for API calls
ApiInstance.interceptors.request.use(
  async config => {
    const token = useStoreAuth().token
    config.headers = {
      'Authorization': token != undefined ? 'Bearer ' + token : '',
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
    return config;
  },
  error => {
    Promise.reject(error)
  });
// Response interceptor for API calls
ApiInstance.interceptors.response.use((response) => {
  return response
}, async function (error) {
  const originalRequest = error.config;
  const token = useStoreAuth().token
  if (error.response.status === 403 && !originalRequest._retry) {
    originalRequest._retry = true;
    const access_token = await token;
    axios.defaults.headers.common['Authorization'] = access_token != undefined ? 'Bearer ' + access_token : '';
    return ApiInstance(originalRequest);
  }
  return Promise.reject(error);
});


export { ApiInstance };
