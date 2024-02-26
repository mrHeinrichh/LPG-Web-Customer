"use client";
import { Button, CartDeleteButton, CheckoutButton, Navbar } from "@/components";
import { useCartStore } from "@/states";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

// ... (other imports)

export default function Home() {
  const router = useRouter();
  const { cart, deleteItems } = useCartStore() as any;


  const [itemsSelected, setItemsSelected] = useState<string[]>([]);

  // Initialize itemsSelected with all item IDs
  useEffect(() => {
    const allItemIds = cart.map((item: any) => item._id);
    setItemsSelected(allItemIds);
  }, [cart]);

  const toggleItem = (item: any, checked: boolean) => {
    if (checked) {
      setItemsSelected((prev: any) => [item._id, ...prev]);
    } else {
      setItemsSelected((prev: any) => prev.filter((id: any) => id !== item._id));
    }
  };

  // Calculate total price
  const totalComputedPrice = cart.reduce(
    (total: number, item: any) => total + item.customerPrice * item.quantity,
    0
  );

  return (
    <main>
      <Navbar />

      <div className="pr-56 pl-56 pt-24 pb-12">
        <div className="bg-white border border-gray-200 rounded-lg shadow-md p-4">
          {cart.map((e: any) => (
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
                <div className="ml-4">
                  <h5>{e.name}</h5>
                  <br />
                  <p>Quantity: {e.quantity}</p>
                  <br />
                  <p>₱{e.customerPrice}</p>
                </div>
                <div className="ml-auto">
                <input
                    type="checkbox"
                    style={{ transform: "scale(1.5)" }}
                    onChange={(event: any) => {
                      const { checked } = event.target;
                      toggleItem(e, checked);
                    }}
                    checked={itemsSelected.includes(e._id)}
                  />
                </div>
              </div>
              {/* Horizontal line divider for each item */}
              <hr className="border-t my-4 w-full" />
            </div>
          ))}

          {/* Display total computed price */}
          <div className="flex justify-end mt-4">
            <p>Total: ₱{totalComputedPrice.toFixed(2)}</p>
          </div>

          <div className="flex justify-between mt-8">
            <CartDeleteButton
              onClick={() => {
                deleteItems(itemsSelected);
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
