import { QueryClient } from "@tanstack/react-query";

const queryClientGlobal = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 2 * 60 * 1000,
      refetchOnWindowFocus: false,
    },
  },
});

export default queryClientGlobal
