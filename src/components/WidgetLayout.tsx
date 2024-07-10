import { useLayout } from "@/hooks/useLayout";
import { useSize } from "ahooks";
import { useRef } from "react";
import ReactGridLayout from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import WidgetRender from "./WidgetRender";
import { useReadonly } from "@/hooks/useReadonly";

const WidgetLayout = () => {
  const ref = useRef<HTMLDivElement>(null);
  const size = useSize(ref);
  const { layout } = useLayout();
  const { readonly } = useReadonly();

  return (
    <div className="h-full w-full" ref={ref}>
      <ReactGridLayout
        width={size?.width}
        cols={12}
        rowHeight={30}
        isResizable={!readonly}
        isDraggable={!readonly}
      >
        {layout.map((item) => (
          <div key={item.i} data-grid={item}>
            <WidgetRender data={item}></WidgetRender>
          </div>
        ))}
      </ReactGridLayout>
    </div>
  );
};

export default WidgetLayout;
