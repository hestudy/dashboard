import { Toaster } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

const client = new QueryClient();

export const Route = createRootRoute({
  component: () => (
    <div className="w-screen h-screen overflow-hidden">
      <Toaster></Toaster>
      <QueryClientProvider client={client}>
        <Outlet />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
      <TanStackRouterDevtools />
    </div>
  ),
});
