"use client";
import { Navbar } from "@/components";
import { useItemStore } from "@/states";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { getMutiplier, getSearchFilterQuery } from "@/utils";
import { ForecastChart, ItemDetails, ReasonsTable } from "./components";
import { SEARCH_FILTERS } from "./components/ReasonsTable/data";

export default function Item() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const {
    getItemById,
    getPrices,
    timeFilter,
    units,
    getReasons,
    page,
    limit,
    search,
  } = useItemStore();

  useEffect(() => {
    if (search != "") {
      getReasons({
        page,
        limit,
        filter: `{ "$and": [{"reason": {"$ne": null}}, {"item": "${id}"},${getSearchFilterQuery(
          SEARCH_FILTERS,
          search
        )}]}`,
      });
    } else {
      getReasons({
        page,
        limit,
        filter: `{ "$and": [{"reason": {"$ne": null}}, {"item": "${id}"}]}`,
      });
    }
  }, [getReasons, page, limit, search, id]);

  useEffect(() => {
    const startDate = new Date();
    const endDate = new Date();
    startDate.setDate(startDate.getDate() - units * getMutiplier(timeFilter));
    getPrices({
      page: 1,
      limit: 10,
      filter: `{"$and": [{"createdAt": {"$gte": "${startDate.toISOString()}", "$lte": "${endDate.toISOString()}"}}, {"item": "${id}"}]}`,
    });
  }, [getPrices, id, timeFilter, units]);

  useEffect(() => {
    if (id != null) getItemById(id ?? "");
  }, [id, getItemById]);

  return (
    <main>
      <Navbar />
      <ItemDetails />
      <ForecastChart />
      <ReasonsTable />
    </main>
  );
}
