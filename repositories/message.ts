import { get, post } from "@/config";
import { IHttpResponse } from "@/interfaces";

// TODO: add types to args
export async function getMessages(user: string) {
  return (
    await get(
      `messages?filter={"$or": [{"from": "${user}"}, {"to": "${user}"}]}`
    )
  ).data as IHttpResponse<any>;
}

// TODO: Add types
export async function createMessage(body: any) {
  return (await post(`messages`, body)).data as IHttpResponse<any>;
}

export default { getMessages, createMessage };
