import { useState } from "react";

export const useMutate = ({ requestFn, onSuccess, onError }) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const mutate = async (form) => {
    try {
      setLoading(true);
      const res = await requestFn(form);
      setData(res);
      onSuccess?.(res);
    } catch (err) {
      setError(err);
      onError?.(err);
    } finally {
      setLoading(false);
    }
  };

  return { mutate, loading, error, data };
};