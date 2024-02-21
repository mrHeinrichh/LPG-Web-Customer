"use client";
import { Announcements, Navbar } from "@/components";

import {
  useAuthStore,
  useCartStore,
  useCheckoutStore,
  useTransactionsStore,
} from "@/states";
import { useQRCode } from "next-qrcode";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
export default function Home() {
  const { Canvas } = useQRCode();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { cart } = useCartStore() as any;
  const { user } = useAuthStore() as any;
  const [formData, setFormData] = useState({
    contactNumber: "",
  });



  return (
    <main>
      <Navbar />
     <Announcements/>
    </main>
  );
}
