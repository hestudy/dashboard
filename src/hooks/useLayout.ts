import { layoutAtom } from "@/atoms/layoutAtom";
import { useAtom } from "jotai";
import ReactGridLayout from "react-grid-layout";

export const useLayout = () => {
  const [layout, setLayout] = useAtom(layoutAtom);

  const addLayout = (v: ReactGridLayout.Layout) => {
    setLayout((layout) => [...layout, v]);
  };

  const removeLayout = (i: string) => {
    setLayout((layout) => layout.filter((item) => item.i !== i));
  };

  return {
    layout,
    addLayout,
    removeLayout,
  };
};
