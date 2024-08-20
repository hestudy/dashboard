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
import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export const Route = createLazyFileRoute("/register/")({
  component: () => <Register />,
});

const Register = () => {
  const navigate = useNavigate();
  const form = useForm<
    NonNullable<
      paths["/api/auth/register"]["post"]["requestBody"]
    >["content"]["application/json"]
  >({
    defaultValues: {
      confirmPassword: "",
      email: "",
      password: "",
    },
  });

  const mutation = $api.useMutation("post", "/api/auth/register", {
    onSuccess(data) {
      if (data.success) {
        toast.success("Account created successfully");
        navigate({ to: "/login", replace: true });
      }
    },
  });

  return (
    <div className="h-full flex justify-center items-center">
      <Card className="px-20 py-10">
        <CardHeader>
          <CardTitle>Register</CardTitle>
          <CardDescription>Create an account to continue</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
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
            <FormField
              control={form.control}
              name="confirmPassword"
              rules={{
                required: "Confirm password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters long",
                },
                validate: (value) => {
                  if (value !== form.getValues("password")) {
                    return "Passwords do not match";
                  }
                },
              }}
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input {...field} type="password"></Input>
                    </FormControl>
                    <FormMessage></FormMessage>
                  </FormItem>
                );
              }}
            ></FormField>
          </Form>
        </CardContent>
        <CardFooter>
          <Button
            disabled={mutation.isPending}
            onClick={async () => {
              if (await form.trigger()) {
                mutation.mutate({
                  body: form.getValues(),
                });
              }
            }}
          >
            Register
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};
