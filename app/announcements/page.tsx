"use client";
import { Navbar } from "@/components";
import { useEffect } from "react";
import Image from "next/image";
import { useAnnouncementStore } from "@/states";

export default function Announcements() {
  const { getAnnouncements, announcements, page, limit, next, back } =
    useAnnouncementStore();

  useEffect(() => {
    getAnnouncements({ page, limit });
  }, [getAnnouncements, page, limit]);

  return (
    <>
      <Navbar />
      <div className="w-screen">
        {announcements[0] ? (
          <div className="flex justify-center items-center gap-2">
            <div className="relative h-96 w-96">
              <Image
                src={announcements[0].image}
                fill
                alt={announcements[0].image}
              />
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
      <div className="flex justify-between">
        <p
          onClick={() => {
            back();
          }}
        >
          Left
        </p>
        <p
          onClick={() => {
            next();
          }}
        >
          Right
        </p>
      </div>
    </>
  );
}
