import React from "react";
import style from "./style.module.css";

function TableRow({ children }: any) {
  return (
    <>
      <tr>{children}</tr>
    </>
  );
}

export default TableRow;
