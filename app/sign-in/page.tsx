"use client";
import { Button, InputField, Navbar } from "@/components/";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import style from "./style.module.css";
import { useAuthStore } from "@/states";

export default function Home() {
  const router = useRouter();
  const { user, authenticate } = useAuthStore() as any;
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (user) router.push("/");
  }, [user]);

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = async () => {
    authenticate({ ...formData });
  };
  return (
    <main>
      <Navbar />
      <div className={style.cardContainer}>
        <div className={`${style.container} ${style.card}`}>
      <div className={style.cardContainer}>
        <div className={style.container}>
 

          <div className={style.formContainer}>
            <form onSubmit={handleSubmit} className={style.form}>
              <div className="col-span-2">
              <div className="flex justify-center items-center">
  <h3 className="font-bold text-lg">SIGN IN</h3>
</div>
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
                  <div className="flex justify-center items-center">
                  <Button
                  type="button"
                  onClick={() => {
                    authenticate({ ...formData });
                  }}
                >
                  Submit
                </Button>
</div>
              
              </div>
            </form>
          </div>
        </div>
          </div>
          </div>
      </div>
    </main>
  );
}