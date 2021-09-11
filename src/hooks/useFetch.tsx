import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Status } from '../types';
const { REACT_APP_API_KEY, BASE_URL } = process.env;

const useFetch = <T extends unknown>(url: string): [T | undefined, Status] => {
  const [data, setData] = useState<T | undefined>();
  const [status, setStatus] = useState<Status>('idle');
  useEffect(() => {
    if (!url) return;
    const fetch = async () => {
      try {
        setStatus('pending');
        const res = await axios.get(url);
        setData(res.data);
        setStatus('resolved');
        console.log('hi');
        setStatus('idle');
      } catch {}
    };
    fetch();
  }, [url]);

  return [data, status];
};

export default useFetch;
