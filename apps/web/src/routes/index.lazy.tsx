import { createLazyFileRoute } from "@tanstack/react-router";
import $api from "../lib/client";

export const Route = createLazyFileRoute("/")({
  component: () => <Index></Index>,
});

const Index = () => {
  const { error, isLoading } = $api.useQuery(
    "get",
    "/api/auth/profile",
    undefined,
    {
      retry: false,
      refetchOnWindowFocus: false,
    }
  );

  if (isLoading) {
    return <div>loading</div>;
  }

  if (error) {
    return <div>Not logged in</div>;
  }

  return <div>demo</div>;
};
