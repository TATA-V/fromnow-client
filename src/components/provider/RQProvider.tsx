import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import React, { ReactNode, useState } from 'react';
import { isWeb } from '@utils/deviceInfo';
import { ENV_MODE } from '@env';

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
        },
      },
    }),
  );

  return (
    <QueryClientProvider client={client}>
      {children}
      {isWeb && <ReactQueryDevtools initialIsOpen={ENV_MODE === 'local'} />}
    </QueryClientProvider>
  );
}

export default RQProvider;
