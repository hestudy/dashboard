import { useLayout } from "@/hooks/useLayout";
import { useReadonly } from "@/hooks/useReadonly";
import { useWidget } from "@/hooks/useWidget";
import { Trash } from "lucide-react";
import { useMemo } from "react";
import ReactGridLayout from "react-grid-layout";

const WidgetRender = ({ data }: { data: ReactGridLayout.Layout }) => {
  const { findWidget } = useWidget();
  const { readonly } = useReadonly();
  const { removeLayout } = useLayout();

  const widgetData = useMemo(() => findWidget(data.i), [data]);

  return (
    <div className="w-full h-full px-4 pb-4 bg-white/30 backdrop-blur rounded flex flex-col">
      <div className="flex py-2 justify-between">
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
          {widgetData?.title}
        </h4>
        {!readonly && (
          <div className="flex items-center space-x-2">
            <Trash
              className="size-5 cursor-pointer un-draggable"
              onClick={() => {
                removeLayout(data.i);
              }}
            />
          </div>
        )}
      </div>
      <div className="flex-1 h-0">
        {widgetData?.widget === "iframe" && (
          <iframe
            className="w-full h-full rounded"
            src={widgetData.url}
          ></iframe>
        )}
      </div>
    </div>
  );
};

export default WidgetRender;
