import React from "react";
import Image from "next/image";

export interface IHeroSection {}

function HeroSection({}: IHeroSection) {
  return (
    <div style={{ backgroundColor: "white" }} className="flex items-center p-8">
      <div style={{ padding: "70px" }}>
        <h1 style={{ fontWeight: "bold", whiteSpace: "pre-line" }}>
          &quot;Fueling your
          <br />
          daily needs with
          <br />
          our clean Energy&quot;
        </h1>
        <p>We deliver safe and fast to your doorstep!</p>
      </div>
      <div className="ml-auto pr-32">
        <Image
          src="https://raw.githubusercontent.com/mrHeinrichh/J.E-Moral-cdn/main/assets/png/logo-main.png"
          alt="Image Description"
          width={600}
          height={600}
        />
      </div>
    </div>
  );
}

export default HeroSection;
