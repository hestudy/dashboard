import { widgetAtom } from "@/atoms/widgetAtom";
import { supabase } from "@/lib/supabase";
import { useRequest } from "ahooks";
import { useAtom } from "jotai";

export const useWidget = () => {
  const [widget, setWidget] = useAtom(widgetAtom);

  const addIdWidget = (
    id: string,
    widget: {
      [key: string]: any;
      widget: string;
    }
  ) => {
    insertWidget(id, widget);
    setWidget((idWidget) => ({ ...idWidget, [id]: widget }));
  };

  const findWidget = (id: string) => {
    return widget[id];
  };

  useRequest(async () => {
    const res = await supabase.getInstance().from("widget").select("*");
    if (!res.error) {
      const widget: any = {};
      res.data.map((item) => {
        widget[item.i!] = JSON.parse(item.data?.toString() || "");
      });
      setWidget(widget);
    }
  });

  const { run: insertWidget } = useRequest(
    async (id: string, data: any) => {
      await supabase
        .getInstance()
        .from("widget")
        .insert({
          i: id,
          data: JSON.stringify(data),
        });
    },
    {
      manual: true,
    }
  );

  return {
    idWidget: widget,
    addIdWidget,
    findWidget,
  };
};
