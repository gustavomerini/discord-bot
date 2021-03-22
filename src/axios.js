const axios = require("axios");

const setupInterceptors = () => {
  axios.interceptors.request.use(
    (config) => {
      // eslint-disable-next-line
      config.headers = {
        ...config.headers,
        "x-api-key": process.env.API_KEY,
        "Content-Type": "application/json",
        "Accept": "*/*"
      };

      return config;
    },
    (error) => Promise.reject(error)
  );
};

exports.default = setupInterceptors;