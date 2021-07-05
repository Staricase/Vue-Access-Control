import axios from 'axios';
import * as util from '../assets/util.js';
import Qs from 'qs'

const instance = axios.create({
  baseURL: 'https://tag-cloud.grouk.com',
  timeout: 10000,
  transformRequest: [function (data) {
    return Qs.stringify(data);
  }],
});

instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

//错误处理
instance.interceptors.response.use(function (response) {
  if (response.data.code != 200) {
    return Promise.reject({
      // code: response.data.code,
      // message: response.data.msg,
      response: response
    });
  }
  return response;
}, util.catchError);

export default instance;