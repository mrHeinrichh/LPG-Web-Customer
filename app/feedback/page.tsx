"use client";
import { Button, InputField, Navbar, StarRating } from "@/components";
import { get, patch, post } from "@/config";
import {
  useAuthStore,
  useCartStore,
  useCheckoutStore,
  useGeoApifyStore,
} from "@/states";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";

export default function Checkout() {
  const router = useRouter();
  const { autocomplete, locations } = useGeoApifyStore() as any;
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const { cart } = useCartStore() as any;
  const { user } = useAuthStore() as any;
  const { checkoutItems, addItem, removeItem } = useCheckoutStore() as any;

  const [formData, setFormData] = useState({
    q1: "",
    q2: "",
    q3: "",
    q4: "",
    q5: "",
  });
  const [q1rating, setq1rating] = useState<number>(0);
  const [q2rating, setq2rating] = useState<number>(0);
  const [q3rating, setq3rating] = useState<number>(0);
  const [q4rating, setq4rating] = useState<number>(0);
  const [q5rating, setq5rating] = useState<number>(0);

  const [search, setsearch] = useState<any>();
  const [location, setlocation] = useState<any>();
  const [discountIdImage, setdiscountIdImage] = useState<null | string>(null);
  const [assembly, setassembly] = useState<boolean>(false);
  const [transaction, settransaction] = useState<any>(null);

  useEffect(() => {
    getTransaction(id ?? "");
  }, [id]);
  const getTransaction = async (id: string) => {
    const { data } = await get(`transactions?filter={"_id": "${id}"}`);
    if (data.status == "success") {
      settransaction(data.data[0]);
    }
  };
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

  const createFeedback = async () => {
    console.log([
      {
        answer: formData.q1,
        question:
          "How satisfied are you with the speed and responsiveness of our mobile/web application when browsing and making purchases?",
        rate: q1rating,
      },
      {
        answer: formData.q2,
        question:
          "How satisfied are you with the approval and speed of your transaction in the system?",
        rate: q2rating,
      },
      {
        answer: formData.q3,
        question:
          "How satisfied are you with the communication skills and punctuality of the delivery rider in delivering your LPG order?",
        rate: q3rating,
      },
      {
        answer: formData.q4,
        question:
          "On a scale of 1 to 5, how would you describe your overall experience using our mobile/web application to purchase LPG products?",
        rate: q4rating,
      },
      {
        answer: formData.q5,
        question:
          "Overall, how likely are you to recommend our mobile/web application to others based on your experience using it for LPG purchases?",
        rate: q5rating,
      },
    ]);

    const { data } = await patch(`transactions/${id}/feedback`, {
      feedback: [
        {
          answer: formData.q1,
          question:
            "How satisfied are you with the speed and responsiveness of our mobile/web application when browsing and making purchases?",
          rate: q1rating,
        },
        {
          answer: formData.q2,
          question:
            "How satisfied are you with the approval and speed of your transaction in the system?",
          rate: q2rating,
        },
        {
          answer: formData.q3,
          question:
            "How satisfied are you with the communication skills and punctuality of the delivery rider in delivering your LPG order?",
          rate: q3rating,
        },
        {
          answer: formData.q4,
          question:
            "On a scale of 1 to 5, how would you describe your overall experience using our mobile/web application to purchase LPG products?",
          rate: q4rating,
        },
        {
          answer: formData.q5,
          question:
            "Overall, how likely are you to recommend our mobile/web application to others based on your experience using it for LPG purchases?",
          rate: q5rating,
        },
      ],
    });

    if (data.status == "success") router.push("/");
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      autocomplete(search);
      console.log(search);
    }, 1000);
    return () => clearTimeout(delayDebounceFn);
  }, [search,autocomplete]);

  const setq1Rate = (rate: number) => {
    setq1rating(rate);
  };
  const setq2Rate = (rate: number) => {
    setq2rating(rate);
  };
  const setq3Rate = (rate: number) => {
    setq3rating(rate);
  };
  const setq4Rate = (rate: number) => {
    setq4rating(rate);
  };
  const setq5Rate = (rate: number) => {
    setq5rating(rate);
  };

  return (
    <main>
      <Navbar />
      <div className="pt-24">
        <div className="w-full flex justify-center items-center">
          <div className="flex flex-col gap-2 w-1/2 bg-white rounded-lg shadow-xl p-12">
            {transaction?.items.map((e: any) => {
              return (
                <div key={e._id} className="flex items-center gap-5">
                  
                  <div className="">
                    <p className="font-bold text-2xl">
                      {e.name} <span className="text-md">{e.quantity}x</span>
                    </p>
                  </div>
                </div>
              );
            })}
            <p>Name: {transaction?.name}</p>
            <p>Contact Number: {transaction?.contactNumber}</p>
            <p>Location: {transaction?.deliveryLocation}</p>
            <p>House/Lot/Blk: {transaction?.houseLotBlk}</p>
            <p>Barangay: {transaction?.barangay}</p>
            <p>Payment Method: {transaction?.paymentMethod}</p>
            <p>Transaction Status: {transaction?.status}</p>
            <p>Date of Delivery: {transaction?.deliveryDate}</p>
            <p>Total: {transaction?.total}.00PHP</p>
          </div>
          <div className="flex flex-col gap-2 w-auto bg-white rounded-lg shadow-xl p-12">
          <h4 className="flex justify-center items-center m-5 font-bold">Order Statuses</h4>
            {transaction?.statuses.map((e: any) => {
              return (
                <div className="" key={e._id}>
                  
                  <p>{e.message}</p>
                  <p>{e.createdAt}</p>
                  <hr />
                </div>
              );
            })}
          </div>
        </div>

        <div className="pt-24">
        <hr className="border-t my-4 w-full" />
        </div>
  
        <div className="pr-32 pl-32 pt-16">
     
        <h4 className="flex justify-center items-center m-5 font-bold">Feedback</h4>
        <div className="flex flex-col gap-3 bg-white rounded-lg shadow-xl pr-24 pl-24 pt-10">
      
        {transaction && transaction.status === 'Completed' && (
          <>
            <p className="text-3xl font-bold">Help us improve!</p>
            <InputField
              name="q1"
              placeholder="How satisfied are you with the speed and responsiveness of our mobile/web application when browsing and making purchases?"
              onChange={handleChange}
            />
            <StarRating onClick={setq1Rate} rating={q1rating} />

            <InputField
              name="q2"
              placeholder="How satisfied are you with the approval and speed of your transaction in the system?"
              onChange={handleChange}
            />
            <StarRating onClick={setq2Rate} rating={q2rating} />

            <InputField
              name="q3"
              placeholder="How satisfied are you with the communication skills and punctuality of the delivery rider in delivering your LPG order?"
              onChange={handleChange}
            />
            <StarRating onClick={setq3Rate} rating={q3rating} />

            <InputField
              name="q4"
              placeholder="On a scale of 1 to 5, how would you describe your overall experience using our mobile/web application to purchase LPG products?"
              onChange={handleChange}
            />
            <StarRating onClick={setq4Rate} rating={q4rating} />

            <InputField
              name="q5"
              placeholder="Overall, how likely are you to recommend our mobile/web application to others based on your experience using it for LPG purchases?"
              onChange={handleChange}
            />
            <StarRating onClick={setq5Rate} rating={q5rating} />

                <div className="flex justify-center items-center p-10">
                <Button
              onClick={() => {
                createFeedback();
              }}
            >
              Submit Feedback
            </Button>
                </div>
            
            </>
            
          )}
              
        </div>
        </div>
        </div>
    </main>
  );
}
