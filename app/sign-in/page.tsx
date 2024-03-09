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
  }, [user, router]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSignUpClick = () => {
    router.push("/sign-up");
  };

  return (
    <main>
      <Navbar />
      <div className={style.container}>
        <div className="flex h-full w-full">
          <div className="w-1/2 flex justify-center items-center ">
            <div className="max-w-xl flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <h3 className="font-bold text-lg text-center">SIGN IN</h3>
                <p className="text-center font-bold text-sm">
                  &ldquo;Fueling Convenience, Order Your LPG Tanks with
                  Ease!&rdquo;
                </p>
              </div>

              <InputField
                type="email"
                name="email"
                placeholder="Email"
                onChange={handleChange}
              />
              <InputField
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleChange}
              />

              <Button
                type="button"
                onClick={() => {
                  authenticate({ ...formData, __t: "Customer" });
                }}
              >
                Sign in
              </Button>
              <p>
                Don&apos;t have an account?{" "}
                <span onClick={handleSignUpClick} className="font-bold">
                  Sign up here!
                </span>
              </p>
            </div>
          </div>
          <div className={style.pageBackground}></div>;
        </div>
      </div>
    </main>
  );
}
