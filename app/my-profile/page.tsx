"use client";
import { Button, CartButton, ChangePasswordButton, InputField, Navbar } from "@/components/";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import style from "./style.module.css";
import { API_URL } from "@/env";
import Image from "next/image";
import { patch, post } from "@/config";
import { useAuthStore } from "@/states";
import UpdateProfileButton from "@/components/UpdateProfileButton";

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
  }, [user.address, user.contactNumber, user.email, user.image, user.name]); // Include user properties in the dependency array

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
      <Navbar />
      
     
      <div className="col-span-2 flex justify-center">
        <form className={style.form}>
          <div className="col-span-3">
            <h3 className="font-bold text-lg">Create your account</h3>
          </div>
          <div className="">  {image ? (
            
            <Image
              src={image ?? ""}
              width={450}
              height={350}
              alt={image ?? ""}
            ></Image>
            
          ) : (
            <></>
          )}
            <br />
            <InputField
              type="file"
              placeholder="Choose Image"
              onChange={fileChange}
            />
          </div>
        
          <div className="col-span-2 pl-16">
            
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

            <InputField
              name="address"
              placeholder="Address"
              onChange={handleChange}
              defaultValue={formData.address}
            />
        
            <InputField
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              defaultValue={formData.email}
            />
              <hr className="border-t my-4 w-full" />
              <p className="font-bold text-lg">Change Password</p>
            <InputField
              type="password"
              name="password"
              placeholder="Password"
              onChange={handlePassword}
            />
          <br />
              <ChangePasswordButton type="button" onClick={handleChangePassword}>
              Change Password
            </ChangePasswordButton>
          </div>
          <div className="flex justify-center col-span-2">
            <UpdateProfileButton type="button" onClick={handleSubmit}>
              Update Profile
            </UpdateProfileButton>
            
          </div>   
        </form>
      </div>
    </main>
  );
}
