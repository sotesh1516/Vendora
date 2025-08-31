import axios from "axios"

const axiosInstance = axios.create({
    baseURL: "http://localhost:5000/api",
    withCredentials: true,
})

// Add a request interceptor
axiosInstance.interceptors.request.use(function (config) {
  config.headers['Authorization'] = `Bearer ${getAccessToken()}`;
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
}
);

let getAccessToken = () => {};
let setAccesstoken = () => {};

export function setTokenHandler(getter, setter) {
  getAccessToken = getter;
  setAccesstoken = setter;
}
// Add a response interceptor
axiosInstance.interceptors.response.use(function onFulfilled(response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  return response;
}, async function onRejected(error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  const originalRequest = error.config;

  if (error.response?.status == 401 && !originalRequest._retry)
  {
    const accessToken = getAccessToken();
    //update the accesstoken using the refresh endpoint and run the request again
    if (!accessToken)
    {
      return Promise.reject(error) // this is because axios call is async so in order to get something on the catch block we
      //have to return a promise reject
    }

    originalRequest._retry = true
    try {
      const response = await axiosInstance.post("/auth/refresh");
      setAccesstoken(response.data.accessToken);
      originalRequest.headers['Authorization'] = `Bearer ${response.data.accessToken}`;
      return axiosInstance(originalRequest);

    } catch (error) {
      console.log({message: "Error occured during token refresh"});
      return Promise.reject(error);
    }
    
    

  }
  return Promise.reject(error);
});

export default axiosInstance