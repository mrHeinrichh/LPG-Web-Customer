"use client";
import { Button, InputField, Navbar } from "@/components/";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import style from "./style.module.css";
import { API_URL } from "@/env";
import Image from "next/image";
import { SOCKET, patch, post } from "@/config";
import { useAuthStore, useMessagesStore } from "@/states";

export default function Support() {
  const router = useRouter();
  const { user, authenticate } = useAuthStore() as any;
  const { getMessages, messages, addMessage, addNewMessage } =
    useMessagesStore() as any;
  const [image, setimage] = useState<null | string>(null);
  const [formData, setFormData] = useState({
    name: "",
    contactNumber: "",
    address: "",
    email: "",
  });
  const [message, setmessage] = useState("");

  useEffect(() => {
    getMessages(user._id);
    function onCreatedMssage(data: any) {
      addNewMessage(data.data[0]);
    }

    SOCKET.on(`createdMessage/${user._id}`, onCreatedMssage);
    return () => {
      SOCKET.off(`createdMessage/${user._id}`, onCreatedMssage);
    };
  }, []);

  const handleChange = (event: any) => {
    const { value } = event.target;
    setmessage(value);
  };

  const handleSubmit = async () => {
    addMessage({ content: message, from: user._id });
  };

  return (
    <main>
      <Navbar></Navbar>
      <div className="w-screen h-96 bg-red-100 p-10 flex flex-col gap-5 overflow-auto">
        {messages.map((e: any) => {
          return (
            <div
              key={e._id}
              className={`flex items-center ${
                e.from == user._id ? "justify-end" : "justify-start"
              }`}
            >
              <p className="p-2 bg-white-500 w-fit text-xl rounded-lg">
                {e.content}
              </p>
            </div>
          );
        })}
      </div>
      <div className="flex items-center w-full">
        <InputField onChange={handleChange}></InputField>
        <Button
          onClick={() => {
            handleSubmit();
          }}
        >
          Send
        </Button>
      </div>
    </main>
  );
}
