
import qs from 'qs';
import { useState, useEffect } from 'react';

export const http = async (
  url,
  data,
  customConfig,
) => {
  const config = {
    method: "GET",
    ...customConfig,
  };

  if (config.method.toUpperCase() === "GET") {
    url += `?${qs.stringify(data)}`;
  } else {
    config.body = JSON.stringify(data || {});
  }

  return window
    .fetch(`${url}`, config)
    .then(async (response) => {
      if (response.status === 401) {
        return Promise.reject({ message: "网络错误，请稍后重试" });
      }
      const data = await response.json();
      if (response.ok) {
        return data;
      } else {
        return Promise.reject(data);
      }
    });
};


export const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // 每次在value变化以后，设置一个定时器
    const timeout = setTimeout(() => setDebouncedValue(value), delay);
    // 每次在上一个useEffect处理完以后再运行
    return () => clearTimeout(timeout);
  }, [value, delay]);

  return debouncedValue;
};