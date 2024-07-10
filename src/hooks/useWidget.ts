import { widgetAtom } from "@/atoms/widgetAtom";
import { useAtom } from "jotai";

export const useWidget = () => {
  const [idWidget, setIdWidget] = useAtom(widgetAtom);

  const addIdWidget = (
    id: string,
    widget: {
      [key: string]: any;
      widget: string;
    }
  ) => {
    setIdWidget((idWidget) => ({ ...idWidget, [id]: widget }));
  };

  const findWidget = (id: string) => {
    return idWidget[id];
  };

  return {
    idWidget,
    addIdWidget,
    findWidget,
  };
};
