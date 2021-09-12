import { useEffect, useState } from 'react';
function useLocalStorage<T>(
  key: string,
  initialValue: T,
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [storageValue, setStorageValue] = useState<T>(() => {
    const localStorageItem = window.localStorage.getItem(key);
    return localStorageItem ? JSON.parse(localStorageItem) : initialValue;
  });

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(storageValue));
  }, [key, storageValue]);

  return [storageValue, setStorageValue];
}

export default useLocalStorage;
