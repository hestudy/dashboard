import { layoutAtom } from "@/atoms/layoutAtom";
import { useAtom } from "jotai";
import ReactGridLayout from "react-grid-layout";

export const useLayout = () => {
  const [layout, setLayout] = useAtom(layoutAtom);

  const addLayout = (v: ReactGridLayout.Layout) => {
    setLayout((layout) => [...layout, v]);
  };

  return {
    layout,
    addLayout,
  };
};
