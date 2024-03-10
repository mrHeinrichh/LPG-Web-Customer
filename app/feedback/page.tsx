"use client";
import { Button, InputField, Navbar, StarRating } from "@/components";
import { get, patch } from "@/config";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Feedback() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

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

  const [transaction, settransaction] = useState<any>(null);
  const [validationErrors, setValidationErrors] = useState({
    q1: false,
    q2: false,
    q3: false,
    q4: false,
    q5: false,
  });

  useEffect(() => {
    getTransaction(id ?? "");
  }, [id]);

  const getTransaction = async (id: string) => {
    const { data } = await get(`transactions?filter={"_id": "${id}"}`);
    if (data.status == "success") {
      settransaction(data.data[0]);
    }
  };

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    setValidationErrors((prevErrors) => ({ ...prevErrors, [name]: false }));
  };

  const createFeedback = async () => {
    const requiredFields = ["q1", "q2", "q3", "q4", "q5"];
    let hasErrors = false;

    requiredFields.forEach((field) => {
      if (formData[field as keyof typeof formData].trim() === "") {
        setValidationErrors((prevErrors) => ({ ...prevErrors, [field]: true }));
        hasErrors = true;
      }
    });

    if (hasErrors) {
      // Display an error message or take other actions
      return;
    }

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
      <div className="flex flex-col gap-3 bg-white rounded-lg shadow-xl pr-24 pl-24 pt-10">
        {transaction && transaction.status === "Completed" && (
          <>
            <p className="text-3xl font-bold">Help us improve!</p>
            <InputField
              name="q1"
              placeholder="How satisfied are you with the speed and responsiveness of our mobile/web application when browsing and making purchases?"
              onChange={handleChange}
              error={validationErrors.q1 && "Field must be filled"}
            />
            <StarRating onClick={setq1Rate} rating={q1rating} />

            <InputField
              name="q2"
              placeholder="How satisfied are you with the approval and speed of your transaction in the system?"
              onChange={handleChange}
              error={validationErrors.q2 && "Field must be filled"}
            />
            <StarRating onClick={setq2Rate} rating={q2rating} />

            <InputField
              name="q3"
              placeholder="How satisfied are you with the communication skills and punctuality of the delivery rider in delivering your LPG order?"
              onChange={handleChange}
              error={validationErrors.q3 && "Field must be filled"}
            />
            <StarRating onClick={setq3Rate} rating={q3rating} />

            <InputField
              name="q4"
              placeholder="On a scale of 1 to 5, how would you describe your overall experience using our mobile/web application to purchase LPG products?"
              onChange={handleChange}
              error={validationErrors.q4 && "Field must be filled"}
            />
            <StarRating onClick={setq4Rate} rating={q4rating} />

            <InputField
              name="q5"
              placeholder="Overall, how likely are you to recommend our mobile/web application to others based on your experience using it for LPG purchases?"
              onChange={handleChange}
              error={validationErrors.q5 && "Field must be filled"}
            />
            <StarRating onClick={setq5Rate} rating={q5rating} />

            <div className="flex justify-center items-center p-10">
              <Button onClick={createFeedback}>Submit Feedback</Button>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
