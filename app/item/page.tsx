"use client";
import { Navbar } from "@/components";
import { useItemStore } from "@/states";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { getMutiplier } from "@/utils";
import { ForecastChart, ItemDetails, ReasonsTable } from "./components";

export default function Item() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const { getItemById, getPrices, timeFilter, units } = useItemStore();

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
      {/* <ReasonsTable /> */}
    </main>
  );
}
