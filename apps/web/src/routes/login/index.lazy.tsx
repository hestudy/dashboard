import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import $api from "@/lib/client";
import { paths } from "@/schema";
import { createLazyFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";

export const Route = createLazyFileRoute("/login/")({
  component: () => <Login></Login>,
});

const Login = () => {
  const navigate = useNavigate();
  const form = useForm<
    NonNullable<
      paths["/api/auth/login"]["post"]["requestBody"]
    >["content"]["application/json"]
  >({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const mutation = $api.useMutation("post", "/api/auth/login", {
    onSuccess(data) {
      if (data.success) {
        localStorage.setItem("token", data.data.token);
        navigate({ to: "/", replace: true });
      }
    },
  });

  return (
    <div className="w-full h-full flex justify-center items-center">
      <Form {...form}>
        <Card className="px-10 py-5">
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>
              Enter your email and password to login
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FormField
              control={form.control}
              name="email"
              rules={{
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              }}
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input {...field}></Input>
                    </FormControl>
                    <FormMessage></FormMessage>
                  </FormItem>
                );
              }}
            ></FormField>
            <FormField
              control={form.control}
              name="password"
              rules={{
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters long",
                },
              }}
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input {...field} type="password"></Input>
                    </FormControl>
                    <FormMessage></FormMessage>
                  </FormItem>
                );
              }}
            ></FormField>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              disabled={mutation.isPending}
              onClick={async () => {
                if (await form.trigger()) {
                  mutation.mutate({ body: form.getValues() });
                }
              }}
            >
              Login
            </Button>
            <Link to="/register">
              <Button variant={"ghost"}>Register</Button>
            </Link>
          </CardFooter>
        </Card>
      </Form>
    </div>
  );
};
