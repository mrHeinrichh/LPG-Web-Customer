"use client";
import { Navbar } from "@/components/";
import { useFaqStore } from "@/states";
import { useEffect } from "react";

export default function Faqs() {
  const { faqs, getFaqs } = useFaqStore();

  useEffect(() => {
    getFaqs();
  }, [getFaqs]); // Add getFaqs to the dependency array

  return (
    <main>
      <Navbar />
      <div className="flex flex-col gap-10 p-10">
        <p className="text-3xl font-bold">Frequently Asked Questions</p>
        {faqs.map((e: any) => (
          <div key={e._id} className="bg-white shadow-md p-6 rounded-lg">
            <p className="text-2xl font-semibold">{e.question}</p>
            <p className="text-gray-600">{e.answer}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
