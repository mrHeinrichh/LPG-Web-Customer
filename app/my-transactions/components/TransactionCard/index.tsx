"use client";
import { ICartItemModel, IDeliveryModel } from "@/models";
import { parseToFiat } from "@/utils";
import { useQRCode } from "next-qrcode";
import React, { useState } from "react";
import { FaPlus, FaCheck, FaMinus, FaXmark } from "react-icons/fa6";
import Image from "next/image";
export interface ITransactionCardProps {
  delivery: IDeliveryModel<string, string>;
  orderNumber: number;
}

function TransactionCard({ delivery, orderNumber }: ITransactionCardProps) {
  const { Canvas } = useQRCode();

  const [open, setOpen] = useState<boolean>(false);

  return (
    <div className="flex flex-col gap-3 w-full p-5 shadow-xl rounded-lg">
      <div className="flex items-center justify-between w-full">
        <p className="text-2xl font-bold">{`Order #${orderNumber}`}</p>
        <p className="text-xl font-light">{delivery.status}</p>
      </div>
      <div className="flex gap-10">
        <div className="flex gap-3 items-center">
          <Canvas
            text={delivery._id ?? ""}
            options={{
              errorCorrectionLevel: "M",
              width: 200,
            }}
          />
          <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-3">
              <p className="text-2xl">
                Receiver: {delivery.name} +63 ({delivery.contactNumber})
              </p>
              <p className="max-w-md">
                {delivery.deliveryLocation} {delivery.barangay}{" "}
                {delivery.houseLotBlk}
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <p className="">Assemble</p>
                  {delivery.assembly ? (
                    <FaCheck color="#32CD32" size={15} />
                  ) : (
                    <FaXmark color="#C41E3A" size={15} />
                  )}
                </div>
                <p className="">{delivery.paymentMethod}</p>
              </div>

              <div className="flex justify-between items-center">
                <p className="">
                  Delivery Date: {delivery.updatedAt.toString()}
                </p>

                <p className="">Total Price: {parseToFiat(delivery.total)}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          {delivery.statuses.map((e: any) => (
            <p>
              {e.message}{" "}
              <span className="font-light text-gray-500">({e.createdAt})</span>
            </p>
          ))}
        </div>
      </div>

      {open && (
        <div className="flex flex-col gap-2">
          {delivery.items.map((item: ICartItemModel) => {
            return (
              <div className="flex justify-between items-center gap-3">
                <div className="flex gap-4 items-center">
                  <Image
                    src={item.image ?? ""}
                    width={90}
                    height={90}
                    alt={item.image ?? ""}
                  ></Image>
                  <div className="Flex flex-col gap-2">
                    <p className="text-2xl">
                      {item.name} ({item.quantity}x)
                    </p>
                    <p className="text-2xl">
                      {parseToFiat(item.customerPrice)} / Piece
                    </p>
                  </div>
                </div>

                <p className="text-2xl">
                  {parseToFiat(item.customerPrice * item.quantity)}
                </p>
              </div>
            );
          })}{" "}
          <div className="flex justify-between items-center">
            <div className=""></div>
            <div className="flex items-center gap-5">
              <p className="text-2xl">Total:</p>
              <p className="text-2xl">{parseToFiat(delivery.total)}</p>
            </div>
          </div>
        </div>
      )}

      <div className="flex items-center justify-center">
        {open ? (
          <FaMinus
            size={20}
            onClick={() => {
              setOpen(false);
            }}
          />
        ) : (
          <FaPlus
            size={20}
            onClick={() => {
              setOpen(true);
            }}
          />
        )}
      </div>
    </div>
  );
}

export default TransactionCard;
