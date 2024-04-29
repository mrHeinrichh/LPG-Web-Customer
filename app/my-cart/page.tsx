"use client";
import { Button, CartDeleteButton, CheckoutButton, Navbar } from "@/components";
import { ICartItemModel } from "@/models";
import { useCartStore } from "@/states";
import { parseToFiat } from "@/utils";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function MyCart() {
  const router = useRouter();
  const {
    items,
    deleteItems,
    total,
    addToSelected,
    selected,
    removeFromSelected,
  } = useCartStore();

  return (
    <main>
      <Navbar />
      <div className="pr-56 pl-56 pt-24 pb-12">
        <div className="bg-white border border-gray-200 rounded-lg shadow-md p-4">
          {items.map((e: ICartItemModel) => (
            <div key={e._id} className="flex flex-col p-16">
              <div className="flex items-center">
                <div className="w-96 h-96 relative rounded-md overflow-hidden">
                  <Image
                    src={e.image}
                    width={250}
                    height={250}
                    alt={e.image}
                    style={{ borderRadius: "15px" }}
                  />
                </div>
                <div className="">
                  <h5>
                    {e.name} <span className="text-md">({e.category})</span>
                  </h5>
                  <br />
                  <p>{e.description}</p>
                  <p>Stocks available: {e.stock}</p>
                  <p>Price: {parseToFiat(e.customerPrice)} / Piece</p>
                  <br />
                  <p> Total: {parseToFiat(e.quantity * e.customerPrice)}</p>
                </div>
                <div className="ml-auto p-9">
                  <input
                    type="checkbox"
                    style={{ transform: "scale(1.5)" }}
                    onChange={(event: any) => {
                      const { checked } = event.target;

                      if (checked) {
                        addToSelected(e);
                      } else {
                        removeFromSelected(e._id ?? "");
                      }
                    }}
                  />
                </div>
              </div>
              {/* Horizontal line divider for each item */}
              <hr className="border-t my-4 w-full" />
            </div>
          ))}

          {/* Display total computed price */}
          <div className="flex justify-end mt-4 pr-16">
            <p>
              Total:
              {parseToFiat(total)}
            </p>
          </div>

          <div className="flex justify-around mt-8">
            <CartDeleteButton
              onClick={() => {
                console.log(
                  selected.map((item: ICartItemModel) => item._id ?? "")
                );

                deleteItems(
                  selected.map((item: ICartItemModel) => item._id ?? "")
                );
              }}
            >
              Delete Selected
            </CartDeleteButton>

            <CheckoutButton
              onClick={() => {
                router.push("/checkout");
              }}
            >
              Checkout
            </CheckoutButton>
          </div>
        </div>
      </div>
    </main>
  );
}
