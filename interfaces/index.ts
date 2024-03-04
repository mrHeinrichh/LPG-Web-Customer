export interface FieldOption {
  value: string | number;
  title: string;
}

export interface ISelectField {
  options: FieldOption[];
  name: string;
  title: string;
  defaultValue?: string;
  onChange: (e: any) => void;
}
export type TimeFilter = "Daily" | "Weekly" | "Monthly" | "Yearly";
export interface ISearchFilter {
  key: string;
  type: "string" | "number";
}

export type ResponseStatus = "success" | "failed";

export interface IHttpResponseMeta {
  refresh?: string;
  access?: string;
  page?: Number;
  max?: Number;
  limit?: Number;
}
export interface IQuery {
  page?: number;
  limit?: number;
  filter?: string;
  populate?: string;
}
export interface IHttpResponse<T> {
  data: T[];
  status: ResponseStatus;
  message: string;
  meta?: IHttpResponseMeta;
}
