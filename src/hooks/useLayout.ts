import { layoutAtom } from "@/atoms/layoutAtom";
import { supabase } from "@/lib/supabase";
import { useRequest } from "ahooks";
import { useAtom } from "jotai";
import { tryit } from "radash";
import ReactGridLayout from "react-grid-layout";

export const useLayout = () => {
  const [layout, setLayout] = useAtom(layoutAtom);

  const addLayout = (v: ReactGridLayout.Layout) => {
    setLayout((layout) => {
      const newlayout = [...layout, v];
      saveLayout(newlayout);
      return newlayout;
    });
  };

  const removeLayout = (i: string) => {
    setLayout((layout) => {
      const newLayout = layout.filter((item) => item.i !== i);
      saveLayout(newLayout);
      return newLayout;
    });
  };

  useRequest(async () => {
    const res = await supabase.getInstance().from("layout").select("*");
    if (res.data?.[0]) {
      const [err, data] = await tryit(JSON.parse)(
        res.data[0].layout?.toString() || ""
      );
      if (err) {
        console.error(err);
        return;
      }
      setLayout(data);
    }
  });

  const { run: saveLayout } = useRequest(
    async (layout: ReactGridLayout.Layout[]) => {
      const res = await supabase.getInstance().from("layout").select("*");
      if (res.data?.[0]) {
        await supabase
          .getInstance()
          .from("layout")
          .upsert({
            id: res.data[0].id,
            layout: JSON.stringify(layout),
          });
      } else {
        await supabase
          .getInstance()
          .from("layout")
          .insert({
            layout: JSON.stringify(layout),
          });
      }
    },
    {
      manual: true,
      debounceWait: 300,
    }
  );

  return {
    layout,
    addLayout,
    removeLayout,
    saveLayout,
  };
};
