import { useWidget } from "@/hooks/useWidget";
import { useMemo } from "react";
import ReactGridLayout from "react-grid-layout";

const WidgetRender = ({ data }: { data: ReactGridLayout.Layout }) => {
  const { findWidget } = useWidget();

  const widgetData = useMemo(() => findWidget(data.i), [data]);

  return (
    <div className="w-full h-full p-4 bg-white/30 backdrop-blur rounded">
      {widgetData.widget === "iframe" && (
        <iframe className="w-full h-full" src={widgetData.url}></iframe>
      )}
    </div>
  );
};

export default WidgetRender;
