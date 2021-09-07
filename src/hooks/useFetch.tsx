import React, { useEffect, useState } from 'react';
import axios from 'axios';
const { REACT_APP_API_KEY, BASE_URL } = process.env;
const useFetch = <T extends unknown>(url: string): [T | null, boolean] => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setIsLoading] = useState<boolean>(false);
  useEffect(() => {
    if (!url) return;
    const fetch = async () => {
      setIsLoading(true);
      const res = await axios.get(url);
      setData(res.data);
      setIsLoading(false);
    };
    fetch();
  }, [url]);

  return [data, loading];
};

export default useFetch;
