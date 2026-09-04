// Reintenta una función asíncrona en caso de error transitorio (cold start, error de red o error 5xx)
export const withRetry = async (fn, { retries = 2, delay = 4000 } = {}) => {
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      return await fn();
    } catch (err) {
      const status = err.response?.status;
      const isTransient = !status || status >= 500;
      const isLastAttempt = attempt === retries;

      if (!isTransient || isLastAttempt) throw err;

      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }
};