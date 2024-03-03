"use client";
import { CartButton, InputField, Navbar, SelectField } from "@/components";
import { get } from "@/config";
import { API_URL } from "@/env";
import { useCartStore, useDashboardStore, useItemStore } from "@/states";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";
import { CiCircleMinus, CiCirclePlus } from "react-icons/ci";
import { getDates, getMutiplier, getStartDayDate } from "@/utils";
import { TimeFilter } from "@/interfaces";
import timeFilterOption from "./timeFilter";

import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ItemDetails, ReasonsTable } from "./components";

export default function Home() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [units, setunits] = useState(5);
  const [timeFilter, settimeFilter] = useState<TimeFilter>("Daily");

  const { getPricesByDate, prices } = useDashboardStore() as any;
  const { getItemById } = useItemStore();
  const data = useMemo(() => {
    let temp: any = [];

    const parsedStartDay = getDates(timeFilter, units).map((e: Date) =>
      getStartDayDate(e)
    );

    const multiplier = getMutiplier(timeFilter);
    let curentCustomerValue = 0;
    let curentRetailerValue = 0;
    parsedStartDay.forEach((element) => {
      const customerPrices = prices
        .filter((e: any) => {
          return (
            element.getTime() <=
              getStartDayDate(new Date(e.createdAt)).getTime() &&
            element.getTime() + 86399999 * multiplier >=
              getStartDayDate(new Date(e.createdAt)).getTime() &&
            e.type === "Customer"
          );
        })
        .map((e: any) => e.price);

      const retailerPrices = prices
        .filter((e: any) => {
          return (
            element.getTime() <=
              getStartDayDate(new Date(e.createdAt)).getTime() &&
            element.getTime() + 86399999 * multiplier >=
              getStartDayDate(new Date(e.createdAt)).getTime() &&
            e.type === "Retailer"
          );
        })
        .map((e: any) => e.price);

      curentCustomerValue =
        customerPrices.length == 0
          ? curentCustomerValue
          : Math.max(...customerPrices);

      curentRetailerValue =
        retailerPrices.length == 0
          ? curentRetailerValue
          : Math.max(...retailerPrices);

      temp.push({
        name: `${element.toDateString()}`,
        customer: curentCustomerValue,
        retailer: curentRetailerValue,
      });
    });

    return temp;
  }, [prices, timeFilter, units]);

  useEffect(() => {
    const startDate = new Date();
    const endDate = new Date();
    startDate.setDate(startDate.getDate() - units * getMutiplier(timeFilter));
    getPricesByDate(startDate.toISOString(), endDate.toISOString(), id);
  }, [timeFilter, units, id, getPricesByDate]);

  useEffect(() => {
    if (id != null) getItemById(id ?? "");
  }, [id, getItemById]);

  const increment = () => {
    // if (quantity < item.stock) {
    //   setquantity((prev: any) => prev + 1);
    // }
  };

  const decrement = () => {
    // if (quantity > 1) {
    //   setquantity((prev: any) => prev - 1);
    // }
  };

  return (
    <main>
      <Navbar />
      {/* TODO: Add null safety in ItemDetails */}
      <ItemDetails />
      <div className="flex items-center justify-center mt-16">
        <div className="border-t border-gray-300 w-1/4 mr-4"></div>
        <div className="inline-block px-4 bg-white text-xl font-bold">
          Price Forecasts
        </div>
        <div className="border-t border-gray-300 w-1/4 ml-4"></div>
      </div>
      <div className="pr-20 pl-20">
        <div className="bg-white border border-gray-200 rounded-lg shadow-md p-10 mt-8">
          <SelectField
            options={timeFilterOption}
            name={"Time Filter"}
            title={"Time Filter"}
            onChange={function (e: any): void {
              const { name, value } = e.target;
              settimeFilter(value);
            }}
          />
          <InputField
            type="number"
            placeholder="Units"
            value={units}
            onChange={function (e: any): void {
              const { name, value } = e.target;
              setunits(value);
            }}
          ></InputField>
          <div className="mt-8"></div>
          <LineChart
            width={1300}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="customer"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
            <Line
              type="monotone"
              dataKey="retailer"
              stroke="#82ca9d"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </div>
        <ReasonsTable />
      </div>
    </main>
  );
}
