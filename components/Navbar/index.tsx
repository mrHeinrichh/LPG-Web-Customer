"use client";
import React from "react";
import style from "./style.module.css";
import cart from "@/public/cart.svg";
import Image from "next/image";
import { useAuthStore } from "@/states";
import { useRouter } from "next/navigation";

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
              <p
                onClick={() => {
                  router.push("/my-profile");
                }}
              >
                My Profile
              </p>
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
          <Image
            src={cart}
            width={55}
            height={55}
            alt={"cart"}
            onClick={() => {
              router.push("my-cart");
            }}
          ></Image>{" "}
        </div>
      </div>
      <div className={style.divider}></div>
    </>
  );
}

export default Navbar;
