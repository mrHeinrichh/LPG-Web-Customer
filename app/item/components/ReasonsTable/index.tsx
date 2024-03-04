import { SelectField, InputField, Datatable, TableRow } from "@/components";
import React, { useEffect, useState } from "react";
import { SEARCH_FILTERS, TABLE_HEADERS } from "./data";
import { useItemStore } from "@/states";
import { getSearchFilterQuery, parseToFiat } from "@/utils";
import { useSearchParams } from "next/navigation";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { IItemModel, IPriceModel } from "@/models";

function ReasonsTable() {
  const searchParams = useSearchParams();
  const {
    setLimit,
    incrementPage,
    decrementPage,
    getReasons,
    reasons,
    page,
    limit,
    search,
    setSearch,
  } = useItemStore();
  const id = searchParams.get("id");

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
  }, [page, limit, search, id, getReasons]);

  return (
    <div className="px-20">
      <div className="flex justify-between items-center w-full mt-5 mb-2 bg-white-100 rounded-md px-4 py-2">
        <div className="">
          <InputField
            name="search"
            onChange={(event: any) => {
              const { value } = event.target;
              setSearch(value);
            }}
          />
        </div>
      </div>

      <Datatable header={TABLE_HEADERS}>
        {reasons.map((e: IPriceModel<IItemModel>) => (
          <TableRow key={e._id}>
            <td>{e.item.name}</td>
            <td>{parseToFiat(e.price)}</td>
            <td>{e.reason}</td>
            <td>{e.createdAt.toString()}</td>
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
              setLimit(Number(e.target.value));
            }}
          />
        </div>
        <div className="flex items-center gap-4 ">
          <FaChevronLeft
            onClick={() => {
              decrementPage();
            }}
          />
          {page}
          <FaChevronRight
            onClick={() => {
              incrementPage();
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default ReasonsTable;
