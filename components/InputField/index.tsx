import React from "react";
import style from "./style.module.css";

function Button({
  onChange,
  name,
  type,
  placeholder,
  defaultValue,
  value,
}: any) {
  if (type == "radio" || type == "checkbox") {
    return (
      <label className="flex items-center gap-2">
        <input
          type={type}
          name={name ?? "name"}
          value={value ?? ""}
          onChange={onChange ?? (() => {})}
        />
        {placeholder}
      </label>
    );
  }

  return (
    <div className="flex flex-col">
      {placeholder ? <p>{placeholder}</p> : <></>}
      <p></p>
      <input
        className={style.input}
        type={type ?? "text"}
        name={name ?? "name"}
        defaultValue={defaultValue}
        value={value}
        placeholder={placeholder ?? "placeholder"}
        onChange={onChange ?? (() => {})}
      ></input>
    </div>
  );
}

export default Button;
