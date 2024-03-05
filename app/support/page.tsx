"use client";
import { Button, ChatInputField, InputField, Navbar } from "@/components/";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import style from "./style.module.css";
import { API_URL } from "@/env";
import Image from "next/image";
import { SOCKET, patch, post } from "@/config";
import { useAuthStore, useMessageStore } from "@/states";

export default function Support() {
  const router = useRouter();
  const { user, authenticate } = useAuthStore() as any;
  const { getMessages, messages, addMessage, addNewMessage } =
    useMessageStore() as any;
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

    // Include 'addNewMessage', 'getMessages', and 'user._id' in the dependency array
    SOCKET.on(`createdMessage/${user._id}`, onCreatedMssage);
    return () => {
      SOCKET.off(`createdMessage/${user._id}`, onCreatedMssage);
    };
  }, [addNewMessage, getMessages, user._id]);

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
      <div className="pr-56 pl-56 pt-8">
        <h4 className="flex justify-center items-center m-8 font-bold">
          Chat Support
        </h4>
        <hr className="border-t my-4 w-full" />
        <div className="bg-white border border-gray-200 rounded-lg shadow-md">
          <div className="h-96 bg-red-100 p-10 flex flex-col gap-5">
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
          <div className="flex items-center justify-between p-5">
            <ChatInputField onChange={handleChange}></ChatInputField>
            <Button
              onClick={() => {
                handleSubmit();
              }}
            >
              Send
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
