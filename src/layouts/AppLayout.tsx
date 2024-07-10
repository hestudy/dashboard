import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <div className="h-screen w-screen overflow-hidden bg-background text-white">
      <Outlet></Outlet>
    </div>
  );
};

export default AppLayout;
