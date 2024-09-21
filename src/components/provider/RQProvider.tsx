import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import React, { ReactNode, useState } from 'react';

interface Props {
  children: ReactNode;
}

function RQProvider({ children }: Props) {
  const [client] = useState(
    new QueryClient({
      defaultOptions: {
        queries: {
          refetchOnWindowFocus: false,
          retryOnMount: true,
          refetchOnReconnect: false,
          retry: false,
          staleTime: 1000 * 60 * 10,
          gcTime: 1000 * 60 * 15,
        },
      },
    }),
  );

  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}

export default RQProvider;
