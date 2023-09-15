import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

const queryClient = new QueryClient()
// set rourte on provider
<QueryClientProvider client={queryClient}> 
  /* route */
  </QueryClientProvider>
