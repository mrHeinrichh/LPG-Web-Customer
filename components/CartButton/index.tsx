import React from "react";
import style from "./style.module.css";

function CartButton({ onClick, type, children }: any) {
  return (
    <>
      <button
        className={style.button}
        onClick={onClick}
        type={type ?? "button"}
      >
        {children}
      </button>
    </>
  );
}

export default CartButton;
