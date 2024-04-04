"use client";
import { ICartItemModel, IDeliveryModel } from "@/models";
import { parseToFiat } from "@/utils";
import { useQRCode } from "next-qrcode";
import React, { useState } from "react";
import { FaPlus, FaCheck, FaMinus, FaXmark } from "react-icons/fa6";
import Image from "next/image";
import { useRouter } from "next/navigation";
export interface ITransactionCardProps {
  delivery: IDeliveryModel<string, string>;
  orderNumber: number;
  hasFeedback?: boolean;
}

function TransactionCard({ delivery, orderNumber, hasFeedback }: ITransactionCardProps) {
  const { Canvas } = useQRCode();
  const router = useRouter();
  const [open, setOpen] = useState<boolean>(false);
  const validStatuses = ["Pending", "Approved", "On Going", "Cancelled", "Completed", "Declined"];
const showTransaction = validStatuses.includes(delivery.status);
  const discountPercentage = 20; 
  const total = delivery.total;
  const discountAmount = (total * discountPercentage) / 100;
  const discountedAmount = total - discountAmount;
  const deductedAmount = total - discountedAmount;

  const handleCancelOrder = async () => {
    try {
      const response = await fetch(`https://lpg-api-06n8.onrender.com/api/v1/transactions/${delivery._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: "Archived",
          __t: "Delivery",
          deleted: true,
        }),
      });

      if (response.ok) {
        // Optionally handle success
        console.log("Order canceled successfully!");
      } else {
        // Handle error
        console.error("Failed to cancel order");
      }
    } catch (error) {
      // Handle network error
      console.error("Network error:", error);
    }
  };

  if (!showTransaction) {
    return null;
  }
  return (
    <div className="flex flex-col gap-3 w-full p-5 shadow-xl rounded-lg">
      <div className="flex items-center justify-between w-full">
        <p className="text-2xl font-bold">{`Order #${orderNumber}`}</p>
        <div className="flex items-center gap-5">
          <p className="text-xl font-light">{delivery.status}</p>\
          {delivery.status === "Pending" ? (
            <button
              className={`text-xl font-light underline-text`}
              onClick={() => {
                // Add your logic for handling the click event when the status is "Pending"
                if (delivery.status === "Pending") {
                  handleCancelOrder();
                }
              }}
            >
              Cancel Order
            </button>
          ) : (
            ""
          )}
        
        {delivery.status === "Completed" && !hasFeedback && (
  <button
    className={`text-xl font-light underline-text`}
    onClick={() => {
      if (delivery.status === "Completed" && !hasFeedback) {
        router.push(`/feedback?id=${delivery._id}`);
      }
    }}
  >
    Add Feedback
  </button>
)}

        </div>
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
                  <p className="">Installed</p>
                  {delivery.installed ? (
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

              </div>
              <div className="flex items-center justify-between">
        <p>Discounted Amount ({discountPercentage}%): </p>
        <p className="">{parseToFiat(discountedAmount)}</p>
      </div>
      <div className="flex items-center justify-between">
        <p>Deducted from Total: </p>
                <p className="">{parseToFiat(deductedAmount)}</p>
                
              </div>
              <div className="flex items-center justify-between">
                <p className="">Total Price:</p>
                <p className="">{parseToFiat(delivery.total)}</p>

                </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          {delivery.statuses.map((e: any) => (
            <p key={e.createdAt}>
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
              <div
                className="flex justify-between items-center gap-3"
                key={item._id}
              >
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
