import axios from "axios";
import { Message } from "element-ui";
const UNAUTHORIZED = 401;
const BADREQUEST = 400;
const NOTFOUND = 404;
const BadGateway = 502;

const service = axios.create({
  baseURL: "/api",
  withCredentials: true, // send cookies when cross-domain requests
  timeout: 100000 // request timeout
});
// request interceptor
service.interceptors.request.use(
  (config) => {
    const data = config.data;
    if (typeof config.data !== "undefined") {
      let newData = {};
      const dataArr = Object.keys(data);
      if (dataArr.indexOf("NOFILTERNULL") > -1) {
        newData = config.data;
      } else {
        Object.keys(data).forEach((item) => {
          if (
            data[item] !== "" &&
            data[item] !== undefined &&
            data[item] !== null
          ) {
            newData[item] = data[item];
          }
        });
      }
      config.data = newData;
    }
    return config;
  },
  (error) => {
    console.log(error); // for debug
    return Promise.reject(error);
  }
);

// response interceptor
service.interceptors.response.use(
  (response) => {
    const res = response.data;
    if (response.status === 200 && res.code === 2) {
      Message({
        message: '登录过期，请重新登录！',
        type: "error",
        duration: 2000
      });
      return Promise.reject();
    } else if (response.status !== 200) {
      Message({
        message: response.statusText || "Error",
        type: "error",
        duration: 2000
      });
      return Promise.reject(new Error(response.statusText || "Error"));
    } else if (response.code === 1 || response.data.code === 1) {
      console.log(
        "🚀 ~ file: request.js ~ line 89 ~ response.code",
        response.code
      );
      Message({
        message: response.message || response.data.message || "Error",
        type: "error",
        duration: 2000
      });
      return Promise.reject();
    } else {
      return res;
    }
  },
  (error) => {
    // console.error('请求失败返回值=', error.response || error)
    const { status } = error.response;
    if (status === BadGateway) {
      Message({
        message: "服务器发生错误",
        type: "error",
        duration: 5 * 1000
      });
    }
    if (status === UNAUTHORIZED) {
      Message({
        message: "身份验证已过期，请重新登录",
        type: "error",
        duration: 4 * 1000
      });
    }
    if (status === BADREQUEST) {
      Message({
        message: error.response.data.message
          ? error.response.data.message
          : error.response.data,
        type: "error",
        duration: 4 * 1000
      });
    }
    if (status === NOTFOUND) {
      Message({
        message: "接口不存在",
        type: "error",
        duration: 4 * 1000
      });
    }
    return Promise.reject(error);
  }
);

export default service;
