import { useEffect, useState } from "react";

const useAxios = ({ requestFn, onSuccess, onError }) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleRequestData = async () => {
    setLoading(true);

    try {
      const res = await requestFn();
      setData(res);
      onSuccess?.(res);
    } catch (err) {
      setError(err);
      onError?.(err);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    handleRequestData();

    console.log("good....");
  }, []);

  return { data, error, loading };
};

export default useAxios;
