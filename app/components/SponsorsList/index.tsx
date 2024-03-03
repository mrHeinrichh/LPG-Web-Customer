import React from "react";
import Image from "next/image";
import { IMAGE_URLS } from "./data";

export interface ISponsorsList {}

function SponsorsList({}: ISponsorsList) {
  return (
    <div className="bg-black p-8">
      <div className="grid grid-cols-5 gap-4">
        {IMAGE_URLS.map((imageUrl, index) => (
          <div
            key={index}
            className="bg-white p-4 rounded-md"
            // You can add more styling as needed
          >
            <Image
              src={imageUrl}
              alt={`Image ${index + 1}`}
              width={150}
              height={150}
              className="rounded-md"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default SponsorsList;
