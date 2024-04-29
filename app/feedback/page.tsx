"use client";
import { Button, Navbar } from "@/components";
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

  const [transaction, setTransaction] = useState<any>(null);
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
    if (data.status === "success") {
      setTransaction(data.data[0]);
    }
  };

  const handleChange = (name: string, value: string) => {
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
      return;
    }

    const { data } = await patch(`transactions/${id}/feedback`, {
      feedback: [
        { question: "Question 1", answer: formData.q1 },
        { question: "Question 2", answer: formData.q2 },
        { question: "Question 3", answer: formData.q3 },
        { question: "Question 4", answer: formData.q4 },
        { question: "Question 5", answer: formData.q5 },
      ],
    });

    if (data.status === "success") router.push("/");
  };

  return (
    <main>
      <Navbar />
      <div className="flex flex-col gap-3 bg-white rounded-lg shadow-xl pr-24 pl-24 pt-10">
        {transaction && transaction.status === "Completed" && (
          <>
            <p className="text-3xl font-bold text-center">Help us improve!</p>
            <br />
            <div style={{ marginBottom: '1rem' }}>
              <h5 className="font-bold">Application Responsiveness</h5>
              <p style={{ marginBottom: '0.5rem' }}>How satisfied are you with the speed and responsiveness of our mobile/web application when browsing and making purchases?</p>
              <div className="radio-group">
                <button
                  className={`radio-button ${formData.q1 === "Absolutely Satisfied" ? "selected" : ""}`}
                  onClick={() => handleChange("q1", "Absolutely Satisfied")}
                >
                  Absolutely Satisfied
                </button>
                <button
                  className={`radio-button ${formData.q1 === "Moderately Satisfied" ? "selected" : ""}`}
                  onClick={() => handleChange("q1", "Moderately Satisfied")}
                >
                  Moderately Satisfied
                </button>
                <button
                  className={`radio-button ${formData.q1 === "Somewhat Dissatisfied" ? "selected" : ""}`}
                  onClick={() => handleChange("q1", "Somewhat Dissatisfied")}
                >
                  Somewhat Dissatisfied
                </button>
              </div>
              {validationErrors.q1 && <p className="text-red-500">Please select an answer for this question</p>}
            </div>

            <div>
              <h5 className="font-bold">Order Acceptance</h5>
              <p>How satisfied are you with the approval and speed of your transaction in the system?</p>
              <div className="radio-group">
                <button
                  className={`radio-button ${formData.q2 === "Fast and Hasslefree" ? "selected" : ""}`}
                  onClick={() => handleChange("q2", "Fast and Hasslefree")}
                >
                  Fast and Hasslefree
                </button>
                <button
                  className={`radio-button ${formData.q2 === "Experiencing Delays but Tolerable" ? "selected" : ""}`}
                  onClick={() => handleChange("q2", "Experiencing Delays but Tolerable")}
                >
                  Experiencing Delays but Tolerable
                </button>
                <button
                  className={`radio-button ${formData.q2 === "Complicated and Inconvenient" ? "selected" : ""}`}
                  onClick={() => handleChange("q2", "Complicated and Inconvenient")}
                >
                  Complicated and Inconvenient
                </button>
              </div>
              {validationErrors.q2 && <p className="text-red-500">Please select an answer for this question</p>}
            </div>

            <div>
  <h5 className="font-bold">Rider Performance</h5>
  <p>How was the communication skills and punctuality of the delivery rider in delivering your LPG order?</p>
  <div className="radio-group">
    <button
      className={`radio-button ${formData.q3 === "Interactive and Arrived on time" ? "selected" : ""}`}
      onClick={() => handleChange("q3", "Interactive and Arrived on time")}
    >
      Interactive and Arrived on time
    </button>
    <button
      className={`radio-button ${formData.q3 === "Average expectation" ? "selected" : ""}`}
      onClick={() => handleChange("q3", "Average expectation")}
    >
      Average expectation
    </button>
    <button
      className={`radio-button ${formData.q3 === "Needs more training and arrived late" ? "selected" : ""}`}
      onClick={() => handleChange("q3", "Needs more training and arrived late")}
    >
      Needs more training and arrived late
    </button>
              </div>
              {validationErrors.q3 && <p className="text-red-500">Please select an answer for this question</p>}
</div>

<div>
  <h5 className="font-bold">Overall Satisfaction</h5>
  <p>How would you describe your overall experience using our mobile/web application to purchase LPG products?</p>
  <div className="radio-group">
    <button
      className={`radio-button ${formData.q4 === "One of a kind, will reuse the app" ? "selected" : ""}`}
      onClick={() => handleChange("q4", "One of a kind, will reuse the app")}
    >
      One of a kind, will reuse the app
    </button>
    <button
      className={`radio-button ${formData.q4 === "Medium performance, needs improvement" ? "selected" : ""}`}
      onClick={() => handleChange("q4", "Medium performance, needs improvement")}
    >
      Medium performance, needs improvement
    </button>
    <button
      className={`radio-button ${formData.q4 === "Inconvenient, will stick to conventional purchasing method." ? "selected" : ""}`}
      onClick={() => handleChange("q4", "Inconvenient, will stick to conventional purchasing method.")}
    >
      Inconvenient, will stick to conventional purchasing method.
    </button>
              </div>
              {validationErrors.q4 && <p className="text-red-500">Please select an answer for this question</p>}
</div>

<div>
  <h5 className="font-bold">Recommendation</h5>
  <p>Overall, how likely are you to recommend our mobile/web application to others based on your experience using it for LPG purchases?</p>
  <div className="radio-group">
    <button
      className={`radio-button ${formData.q5 === "Will highly recommend to others" ? "selected" : ""}`}
      onClick={() => handleChange("q5", "Will highly recommend to others")}
    >
      Will highly recommend to others
    </button>
    <button
      className={`radio-button ${formData.q5 === "Undecided to recommend to others" ? "selected" : ""}`}
      onClick={() => handleChange("q5", "Undecided to recommend to others")}
    >
      Undecided to recommend to others
    </button>
    <button
      className={`radio-button ${formData.q5 === "Unlikely to recommend to others" ? "selected" : ""}`}
      onClick={() => handleChange("q5", "Unlikely to recommend to others")}
    >
      Unlikely to recommend to others
    </button>
              </div>
              {validationErrors.q5 && <p className="text-red-500">Please select an answer for this question</p>}
</div>


         

            <div className="flex justify-center items-center p-10">
              <Button onClick={createFeedback}>Submit Feedback</Button>
            </div>
          </>
        )}
      </div>

      <style jsx>{`
        .radio-group {
          display: flex;
          gap: 1rem;
          margin-bottom: 1rem;
        }

        .radio-button {
          flex: 1;
          border: 1px solid #ccc;
          padding: 10px;
          border-radius: 5px;
          transition: background-color 0.3s ease;
        }

        .radio-button.selected {
          background-color: #FFFFFF;
          border-color: #d41111;
        }
      `}</style>
    </main>
  );
}
