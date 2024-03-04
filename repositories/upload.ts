import { post } from "@/config";
import { IHttpResponse } from "@/interfaces";
// TODO: Add types
export async function image(body: FormData) {
  return (await post<FormData>("upload/image", body))
    .data as IHttpResponse<any>;
}

export default { image };
