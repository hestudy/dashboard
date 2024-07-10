import { readonlyAtom } from "@/atoms/readonlyAtom";
import { useAtom } from "jotai";

export const useReadonly = () => {
  const [readonly, setReadonly] = useAtom(readonlyAtom);

  const toggleReadonly = () => {
    setReadonly((readonly) => !readonly);
  };

  return {
    readonly,
    toggleReadonly,
    setReadonly,
  };
};
