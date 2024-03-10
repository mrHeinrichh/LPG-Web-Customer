import React from "react";
import style from "./style.module.css";

function InputField({
  onChange,
  name,
  type,
  placeholder,
  defaultValue,
  value,
  error,
  required, // Add the required prop
}: any) {
  const isError = error && error.trim() !== "";

  if (type === "radio" || type === "checkbox") {
    return (
      <label className="flex items-center gap-2">
        <input
          type={type}
          name={name ?? "name"}
          value={value ?? ""}
          onChange={onChange ?? (() => {})}
          required={required} // Add the required prop
        />
        {placeholder}
        {isError && <p className={style.error}>{error}</p>}
      </label>
    );
  }

  return (
    <div className="flex flex-col">
      {placeholder && <p>{placeholder}</p>}
      <input
        className={`${style.input} ${isError ? style.errorInput : ""}`}
        type={type ?? "text"}
        name={name ?? "name"}
        defaultValue={defaultValue}
        value={value}
        placeholder={placeholder ?? "placeholder"}
        onChange={onChange ?? (() => {})}
        required={required} // Add the required prop
      />
      {isError && <p className={style.error}>{error}</p>}
    </div>
  );
}

export default InputField;
