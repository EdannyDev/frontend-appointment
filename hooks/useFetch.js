import { useState, useEffect, useCallback, useRef } from "react";
import { logger } from "@/utils/logger";
import { Notification } from "@/components/notification";

// Hook reutilizable para el patrón fetch + loading + manejo de error
export const useFetch = (fetchFn, { deps = [], errorMessage = "Error al cargar los datos", initialData = null } = {}) => {
  const [data, setData] = useState(initialData);
  const [isLoading, setIsLoading] = useState(true);
  const fetchFnRef = useRef(fetchFn);
  fetchFnRef.current = fetchFn;

  const execute = useCallback(async () => {
    setIsLoading(true);
    try {
      const result = await fetchFnRef.current();
      setData(result);
      return result;
    } catch (err) {
      logger.error(errorMessage, err);
      Notification.error(err.response?.data?.message || errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [errorMessage]);

  useEffect(() => {
    execute();
  }, deps);

  return { data, setData, isLoading, refetch: execute };
};