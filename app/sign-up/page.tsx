"use client";
import { Button, InputField, Navbar } from "@/components/";
import { useRouter } from "next/navigation";
import { useState } from "react";
import style from "./style.module.css";
import { API_URL } from "@/env";
import Image from "next/image";

export default function Home() {
  const router = useRouter();
  const [image, setimage] = useState<null | string>(null);
  const [formData, setFormData] = useState({
    name: "customer",
    contactNumber: "09569749935",
    address: "73 Fabros Residency's",
    type: "Customer",
    email: "customer@gmail.com",
    password: "customer",
  });

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const fileChange = async (event: any) => {
    const formData = new FormData();
    formData.append("image", event.target.files[0], event.target.files[0].name);
    const response = await fetch(`${API_URL}upload/image`, {
      method: "POST",
      body: formData,
    });
    setimage((await response.json()).data[0].path);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API_URL}users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, image }),
      });

      const { status } = await response.json();

      if (status === "success") {
        router.push("/");
      }
    } catch (error) {
      console.error("Error adding customers:", error);
    }
  };

  return (
    <main>
      <Navbar></Navbar>
      <main className={style.container}>
        <form onSubmit={handleSubmit} className={style.form}>
          <div className="col-span-2">
            <h3 className="font-bold text-lg">Create your account</h3>
          </div>

          {image ? (
            <Image
              src={image ?? ""}
              width={150}
              height={150}
              alt={image ?? ""}
            ></Image>
          ) : (
            <></>
          )}
          <div className="col-span-2">
            <InputField
              type="file"
              placeholder="Choose Image"
              onChange={fileChange}
            />
          </div>
          <InputField
            name="firstName"
            placeholder="First Name"
            onChange={handleChange}
          />
          <InputField
            name="contactNumber"
            placeholder="Contact Number"
            onChange={handleChange}
          />
          <div className="col-span-2">
            <InputField
              name="address"
              placeholder="Address"
              onChange={handleChange}
            />
          </div>
          <div className="col-span-2">
            <InputField
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
            />
          </div>
          <div className="col-span-2">
            <InputField
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
            />
          </div>
          <div className="col-span-2">
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </main>
    </main>
  );
}
