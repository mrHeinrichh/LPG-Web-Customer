"use client";
import { CartButton, InputField, Navbar, SelectField } from "@/components";
import { get } from "@/config";
import { API_URL } from "@/env";
import { useCartStore, useDashboardStore } from "@/states";
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

export default function Home() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { addToCart } = useCartStore() as any;
  const id = searchParams.get("id");
  const [units, setunits] = useState(5);
  const [timeFilter, settimeFilter] = useState<TimeFilter>("Daily");
  const [item, setitem] = useState<any>({
    name: "",
    category: "",
    description: "",
    weight: 0,
    stock: 0,
    customerPrice: 0,
    retailerPrice: 0,
    image: "",
    type: "",
  });
  const [quantity, setquantity] = useState<number>(1);
  const { getPricesByDate, prices } = useDashboardStore() as any;

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
    const start = async () => {
      try {
        const { data } = await get(`items/${id}`);

        if (data.status === "success") {
          setitem({
            name: data.data[0].name ?? "",
            category: data.data[0].category ?? "",
            description: data.data[0].description ?? "",
            weight: data.data[0].weight ?? 0,
            stock: data.data[0].stock ?? 0,
            customerPrice: data.data[0].customerPrice ?? 0,
            retailerPrice: data.data[0].retailerPrice ?? 0,
            image: data.data[0].image ?? "",
            type: data.data[0].type ?? "",
          });
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    start();
  }, [timeFilter, units, id, getPricesByDate]);

  const increment = () => {
    if (quantity < item.stock) {
      setquantity((prev: any) => prev + 1);
    }
  };

  const decrement = () => {
    if (quantity > 1) {
      setquantity((prev: any) => prev - 1);
    }
  };

  return (
    <main>
      <Navbar />
      <div className="pr-56 pl-56 pt-24 pb-12">
        <div className="bg-white border border-gray-200 rounded-lg shadow-md p-4">
          <div className="flex gap-5 h-96 m-6">
            <div className="w-96 h-96 relative rounded-md overflow-hidden">
              <Image src={item.image} fill alt={item.image} />
            </div>

            <div className="flex flex-col justify-evenly w-2/3 pl-24">
              <p className="text-2xl font-bold">{item.name}</p>
              <p className="text-3xl">₱{item.customerPrice}.00</p>
              <p className="">{item.description}</p>
              <div className="flex justify-between items-center">
                <p>Stock Available: {item.stock ?? 0}</p>

                <div className="flex items-center gap-3 pr-3">
                  <CiCircleMinus onClick={decrement} size={30} />
                  <p className="text-xl">{quantity}</p>
                  <CiCirclePlus onClick={increment} size={30} />
                </div>
              </div>

              <div className="pl-60">
                <CartButton
                  onClick={() => {
                    addToCart({ _id: id, ...item, quantity });
                    router.push("/my-cart");
                  }}
                >
                  Add to Cart
                </CartButton>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center mt-16">
          <div className="border-t border-gray-300 w-1/4 mr-4"></div>
          <div className="inline-block px-4 bg-white text-xl font-bold">
            Price Forecasts
          </div>
          <div className="border-t border-gray-300 w-1/4 ml-4"></div>
        </div>
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
      </div>
    </main>
  );
}
