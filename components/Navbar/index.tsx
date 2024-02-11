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
import { FaRegMessage } from "react-icons/fa6";
function Navbar() {
  const router = useRouter();
  const { user, logout } = useAuthStore() as any;

  return (
    <>
      <div className={style.container}>
        <Image
          onClick={() => {
            router.push("/");
          }}
          src={
            "https://raw.githubusercontent.com/mrHeinrichh/J.E-Moral-cdn/main/assets/png/logo-main.png"
          }
          width={100}
          height={100}
          alt={
            "https://raw.githubusercontent.com/mrHeinrichh/J.E-Moral-cdn/main/assets/png/logo-main.png"
          }
        ></Image>

        <div className="flex gap-3 items-center">
          {user ? (
            <>
              <FaRegAddressCard
                size={40}
                onClick={() => {
                  router.push("/my-profile");
                }}
              />
              <FaFileAlt
                size={28}
                onClick={() => {
                  router.push("/my-transactions");
                }}
              />
              <FaRegMessage
                size={33}
                onClick={() => {
                  router.push("/support");
                }}
              />
              <p
                onClick={() => {
                  logout();
                }}
              >
                Logout
              </p>
            </>
          ) : (
            <>
              <p
                onClick={() => {
                  router.push("sign-in");
                }}
              >
                Sign In
              </p>
              <p
                onClick={() => {
                  router.push("sign-up");
                }}
              >
                Sign Up
              </p>
            </>
          )}

          <FaQuestion
            size={28}
            onClick={() => {
              router.push("/faqs");
            }}
          />
          <FaShoppingCart
            size={30}
            onClick={() => {
              router.push("/my-cart");
            }}
          />
        </div>
      </div>
      <div className={style.divider}></div>
    </>
  );
}

export default Navbar;
