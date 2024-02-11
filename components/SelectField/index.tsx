import React from "react";
import style from "./style.module.css";
import { FieldOption, ISelectField } from "@/interfaces";

function SelectField({
  options,
  name,
  onChange,
  title,
  defaultValue,
}: ISelectField) {
  return (
    <div className={style.container}>
      {title ? <p>{title}</p> : <></>}
      <select
        name={name}
        id="lang"
        onChange={onChange}
        className={style.input}
        value={defaultValue}
      >
        {options.map((e: FieldOption) => (
          <option key={e.value} value={e.value}>
            {e.title}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SelectField;
