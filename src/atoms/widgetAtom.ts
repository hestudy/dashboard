import { atom } from "jotai";

export const widgetAtom = atom<{
  [key: string]: { widget: string; [key: string]: any };
}>({});
