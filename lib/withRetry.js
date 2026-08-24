// Reintenta una petición si falla por causas transitorias (cold start, red inestable)
export const withRetry = async (fn, { retries = 2, delay = 4000 } = {}) => {
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      return await fn();
    } catch (err) {
      const status = err.response?.status;
      const isAuthError = status === 401 || status === 403;
      const isLastAttempt = attempt === retries;

      if (isAuthError || isLastAttempt) throw err;

      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }
};