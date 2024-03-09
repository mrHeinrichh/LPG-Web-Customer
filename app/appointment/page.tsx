"use client";
import { CheckoutButton, InputField, Navbar } from "@/components/";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { patch, post } from "@/config";
import { useAuthStore } from "@/states";

export default function Appointment() {
  const router = useRouter();
  const { user, setUser } = useAuthStore() as any;

  const [image, setimage] = useState<null | string>(null);
  const [formData, setFormData] = useState({
    name: "",
    contactNumber: "",
    address: "",
    email: "",
  });

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


  const handleChangeDate = (event: any) => {
    const { name, value } = event.target;
    setdate(value);
  };

  const handleAppointmentSubmit = async () => {
    try {
      const { data } = await patch(`users/${user._id}`, {
        appointmentDate: date,
        appointmentStatus: "Pending",
        __t: "Customer",
      });

      if (data.status === "success") {
        setUser(data.data[0]);
        router.push("/");
      }
    } catch (error) {
      console.error("Error adding customers:", error);
    }
  };


  return (
    <main>
      <Navbar />
  <div className="pr-48 pl-48 pb-48 pt-24">
      <div>
        <h3 className="flex justify-center">Greetings Users!</h3>
        <p className="flex justify-center">

            We appreciate clicking this section and showing your interest in applying as delivery driver. Few reminders, your submission of
            <br />
            requirements do not actually mean that you are already accepted.
            .. You are still subject to
            
interview based on your appqintment date.    <br /> To
            expect fast transaction once your application is accepted, prepare the following requirements below:
            <br />
            <br />
            - Biodata
            <br />
            
            - Drivers License (1 or 2 - Professional)
            <br />
            
            - Barangay/Police/NBI Clearance(if available)
            <br />
            
            - Fire Safety Certification
            <br />
            
            - Verified Geash Account
            <br />
            
Note: You are required to undergo seminar once hired. Other details will be provided during the interview.
          </p>
          <br />
      </div>
          <div className="flex justify-center">
            <p className="font-bold text-lg">Rider Appointment</p>
          </div>
          <div className="p-6 w-76">
  
          <div className="grid grid-cols-2 gap-4">
    <div className="col-span-2 flex justify-center">
      <InputField
        type="date"
        name="date"
        placeholder="Appointment Date"
        onChange={handleChangeDate}
        className="w-full p-2 border rounded-md"
      />
    </div>
    <div className="col-span-2 flex justify-center">
      <CheckoutButton
        type="button"
        onClick={handleAppointmentSubmit}
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700"
      >
        Apply as a rider
      </CheckoutButton>
    </div>
  </div>
</div>
          </div>
    </main>
  );
}
