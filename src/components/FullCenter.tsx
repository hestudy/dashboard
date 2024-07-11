import { PropsWithChildren } from "react";

const FullCenter = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex justify-center items-center w-full h-full">
      {children}
    </div>
  );
};

export default FullCenter;
