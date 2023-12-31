import React from "react";
import style from "./style.module.css";
import cart from "@/public/cart.svg";
import Image from "next/image";
import Link from "next/link";
function Navbar() {
  return (
    <>
      <div className={style.container}>
        <Image
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
          <Link href="/sign-in">
            <p>Sign In</p>
          </Link>
          <Link href="/sign-up">
            <p>Sign Up</p>
          </Link>
          <Link href="/my-cart">
            <Image src={cart} width={55} height={55} alt={"cart"}></Image>
          </Link>
        </div>
      </div>
      <div className={style.divider}></div>
    </>
  );
}

export default Navbar;
