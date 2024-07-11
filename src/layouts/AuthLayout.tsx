import FullLoading from "@/components/FullLoading";
import Login from "@/components/Login";
import { useUser } from "@/hooks/useUser";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  const { user, loading } = useUser();

  if (loading) {
    return <FullLoading></FullLoading>;
  }

  if (!user) {
    return <Login></Login>;
  }

  return <Outlet></Outlet>;
};

export default AuthLayout;
