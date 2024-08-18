import createFetchClient, { Middleware } from "openapi-fetch";
import createClient from "openapi-react-query";
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

const client = createFetchClient<paths>({ baseUrl: "http://127.0.0.1:3000" });

client.use(authMiddleware);

const $api = createClient(client);

export default $api;
