"use client";
import { Announcements, Navbar } from "@/components";
import { useItemStore } from "@/states";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

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
      <p className="text-2xl px-4 py-2">₱{item.customerPrice}.00</p>
    </div>
  </div>
);
export default function Home() {
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);

  const router = useRouter();
  const { items, getItems } = useItemStore() as any;
  const brandNewTanks = useMemo(() => items.filter((e: any) => e.category == "Brand New Tanks"), [items]);
  const refillTanks = useMemo(() => items.filter((e: any) => e.category == "Refill Tanks"), [items]);
  const accessories = useMemo(() => items.filter((e: any) => e.category == "Accessories"), [items]);

  useEffect(() => {
    getItems();
  }, [getItems]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const threshold = 100;

      setIsNavbarVisible(scrollPosition < threshold);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const renderCard = (title: string, items: any[]) => (
    <div className="products">
      <div className="card">
        <p className="font-bold text-5xl mb-4">{title}</p>
        <div className="flex items-center gap-24 p-16">
          {items.map((e: any) => (
            <ItemCard
              key={e._id}
              item={e}
              onClick={() => {
                router.push(`/item?id=${e._id}`);
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
  
  const imageUrls = [
    "https://raw.githubusercontent.com/mrHeinrichh/J.E-Moral-cdn/main/assets/company%20logo/petron.png",
    "https://raw.githubusercontent.com/mrHeinrichh/J.E-Moral-cdn/main/assets/company%20logo/regasco.png",
    "https://raw.githubusercontent.com/mrHeinrichh/J.E-Moral-cdn/main/assets/company%20logo/solane.png",

    "https://raw.githubusercontent.com/mrHeinrichh/J.E-Moral-cdn/main/assets/company%20logo/unioil.png",

    "https://raw.githubusercontent.com/mrHeinrichh/J.E-Moral-cdn/main/assets/company%20logo/pheonix.png",
  ];
  return (
    <main>
      {isNavbarVisible && <Navbar />}
      <div style={{ backgroundColor: 'white' }} className="flex items-center p-8">
        <div style={{ padding: '70px' }}>
          <h1 style={{ fontWeight: 'bold', whiteSpace: 'pre-line' }}>
            &quot;Fueling your
            <br />
            daily needs with
            <br />
            our clean Energy&quot;
          </h1>
          <p>We deliver safe and fast to your doorstep!</p>
        </div>
        <div className="ml-auto pr-49">
          <Image
            src="https://raw.githubusercontent.com/mrHeinrichh/J.E-Moral-cdn/main/assets/lpg-header.png"
            alt="Image Description"
            width={600}
            height={600}
          />
        </div>
      </div>

      <div className="bg-black p-8">
        <div className="grid grid-cols-5 gap-4">
          {imageUrls.map((imageUrl, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded-md"
              // You can add more styling as needed
            >
              <Image
                src={imageUrl}
                alt={`Image ${index + 1}`}
                width={150}
                height={150}
                className="rounded-md"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-4 p-16">
        {renderCard("Brand New Tanks", brandNewTanks)}
        {renderCard("Refill Tanks", refillTanks)}
        {renderCard("Accessories", accessories)}
      </div>
    </main>
  );
}