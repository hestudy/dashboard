import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import $api from "../lib/client";

export const Route = createLazyFileRoute("/")({
  component: () => <Index></Index>,
});

const Index = () => {
  const navigate = useNavigate()
  const { error, isLoading } = $api.useQuery(
    "get",
    "/api/auth/profile",
    undefined,
    {
      retry: false,
      refetchOnWindowFocus: false,
    }
  );

  useEffect(()=>{
    if(error){
      navigate({to:"/login",replace:true})
    }
  },[error])

  if (isLoading) {
    return <div>loading</div>;
  }

  if (error) {
    return <div>Not logged in</div>;
  }

  return <div>demo</div>;
};
