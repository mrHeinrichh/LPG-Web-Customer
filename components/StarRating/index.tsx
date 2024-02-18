"use client";
import React from "react";
import style from "./style.module.css";
import { FaStar } from "react-icons/fa";

interface StarRating {
  onClick?: (rate: number) => void;
  rating: number;
}

function StarRating({ onClick, rating }: any) {
  return (
    <div className="flex items-center ">
      {[...Array(5)].map((star, index) => {
        const currentRating = index + 1;
        return (
          <label key={index} className="cursor-pointer">
            <input
              type="radio"
              value={currentRating}
              className="hidden"
              onClick={() => {
                onClick(currentRating);
              }}
            />
            <FaStar
              size={30}
              color={currentRating <= rating ? "#ffc107" : "#e4e5e9"}
            ></FaStar>
          </label>
        );
      })}
    </div>
  );
}

export default StarRating;
