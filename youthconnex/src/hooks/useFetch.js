import { useState, useEffect, useCallback } from 'react';
import { getErrorMessage } from '../utils/helpers';

/**
 * Custom hook for fetching data from API
 * @param {function} fetchFn - Async function that returns a promise
 * @param {array} dependencies - Dependency array for when to refetch
 * @returns {object} { data, loading, error, refetch }
 */
export function useFetch(fetchFn, dependencies = []) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetchFn();
      setData(result.data);
    } catch (err) {
      setError(getErrorMessage(err));
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  }, [fetchFn]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);

  return { data, loading, error, refetch: fetch };
}
