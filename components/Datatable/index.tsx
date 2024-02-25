import React from "react";
import style from "./style.module.css";

function Datatable({ header, children }: any) {
  return (
    <>
      <table className={style.styled_table}>
        <thead>
          <tr>
            {header.map((e: any) => (
              <th key={e}>{e}</th>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </>
  );
}

export default Datatable;
