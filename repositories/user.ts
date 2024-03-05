import { post } from "@/config";
import { IHttpResponse } from "@/interfaces";

// TODO: add types to args
export async function authenticate(body: any) {
  return (await post("users/authenticate", body)).data as IHttpResponse<any>;
}

export default { authenticate };
