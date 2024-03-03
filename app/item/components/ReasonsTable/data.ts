import { ISearchFilter } from "@/interfaces";

export const TABLE_HEADERS: string[] = [
  "Item",
  "Price",
  "Reason",
  "Date Created",
];

export const SEARCH_FILTERS: ISearchFilter[] = [
  { key: "price", type: "number" },
  { key: "reason", type: "string" },
];
