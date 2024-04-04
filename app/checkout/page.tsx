"use client";
import { Button, InputField, Navbar } from "@/components";
import { ICartItemModel } from "@/models";
import { useAuthStore, useCartStore, useCheckoutStore } from "@/states";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import OrderConfirmationModal from "../../components/CheckoutModal/index";

export default function Checkout() {
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);

  const handleConfirmationModalOpen = () => {
    setIsConfirmationModalOpen(true);
  };

  const handleConfirmationModalClose = () => {
    setIsConfirmationModalOpen(false);
  };

  const handleConfirmationModalConfirm = () => {
    // Implement logic to handle the confirmation (e.g., call your API)
    // You can call the handleSubmit function here if needed
    handleSubmit();
    // Close the modal
    handleConfirmationModalClose();
  };

  const router = useRouter();
  const {
    autocomplete,
    locations,
    search,
    setSearch,
    setLocation,
    location,
    focused,
    setFocused,
    discountIdImage,
    uploadImage,
    createTransaction,
    success,
    reset,
  } = useCheckoutStore();

  const { selected, deleteItems } = useCartStore();
  const { user } = useAuthStore() as any;
  const [formData, setFormData] = useState({
    contactNumber: "",
    name: "",
    houseLotBlk: "",
    barangay: "",
    paymentMethod: "",
    deliveryDate: "",

  });

  const [installed, setinstalled] = useState<boolean>(false);
  const [showDiscountImage, setShowDiscountImage] = useState(false); // Add this line

  const fileChange = async (event: any) => {
    const form = new FormData();
    form.append("image", event.target.files[0]);
    uploadImage(form);
  };

  const handleChange = (event: any) => {
    const { name, value, checked, type } = event.target;
  
    if (type === "checkbox") {
      setinstalled(checked);
    } else {
      setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    }
  };
  

  useEffect(() => {
    if (success) {
      reset();
      deleteItems(selected.map((item) => item._id ?? ""));
      router.push("/");
    }
  }, [success, selected, deleteItems, reset, router]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      autocomplete(search);
    }, 500);
    return () => clearTimeout(delayDebounceFn);
  }, [search, autocomplete]);

  const handleSubmit = () => {
    createTransaction({
      ...formData,
      installed,
      deliveryLocation: location.properties.formatted,
      long: location.properties.lon,
      lat: location.properties.lat,
      to: user._id ?? "",
      items: selected,
      statuses: [
        {
          createdAt: new Date(),
          message: `${user.name} created order`,
        },
      ],
      discountIdImage: discountIdImage ? discountIdImage : null,
      __t: "Delivery",
      priceType: "Customer",
    });
  };

  return (
    <main className="">
      <Navbar />
      <div className="container mx-auto pl-44 pr-44 pt-16">
        <div className="bg-white rounded-lg shadow-xl p-24">
          <h4 className="flex justify-center items-center m-8 font-bold">
            Set Delivery
          </h4>

          <div className="relative mb-8 flex gap-2 justify-center items-center pr-32 pl-32">
            <input
              type="text"
              value={search}
              onChange={(e: any) => {
                setSearch(e.target.value);
              }}
              onFocus={() => {
                setFocused(true);
              }}
              className="w-full py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
         {focused && locations.length > 0 && (
  <div className="absolute top-full left-0 border border-gray-300 w-full mt-1 rounded-md shadow-md" style={{ backgroundColor: 'white' }}>
    {locations.map((result: any) => (
      <p
        key={result.properties.formatted}
        onClick={() => {
          setSearch(result.properties.formatted);
          setLocation(result);
          setFocused(false);
        }}
        className="cursor-pointer py-2 px-4 bg-white hover:bg-gray-100"
      >
        {result.properties.formatted}
      </p>
    ))}
  </div>
)}

          </div>
          <div className="flex gap-2 justify-center items-center">
            <InputField
              name="name"
              placeholder="Full Name"
              onChange={handleChange}
              value={formData.name}
            />
            <InputField
              name="contactNumber"
              placeholder="Mobile Number"
              onChange={handleChange}
              value={formData.contactNumber}
              
            />
          </div>

          <div className="flex gap-2 justify-center items-center">
            <InputField
              name="houseLotBlk"
              placeholder="House | Lot | Blk."
              onChange={handleChange}
              value={formData.houseLotBlk}
            />
            <InputField
              name="barangay"
              placeholder="Barangay"
              onChange={handleChange}
              value={formData.barangay}
            />
            
          </div>
        
          <div className="flex gap-2 justify-center items-center p-4">
          <InputField
  type="datetime-local"
  name="deliveryDate"
  placeholder="Delivery Date and Time"
  onChange={handleChange}
  value={formData.deliveryDate}
/>
          </div>
          <div className="flex flex-col gap-3 justify-center items-center mx-auto p-10">
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
          <div className="flex flex-col gap-3 justify-center items-center mx-auto pb-10">
            <p className="text-xl font-bold">Needs to be installed?</p>
            <div className="flex items-center gap-3">
              <InputField
                type="checkbox"
                name="installed"
                placeholder="Yes"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="flex flex-col gap-3 justify-center items-center mx-auto p-10">
            <p
              className="text-xl font-bold cursor-pointer"
              onClick={() => setShowDiscountImage(!showDiscountImage)}
            >
              Avail Discount as PWD/Senior Citizen?
            </p>
            {showDiscountImage && (
              <div>
                {discountIdImage ? (
                  <Image
                    src={discountIdImage ?? ""}
                    width={150}
                    height={150}
                    alt={discountIdImage ?? ""}
                  ></Image>
                ) : null}
                <div className="col-span-2">
                  <InputField
                    type="file"
                    placeholder="Choose Image"
                    onChange={fileChange}
                  />
                </div>
              </div>
            )}
          </div>
       <OrderConfirmationModal
  isOpen={isConfirmationModalOpen}
  onClose={handleConfirmationModalClose}
  onConfirm={handleConfirmationModalConfirm}
  formData={formData}
  selectedItems={selected}
/>

          <div className="flex flex-col gap-3 justify-center items-center mx-auto p-10">
          <Button onClick={handleConfirmationModalOpen}>Review Order</Button>
          </div>
        </div>
      </div>
    </main>
  );
}
