import React, { useEffect, useState, useReducer } from 'react';
import axios from 'axios';
import { Action, ReducerState } from '../types';

// const fetchReducer = <T extends unknown>(
//   state: ReducerState<T>,
//   action: Action<T>,
// ): ReducerState<T> => {
//   const { type } = action;
//   switch (type) {
//     case 'FETCH_INIT':
//       return { isLoading: true };
//     case 'FETCH_SUCCESS':
//       return { isLoading: false, data: action.payload };
//     case 'FETCH_FAILURE':
//       return { isLoading: false, error: action.payload };
//     default:
//       throw new Error(`Unexpected action type: ${type}`);
//   }
// };

const createDataFetchReducder =
  <T>() =>
  (state: ReducerState<T>, action: Action<T>): ReducerState<T> => {
    switch (action.type) {
      case 'FETCH_INIT':
        return { isLoading: true };
      case 'FETCH_SUCCESS':
        return { isLoading: false, data: action.payload };
      case 'FETCH_FAILURE':
        return { isLoading: false, error: action.error };
    }
  };

const useFetch = <T extends unknown>(url: string) => {
  // const [data, setData] = useState<T | undefined>();
  // const [status, setStatus] = useState<Status>('idle');
  // const [error, setError] = useState<Error | undefined>();
  const dataFetchReducer = createDataFetchReducder<T>();
  const [state, dispatch] = useReducer(dataFetchReducer, { isLoading: false });

  useEffect(() => {
    if (!url) return;
    const fetch = async () => {
      dispatch({ type: 'FETCH_INIT' });
      try {
        // setStatus('pending');
        const res = await axios.get(url);
        dispatch({ type: 'FETCH_SUCCESS', payload: res.data });
      } catch (e: unknown) {
        if (axios.isAxiosError(e) && e.response) {
          // setError(e.response.data.error.message);
          // setStatus('rejected');
          dispatch({ type: 'FETCH_FAILURE', error: new Error(e.response.data.error.message) });
        }
      }
    };
    fetch();
  }, [url]);

  // useEffect(() => {
  //   if (status === 'resolved' || status === 'rejected') setStatus('idle');
  // }, [status]);

  return { ...state };
};

export default useFetch;
