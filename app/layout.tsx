"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import { useAuthStore } from "@/states";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathName = usePathname();
  const router = useRouter();
  const authStore = useAuthStore() as any;
  const [rendered, setrendered] = useState(false);

  useEffect(() => {
    setrendered(true);

    if (!authStore.user && !pathName.includes("sign-up")) {
      router.push("/sign-in");
    }
  }, [authStore.user, pathName, router]); // Include router in the dependency array

  return (
    <html lang="en">
      <body className={inter.className}>{rendered ? children : <></>}</body>
    </html>
  );
}