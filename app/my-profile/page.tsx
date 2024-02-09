"use client";
import { Button, InputField, Navbar } from "@/components/";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import style from "./style.module.css";
import { API_URL } from "@/env";
import Image from "next/image";
import { patch, post } from "@/config";
import { useAuthStore } from "@/states";

export default function MyProfile() {
  const router = useRouter();
  const { user, setUser } = useAuthStore() as any;

  const [image, setimage] = useState<null | string>(null);
  const [formData, setFormData] = useState({
    name: "",
    contactNumber: "",
    address: "",
    email: "",
  });
  const [password, setpassword] = useState("");
  const [date, setdate] = useState("");

  useEffect(() => {
    setFormData({
      name: user.name,
      contactNumber: user.contactNumber,
      address: user.address,
      email: user.email,
    });
    setimage(user.image);
  }, []);

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleChangeDate = (event: any) => {
    const { name, value } = event.target;
    setdate(value);
  };

  const handlePassword = (event: any) => {
    const { name, value } = event.target;
    setpassword(value);
  };

  const fileChange = async (event: any) => {
    const form = new FormData();
    form.append("image", event.target.files[0]);
    const { data } = await post<FormData>("upload/image", form);
    if (data.status == "success") {
      setimage(data.data[0]?.path ?? "");
    }
  };

  const handleSubmit = async () => {
    try {
      const { data } = await patch(`users/${user._id}`, {
        ...formData,
        image,
        type: "Customer",
      });

      if (data.status === "success") router.push("/");
    } catch (error) {
      console.error("Error adding customers:", error);
    }
  };

  const handleAppointmentSubmit = async () => {
    try {
      const { data } = await patch(`users/${user._id}`, {
        appointmentDate: date,
        appointmentStatus: "Pending",
        image,
        type: "Customer",
      });

      if (data.status === "success") {
        setUser(data.data[0]);
        router.push("/");
      }
    } catch (error) {
      console.error("Error adding customers:", error);
    }
  };

  const handleChangePassword = async () => {
    try {
      const { data } = await patch(`users/${user._id}/password`, {
        password,
      });
      if (data.status === "success") router.push("/");
    } catch (error) {
      console.error("Error adding customers:", error);
    }
  };

  return (
    <main>
      <Navbar></Navbar>
      <div className={style.container}>
        <form className={style.form}>
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
            name="name"
            placeholder="Full Name"
            onChange={handleChange}
            defaultValue={formData.name}
          />
          <InputField
            name="contactNumber"
            placeholder="Contact Number"
            onChange={handleChange}
            defaultValue={formData.contactNumber}
          />
          <div className="col-span-2">
            <InputField
              name="address"
              placeholder="Address"
              onChange={handleChange}
              defaultValue={formData.address}
            />
          </div>
          <div className="col-span-2">
            <InputField
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              defaultValue={formData.email}
            />
          </div>

          <div className="col-span-2">
            <Button type="button" onClick={handleSubmit}>
              Update Profile
            </Button>
          </div>
          <div className="">
            <p className="font-bold text-lg">Change Password</p>
          </div>
          <div className="col-span-2">
            <InputField
              type="password"
              name="password"
              placeholder="Password"
              onChange={handlePassword}
            />
          </div>
          <div className="col-span-2">
            <Button type="button" onClick={handleChangePassword}>
              Change Password
            </Button>
          </div>

          <div className="">
            <p className="font-bold text-lg">Rider Appointment</p>
          </div>
          <div className="col-span-2">
            <InputField
              type="date"
              name="date"
              placeholder="Appointment Date"
              onChange={handleChangeDate}
            />
          </div>
          <div className="col-span-2">
            <Button type="button" onClick={handleAppointmentSubmit}>
              Apply as a rider
            </Button>
          </div>
        </form>
      </div>
    </main>
  );
}
