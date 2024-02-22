"use client";
import { Navbar } from "@/components/";
import { useEffect } from "react";
import { useFaqsStore } from "@/states";

export default function Faqs() {
  const { faqs, getFaqs } = useFaqsStore() as any;

  useEffect(() => {
    getFaqs();
  }, [getFaqs]);  // Add getFaqs to the dependency array

  return (
    <main>
      <Navbar></Navbar>
      <div className="flex flex-col gap-10 p-10 ">
        <p className="text-3xl font-bold">Frequently Asked Questions</p>
        {faqs.map((e: any) => {
          return (
            <div className="" key={e._id}>
              <p className="text-2xl">{e.question}</p>
              <p>{e.answer}</p>
            </div>
          );
        })}
      </div>
    </main>
  );
}
