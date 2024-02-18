"use client";
import { Button, InputField, Navbar } from "@/components";
import { post } from "@/config";
import {
  useAuthStore,
  useCartStore,
  useCheckoutStore,
  useGeoApifyStore,
} from "@/states";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Checkout() {
  const router = useRouter();
  const { autocomplete, locations } = useGeoApifyStore() as any;
  const searchParams = useSearchParams();
  const { cart } = useCartStore() as any;
  const { user } = useAuthStore() as any;
  const { checkoutItems, addItem, removeItem } = useCheckoutStore() as any;
  const [formData, setFormData] = useState({
    contactNumber: "",
    name: "",
    houseLotBlk: "",
    barangay: "",
    paymentMethod: "",
  });
  const [search, setsearch] = useState<any>();
  const [location, setlocation] = useState<any>();
  const [discountIdImage, setdiscountIdImage] = useState<null | string>(null);
  const [assembly, setassembly] = useState<boolean>(false);

  useEffect(() => {
    console.log(checkoutItems);
  }, [checkoutItems]);

  const fileChange = async (event: any) => {
    const form = new FormData();
    form.append("image", event.target.files[0]);
    const { data } = await post<FormData>("upload/image", form);
    if (data.status == "success") {
      setdiscountIdImage(data.data[0]?.path ?? "");
    }
  };

  const handleChange = (event: any) => {
    const { name, value, checked } = event.target;
    if (name == "assembly") {
      setassembly(checked);
      return;
    }
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const createTransaction = async () => {
    let request: any = {
      ...formData,
      assembly,
      deliveryLocation: location.properties.formatted,
      long: location.properties.lon,
      lat: location.properties.lat,
      to: user._id ?? "",
      items: cart,
      type: "Delivery",
    };

    if (discountIdImage) {
      request = {
        ...formData,
        assembly,
        deliveryLocation: location.properties.formatted,
        long: location.properties.lon,
        lat: location.properties.lat,
        to: user._id ?? "",
        items: cart,
        type: "Delivery",
        discountIdImage,
      };
    }
    const { data } = await post("transactions", {
      ...formData,
      assembly,
      deliveryLocation: location.properties.formatted,
      long: location.properties.lon,
      lat: location.properties.lat,
      to: user._id ?? "",
      items: cart,
      statuses: [
        {
          createdAt: new Date(),
          message: `${user.name} created order`,
        },
      ],
      type: "Delivery",
    });

    if (data.status == "success") router.push("/");
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      autocomplete(search);
      console.log(search);
    }, 1000);
    return () => clearTimeout(delayDebounceFn);
  }, [search]);

  return (
    <main>
      <Navbar />
      <div className="">
        <input
          type="text"
          value={search}
          onChange={(e: any) => {
            setsearch(e.target.value);
          }}
        />
      </div>
      {locations.map((e: any) => {
        return (
          <p
            key={e.properties.formatted}
            onClick={() => {
              setsearch(e.properties.formatted);
              setlocation(e);
            }}
          >
            {e.properties.formatted}
          </p>
        );
      })}
      <InputField
        name="contactNumber"
        placeholder="Contact Number"
        onChange={handleChange}
      />{" "}
      <InputField name="name" placeholder="Full Name" onChange={handleChange} />{" "}
      <InputField
        name="houseLotBlk"
        placeholder="House | Lot | Blk."
        onChange={handleChange}
      />{" "}
      <InputField
        name="barangay"
        placeholder="Baranggay"
        onChange={handleChange}
      />
      <div className="flex flex-col gap-3">
        <p className="text-xl font-bold">Choose Payment Method</p>
        <div className="flex items-center gap-3">
          <InputField
            type="radio"
            name="paymentMethod"
            value="COD"
            placeholder="Cash on Delivery"
            onChange={handleChange}
          />
          <InputField
            type="radio"
            name="paymentMethod"
            value="GCASH"
            placeholder="GCASH"
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <p className="text-xl font-bold">Needs to be assembled?</p>
        <div className="flex items-center gap-3">
          <InputField
            type="checkbox"
            name="assembly"
            placeholder="Yes"
            onChange={handleChange}
          />
        </div>
      </div>
      {checkoutItems.map((e: any) => {
        return (
          <div key={e._id}>
            <p>Name: {e.name}</p>
            <p>Quantity: {e.quantity}</p>
            <Image src={e.image} width={250} height={250} alt={e.image}></Image>
          </div>
        );
      })}
      {discountIdImage ? (
        <Image
          src={discountIdImage ?? ""}
          width={150}
          height={150}
          alt={discountIdImage ?? ""}
        ></Image>
      ) : (
        <></>
      )}
      <div className="col-span-2">
        <InputField
          type="file"
          placeholder="Choose Image"
          onChange={fileChange}
        />
      </div>
      <Button
        onClick={() => {
          createTransaction();
        }}
      >
        Order Now
      </Button>
    </main>
  );
}
