import { supabase } from "@/lib/supabase";
import { useRequest } from "ahooks";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";

const Login = () => {
  const form = useForm({
    defaultValues: {
      email: "",
    },
    mode: "onChange",
  });

  const { run, loading } = useRequest(
    async () => {
      if (await form.trigger()) {
        const res = await supabase.getInstance().auth.signInWithOtp({
          email: form.getValues("email"),
          options: {
            emailRedirectTo: "http://localhost:5173/verify",
          },
        });
        if (res.error) {
          toast.error(res.error.message);
          return;
        }
        toast.success("Email sent successfully");
        return res.data;
      }
    },
    {
      manual: true,
    }
  );

  return (
    <div className="w-full h-full flex justify-center items-center">
      <Card className="w-full xl:w-[30%]">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Enter your credentials to login</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <FormField
              control={form.control}
              name="email"
              rules={{
                required: "Email is required",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Email is invalid",
                },
              }}
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input {...field}></Input>
                    </FormControl>
                    <FormDescription>Enter your email address</FormDescription>
                    <FormMessage></FormMessage>
                  </FormItem>
                );
              }}
            ></FormField>
          </Form>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button loading={loading} onClick={run}>
            Log in
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
