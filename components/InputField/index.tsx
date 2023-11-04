import React from "react";
import style from "./style.module.css";

function Button({ onChange, name, type, placeholder, defaultValue }: any) {
  return (
    <>
      <input
        className={style.input}
        type={type ?? "text"}
        name={name ?? "name"}
        defaultValue={defaultValue ?? ""}
        placeholder={placeholder ?? "placeholder"}
        onChange={onChange ?? (() => {})}
      ></input>
    </>
  );
}

export default Button;
