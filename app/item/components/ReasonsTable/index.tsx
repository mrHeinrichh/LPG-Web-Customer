import { SelectField, InputField, Datatable, TableRow } from "@/components";
import React, { useEffect, useState } from "react";
import { SEARCH_FILTERS, TABLE_HEADERS } from "./data";
import { usePriceStore } from "@/states";
import { getSearchFilterQuery } from "@/utils";
import { useSearchParams } from "next/navigation";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

function ReasonsTable() {
  const searchParams = useSearchParams();
  const { getReasons, reasons } = usePriceStore() as any;
  const id = searchParams.get("id");
  const [search, setsearch] = useState("");
  const [page, setpage] = useState(1);
  const [limit, setlimit] = useState(20);

  useEffect(() => {
    if (search != "") {
      getReasons(
        page,
        limit,
        `{ "$and": [{"reason": {"$ne": null}}, {"item": "${id}"},${getSearchFilterQuery(
          SEARCH_FILTERS,
          search
        )}]}`
      );
    } else {
      getReasons(
        page,
        limit,
        `{ "$and": [{"reason": {"$ne": null}}, {"item": "${id}"}]}`
      );
    }
  }, [page, limit, search, id]);

  return (
    <>
      <div className="flex justify-between items-center w-full mt-5 mb-2 bg-white-100 rounded-md px-4 py-2">
        <div className="">
          <InputField
            name="search"
            onChange={(event: any) => {
              const { value } = event.target;
              setsearch(value);
            }}
          />
        </div>
      </div>

      <Datatable header={TABLE_HEADERS}>
        {reasons.map((e: any) => (
          <TableRow key={e._id}>
            <td>{e.item.name}</td>
            <td>{e.price}</td>
            <td>{e.type}</td>
            <td>{e.reason}</td>
            <td>{e.createdAt}</td>
          </TableRow>
        ))}
      </Datatable>
      <div className="w-full flex justify-between py-2">
        <div className="flex items-center gap-4 ">
          <SelectField
            options={[
              { title: "20", value: 20 },
              { title: "10", value: 10 },
              { title: "5", value: 5 },
              { title: "1", value: 1 },
            ]}
            name={""}
            title={""}
            onChange={(e: any) => {
              setlimit(e.target.value);
            }}
          />
        </div>
        <div className="flex items-center gap-4 ">
          <FaChevronLeft
            onClick={() => {
              setpage((prev: number) => prev - 1);
            }}
          />
          {page}
          <FaChevronRight
            onClick={() => {
              setpage((prev: number) => prev + 1);
            }}
          />
        </div>
      </div>
    </>
  );
}

export default ReasonsTable;
