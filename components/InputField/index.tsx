import React from "react";
import style from "./style.module.css";

function Button({ onChange, name, type, placeholder, defaultValue }: any) {
  return (
    <div className="flex flex-col">
      {placeholder ? <p>{placeholder}</p> : <></>}
      <p></p>
      <input
        className={style.input}
        type={type ?? "text"}
        name={name ?? "name"}
        defaultValue={defaultValue ?? ""}
        placeholder={placeholder ?? "placeholder"}
        onChange={onChange ?? (() => {})}
      ></input>
    </div>
  );
}

export default Button;
