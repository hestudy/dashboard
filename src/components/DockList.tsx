import { useReadonly } from "@/hooks/useReadonly";
import { Check, Settings } from "lucide-react";
import { Dock, DockIcon } from "./magicui/dock";
import WidgetSheet from "./WidgetSheet";

const DockList = () => {
  const { toggleReadonly, readonly } = useReadonly();

  return (
    <Dock direction="middle" className="bg-white/30 backdrop-blur">
      <DockIcon>
        <WidgetSheet></WidgetSheet>
      </DockIcon>
      {readonly ? (
        <DockIcon>
          <Settings onClick={toggleReadonly}></Settings>
        </DockIcon>
      ) : (
        <></>
      )}
      {!readonly ? (
        <DockIcon>
          <Check onClick={toggleReadonly} />
        </DockIcon>
      ) : (
        <></>
      )}
    </Dock>
  );
};

export default DockList;
