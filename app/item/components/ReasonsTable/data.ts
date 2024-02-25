import { ISearchFilter } from "@/interfaces";

export const TABLE_HEADERS: string[] = [
  "Item Name",
  "Price",
  "Type",
  "Reason",
  "Date Created",
];

export const SEARCH_FILTERS: ISearchFilter[] = [
  { key: "price", type: "number" },
  { key: "type", type: "string" },
  { key: "reason", type: "string" },
];
