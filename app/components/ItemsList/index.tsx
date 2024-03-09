import { IItemModel } from "@/models";
import React, { useState } from "react";
import ItemCard from "../ItemCard";
import { useRouter } from "next/navigation";
import style from "./style.module.css";

export interface IItemsList {
  title: string;
  items: IItemModel[];
}

function ItemsList({ title, items }: IItemsList) {
  const router = useRouter();
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const visibleItems = items.slice(startIndex, endIndex);

  const hasNextPage = endIndex < items.length;
  const hasPreviousPage = currentPage > 1;

  const handleNextClick = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePreviousClick = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  return (
    <div className={style.container}>
      <p className="font-bold text-5xl mb-4">{title}</p>
      <div className="flex items-center gap-12 p-2">
        {visibleItems.map((e: any) => (
          <ItemCard
            key={e._id}
            item={e}
            onClick={() => {
              router.push(`/item?id=${e._id}`);
            }}
          />
        ))}
      </div>
      <div className="flex justify-between mt-4">
        {hasPreviousPage && (
          <button
            className="rounded-l"
            onClick={handlePreviousClick}
          >
            Previous
          </button>
        )}
        {hasNextPage && (
          <button
            className="ml-auto rounded-r"
            onClick={handleNextClick}
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
}

export default ItemsList;
