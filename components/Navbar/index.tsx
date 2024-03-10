"use client";
import React from "react";
import style from "./style.module.css";
import cart from "@/public/cart.svg";
import Image from "next/image";
import { useAuthStore } from "@/states";
import { useRouter } from "next/navigation";
import {
  FaShoppingCart,
  FaQuestion,
  FaRegAddressCard,
  FaFileAlt,
} from "react-icons/fa";
import { FaRegMessage } from "react-icons/fa6";function Navbar() {
  const router = useRouter();
  const { user, logout } = useAuthStore() as any;
  const handleRedirect = () => {
    const linkToRedirect = "https://mrheinrichh.github.io/web-mobile-download-interface/";
    window.location.href = linkToRedirect; // Redirect using the browser's location.href
  };

  return (
    <>
      <div className={style.container}>
        <p onClick={() => router.push("/")}>J.E MORAL LPG STORE</p>

        <div className="flex gap-3 items-center">
          {user ? (
            <>
              <p
                className={style.navItem}
                onClick={() => router.push("/")}
              >
                HOME
              </p>

              <p
                className={style.navItem}
                onClick={() => router.push("/announcements")}
              >
                ANNOUNCEMENTS
              </p>
              <p
                className={style.navItem}
                onClick={() => router.push("/my-transactions")}
              >
                TRANSACTIONS
              </p>
              <p
                className={style.navItem}
                onClick={() => router.push("/faqs")}
              >
                FAQ&apos;s {/* Updated to use HTML entity */}
              </p>
              <p
                className={style.navItem}
                onClick={() => router.push("/appointment")}
              >
                RIDER APPLY {/* Updated to use HTML entity */}
              </p>
              <p
      className={style.navItem}
      onClick={handleRedirect}
    >
      DOWNLOAD APP
    </p>
              <p
                className={style.navItem}
                onClick={() => logout()}
              >
                Logout
              </p>
              <FaShoppingCart
                size={30}
                onClick={() => router.push("/my-cart")}
              />
              <FaRegAddressCard
                size={40}
                onClick={() => router.push("/my-profile")}
              />
              <FaRegMessage
                size={33}
                onClick={() => router.push("/support")}
              />
            </>
          ) : (
            <>
              <p
                className={style.signInUp}
                onClick={() => router.push("sign-in")}
              >
                SIGN IN
              </p>
              <p>/</p>
              <p
                className={style.signInUp}
                onClick={() => router.push("sign-up")}
              >
                SIGN UP
              </p>
            </>
          )}
        </div>
      </div>
      <div className={style.divider}></div>
    </>
  );
}


export default Navbar;