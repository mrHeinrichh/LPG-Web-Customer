"use client";
import { Announcements, Navbar } from "@/components";
import { useHomeStore, useItemStore } from "@/states";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { HeroSection, ItemsList, SponsorsList } from "./components";

interface ItemCardProps {
  item: {
    _id: string;
    image: string;
    name: string;
    customerPrice: number;
    // Add any other properties as needed
  };
  onClick: () => void;
}

const ItemCard: React.FC<ItemCardProps> = ({ item, onClick }) => (
  <div className="item-card" onClick={onClick}>
    <div className="card">
      <Image
        src={item.image}
        width={400}
        height={400}
        alt={item.image}
        className="item-image"
      ></Image>
      <p className="text-3xl font-bold px-4 py-2">{item.name}</p>
      <p className="text-2xl px-4 py-2">₱{item.customerPrice}</p>
    </div>
  </div>
);
export default function Home() {
  const {
    setNavbarVisible,
    navbarVisible,
    items,
    getItems,
    brandNewTanks,
    refillTanks,
    accessories,
  } = useHomeStore();
  const router = useRouter();

  useEffect(() => {
    getItems({ page: 1, limit: 100 });
  });

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const threshold = 100;
      setNavbarVisible({ value: scrollPosition < threshold });
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [setNavbarVisible]);

  return (
    <main>
      {navbarVisible && <Navbar />}
      <HeroSection />
      <SponsorsList />
      <div className="flex flex-col gap-4 p-16">
        <ItemsList title="Brand New Tanks" items={brandNewTanks} />
        <ItemsList title="Refill Tanks" items={refillTanks} />
        <ItemsList title="Accessories" items={accessories} />
      </div>
    </main>
  );
}
