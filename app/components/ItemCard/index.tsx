import { IItemModel } from "@/models";
import React from "react";
import Image from "next/image";
import style from "./style.module.css";

export interface IItemCard {
  item: IItemModel;
  onClick: () => void;
}

function ItemCard({ item, onClick }: IItemCard) {
  return (
    <div className={style.container} onClick={onClick}>
      <div className="relative w-full min-h-40 h-64">
        <Image src={item.image} fill alt={item.image}></Image>
      </div>

      <p className="text-3xl font-bold">{item.name}</p>
      <p className="text-2xl">₱{item.customerPrice.toString()}</p>
    </div>
  );
}

export default ItemCard;
