import { InputField, SelectField } from "@/components";
import { useItemStore } from "@/states";
import { useMemo } from "react";
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
import { IPriceModel } from "@/models";

function ForecastChart() {
  const { setTimeFilter, units, setUnits, prices, timeFilter } = useItemStore();

  const data = useMemo(() => {
    return getChartData(timeFilter, units, prices);
  }, [prices, timeFilter, units]);

  return (
    <>
      <div className="flex items-center justify-center mt-16">
        <div className="border-t border-gray-300 w-1/4 mr-4"></div>
        <div className="inline-block px-4 bg-white text-xl font-bold">
          Price Forecasts
        </div>
        <div className="border-t border-gray-300 w-1/4 ml-4"></div>
      </div>
      <div className="p-20">
        <div className="p-10 flex flex-col gap-5 shadow-lg">
          <SelectField
            options={timeFilterOption}
            name={"Time Filter"}
            title={"Time Filter"}
            onChange={function (e: any): void {
              const { value } = e.target;
              setTimeFilter(value as TimeFilter);
            }}
          />
          <InputField
            type="number"
            placeholder="Units"
            value={units}
            onChange={function (e: any): void {
              const { value } = e.target;
              setUnits(Number(value));
            }}
          />
          <div className="p-5 flex justify-center items-center">
            <LineChart
              width={1300}
              height={400}
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
            </LineChart>
          </div>
        </div>
      </div>
    </>
  );
}

const getChartData = (
  timeFilter: TimeFilter,
  units: number,
  prices: IPriceModel<string>[]
) => {
  let temp: any = [];

  const parsedStartDay = getDates(timeFilter, units).map((e: Date) =>
    getStartDayDate(e)
  );

  const multiplier = getMutiplier(timeFilter);
  let curentCustomerValue = 0;

  parsedStartDay.forEach((element) => {
    const customerPrices = prices
      .filter((e: IPriceModel<string>) => {
        return (
          element.getTime() <=
            getStartDayDate(new Date(e.createdAt)).getTime() &&
          element.getTime() + 86399999 * multiplier >=
            getStartDayDate(new Date(e.createdAt)).getTime() &&
          e.type === "Customer"
        );
      })
      .map((e: any) => e.price);

    curentCustomerValue =
      customerPrices.length == 0
        ? curentCustomerValue
        : Math.max(...customerPrices);

    temp.push({
      name: `${element.toDateString()}`,
      customer: curentCustomerValue,
    });
  });

  return temp;
};
export default ForecastChart;
