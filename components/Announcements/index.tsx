"use client";
import React, { useEffect, useState } from "react";
import { useAnnouncementsStore } from "@/states";
import { useRouter } from "next/navigation";

function Announcements() {
  const router = useRouter();
  const [page, setpage] = useState(0);
  const { getAnnouncements, announcements } = useAnnouncementsStore() as any;

  useEffect(() => {
    getAnnouncements();
  }, []);

  const increment = () => {
    if (page < announcements.length - 1) setpage((prev: number) => prev + 1);
  };

  const decrement = () => {
    if (page != 0) setpage((prev: number) => prev - 1);
  };

  return (
    <div className="">
      {announcements[page] ? (
        <div className="w-screen flex justify-center items-center bg-red-700 gap-2 p-10">
          <p className="text-5xl font-bold text-white-50">
            {announcements[page].text}
          </p>
        </div>
      ) : (
        <></>
      )}

      <div className="flex justify-between">
        <p
          onClick={() => {
            decrement();
          }}
        >
          Left
        </p>
        <p
          onClick={() => {
            increment();
          }}
        >
          Right
        </p>
      </div>
    </div>
  );
}

export default Announcements;
