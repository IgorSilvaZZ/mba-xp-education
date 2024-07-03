import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

/* import StyledComponents from "./StyledComponents.tsx"; */
import DataFetching from "./DataFetchingReactQuery.tsx";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
      <DataFetching />
    </QueryClientProvider>
  </React.StrictMode>
);
