"use client";
import { IItemModel } from "@/models";
import React from "react";
import ItemCard from "../ItemCard";
import { useRouter } from "next/navigation";
import style from "./style.module.css";

export interface IItemsList {
  title: string;
  items: IItemModel[];
}

function ItemsList({ title, items }: IItemsList) {
  const router = useRouter();

  return (
    <div className={style.container}>
      <div className="card">
        <p className="font-bold text-5xl mb-4">{title}</p>
        <div className="flex items-center gap-24 p-16">
          {items.map((e: any) => (
            <ItemCard
              key={e._id}
              item={e}
              onClick={() => {
                router.push(`/item?id=${e._id}`);
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ItemsList;
