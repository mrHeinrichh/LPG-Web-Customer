// Importing React and other necessary modules
import React, { useEffect, useState } from "react";
import { useAnnouncementsStore } from "@/states";
import Image from "next/image";

// Announcements component
function Announcements() {
  const [page, setpage] = useState(0);
  const { getAnnouncements, announcements } = useAnnouncementsStore() as any;

  useEffect(() => {
    getAnnouncements();
  }, [getAnnouncements]); // Include getAnnouncements in the dependency array

  const increment = () => {
    if (page < announcements.length - 1) setpage((prev: number) => prev + 1);
  };

  const decrement = () => {
    if (page !== 0) setpage((prev: number) => prev - 1);
  };

  return (
    <div className="">
      {announcements[page] ? (
        <div className="w-screen flex justify-center items-center gap-2 p-10">
          <Image
            src={announcements[page].image}
            width={800}
            height={800}
            alt={announcements[page].image}
          />
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

// Exporting the Announcements component as the default export
export default Announcements;
