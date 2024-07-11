import Login from "@/components/Login";
import { useUser } from "@/hooks/useUser";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  const { user } = useUser();

  if (!user) {
    return <Login></Login>;
  }

  return <Outlet></Outlet>;
};

export default AuthLayout;
