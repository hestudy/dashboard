import IFrameWidget from "@/widgets/IFrameWidget";
import { Plus } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";

const WidgetSheet = () => {
  return (
    <Sheet>
      <SheetTrigger>
        <Plus />
      </SheetTrigger>
      <SheetContent className="flex flex-col">
        <SheetHeader>
          <SheetTitle>Widget List</SheetTitle>
          <SheetDescription>find you need widgets</SheetDescription>
        </SheetHeader>
        <div className="flex-1 h-0 overflow-y-auto">
          <IFrameWidget></IFrameWidget>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default WidgetSheet;
