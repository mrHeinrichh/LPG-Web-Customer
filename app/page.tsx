"use client";
import { Navbar } from "@/components";
import { useHomeStore } from "@/states";
import { useEffect } from "react";
import { HeroSection, ItemsList, SponsorsList } from "./components";

export default function Home() {
  const {
    setNavbarVisible,
    navbarVisible,
    getItems,
    brandNewTanks,
    refillTanks,
    accessories,
  } = useHomeStore();

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
