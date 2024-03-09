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
      <div className="relative h-64 w-64">
        <Image src={item.image} fill alt={item.image}className="rounded-t-lg"></Image>
      </div>

      <p className="text-1xl pl-4 pt-4 font-bold">{item.name}</p>
      <p className="xl pl-4 pb-4">₱{item.customerPrice.toString()}</p>
    </div>
  );
}

export default ItemCard;
