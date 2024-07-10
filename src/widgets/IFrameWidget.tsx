import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useWidget } from "@/hooks/useWidget";
import { useLayout } from "@/hooks/useLayout";
import { useBoolean } from "ahooks";
import { nanoid } from "nanoid";
import { useForm } from "react-hook-form";

const IFrameWidget = () => {
  const [open, openAc] = useBoolean(false);
  const { addLayout } = useLayout();
  const { addIdWidget } = useWidget();

  const form = useForm({
    defaultValues: {
      url: "",
      title: "",
    },
    mode: "onChange",
  });

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        openAc.set(v);
        if (v) {
          form.reset();
        }
      }}
    >
      <DialogTrigger asChild>
        <Card className="hover:bg-gray-100 cursor-pointer">
          <CardHeader>
            <CardTitle>IFrame</CardTitle>
            <CardDescription>show any website</CardDescription>
          </CardHeader>
        </Card>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add IFrame Widget</DialogTitle>
          <DialogDescription>fill form to add</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <FormField
            control={form.control}
            name="title"
            rules={{
              required: "title is required",
            }}
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input {...field}></Input>
                  </FormControl>
                  <FormDescription>show title in layout</FormDescription>
                  <FormMessage></FormMessage>
                </FormItem>
              );
            }}
          ></FormField>
          <FormField
            control={form.control}
            name="url"
            rules={{
              required: "url is required",
              pattern: {
                value: /^https?:\/\/[^\s$.?#].[^\s]*$/,
                message: "invalid url",
              },
            }}
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Url</FormLabel>
                  <FormControl>
                    <Input {...field}></Input>
                  </FormControl>
                  <FormDescription>load url in widget</FormDescription>
                  <FormMessage></FormMessage>
                </FormItem>
              );
            }}
          ></FormField>
        </Form>
        <DialogFooter>
          <Button variant={"ghost"} onClick={openAc.setFalse}>
            Cancel
          </Button>
          <Button
            onClick={async () => {
              if (await form.trigger()) {
                const id = nanoid();
                addIdWidget(id, {
                  ...form.getValues(),
                  widget: "iframe",
                });
                addLayout({
                  i: id,
                  w: 4,
                  h: 4,
                  x: 0,
                  y: 0,
                });
                openAc.setFalse();
              }
            }}
          >
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default IFrameWidget;
