import router from "@/router";
import createFetchClient, { Middleware } from "openapi-fetch";
import createClient from "openapi-react-query";
import { toast } from "sonner";
import type { paths } from "../schema";

const authMiddleware: Middleware = {
  async onRequest({ request }) {
    const token = localStorage.getItem("token");
    if (token) {
      request.headers.set("Authorization", `Bearer ${token}`);
    }
    return request;
  },
};

const messageMiddleware: Middleware = {
  async onResponse({ response }) {
    if (response.status === 400 || response.status === 200) {
      const json = await response.clone().json();
      if (!json?.success) {
        toast.error(json?.message);
      }
    }
    if (response.status === 401) {
      toast.error("Unauthorized");
      localStorage.removeItem("token");
      router.navigate({ to: "/login", replace: true });
    }
    return response;
  },
};

const client = createFetchClient<paths>({ baseUrl: "http://127.0.0.1:3000" });

client.use(authMiddleware);
client.use(messageMiddleware);

const $api = createClient(client);

export default $api;
