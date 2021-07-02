import axios from 'axios';
import * as util from '../assets/util.js';
import Qs from 'qs'

const instance = axios.create({
  baseURL: 'https://tag-cloud.grouk.com',
  timeout: 10000,
  transformRequest: [function(data) {
    return Qs.stringify(data);
  }],
});

instance.defaults.headers.post['Content-Type'] = 'application/json';
//错误处理
instance.interceptors.response.use(function(response) {
  return response;
}, util.catchError);

export default instance;