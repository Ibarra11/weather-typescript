import { useEffect, useState } from 'react';
import axios from 'axios';
import { Status } from '../types';

const useFetch = <T extends unknown>(url: string) => {
  const [data, setData] = useState<T | undefined>();
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState<Error | undefined>();
  useEffect(() => {
    if (!url) return;
    const fetch = async () => {
      try {
        setStatus('pending');
        const res = await axios.get(url);
        setData(res.data);
        setStatus('resolved');
      } catch (e: unknown) {
        if (axios.isAxiosError(e) && e.response) {
          setError(e.response.data.error.message);
          setStatus('rejected');
        }
      }
    };
    fetch();
  }, [url]);

  useEffect(() => {
    if (status === 'resolved' || status === 'rejected') setStatus('idle');
  }, [status]);

  return [data, status, error] as const;
};

export default useFetch;
