import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

function Chat() {
  const [messages, setMessages] = useState([]);
  const [receiver, setReceiver] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const [chatBgImage, setChatBgImage] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    const savedBg = localStorage.getItem("chatBackground");
    if (savedBg) {
      setChatBgImage(savedBg);
    }

    // كل ثانية
    const interval = setInterval(() => {
      axios
        .get("https://683b1e8c43bb370a8674cae2.mockapi.io/messages")
        .then((res) => setMessages(res.data));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const sendMessage = () => {
    if (!newMessage.trim() || !receiver.trim()) {
      Swal.fire({
        text: "Please Enter Receiver Email and Message",
        confirmButtonColor: "#3d9970",
      });
      return;
    }

    const newMsg = {
      sender: localStorage.getItem("email"),
      receiver,
      message: newMessage,
    };

    axios
      .post("https://683b1e8c43bb370a8674cae2.mockapi.io/messages", newMsg)
      .then((res) => {
        setMessages([...messages, res.data]);
        setNewMessage("");
      });
  };

  //تغيير خلفية المحادثة
  const backgroundImage = () => {
    if (imageUrl.trim()) {
      const cleanUrl = imageUrl.trim();
      setChatBgImage(cleanUrl);
      localStorage.setItem("chatBackground", cleanUrl);
    }
  };

  return (
    <div className="min-h-screen customBageColor flex flex-col items-center gap-4 p-4">
      <h1 className="text-3xl font-bold text-gray-800 my-4">Let's Chat</h1>
      <div className="flex gap-2 w-full max-w-2xl mt-4">
        <input
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          placeholder="Enter Image URL"
          className="flex-1 border px-4 py-2 rounded focus:outline-green-700"
        />
        <button
          onClick={backgroundImage}
          className="bg-gray-800 text-white px-4 py-2 rounded"
        >
          Set Background
        </button>
      </div>

      <div
        className="w-full max-w-2xl h-80 overflow-y-auto border border-gray-500 rounded p-5 shadow-2xl bg-cover flex flex-col gap-2"
        style={{
          backgroundImage: chatBgImage ? `url(${chatBgImage})` : "none",
        }}
      >
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`p-2 my-1 rounded break-words whitespace-pre-wrap max-w-70 
                ${
                  msg.sender === localStorage.getItem("email")
                    ? "bg-green-200 self-end text-right"
                    : "bg-amber-100 self-start text-left"
                }`}
          >
            <p>{msg.message}</p>
            <span className="text-xs text-gray-500">
              {msg.sender} to {msg.receiver}
            </span>
          </div>
        ))}
      </div>

      <div className="w-full max-w-2xl flex gap-2 mt-4 flex-col sm:flex-row">
        <input
          type="email"
          value={receiver}
          onChange={(e) => setReceiver(e.target.value)}
          placeholder="Receiver Email"
          className="flex-1 border border-gray-500 px-4 py-2 rounded focus:outline-green-700"
        />
        <input
        type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 border border-gray-500 px-4 py-2 rounded focus:outline-green-700"
        />
        <button
          onClick={sendMessage}
          className="customGreenColor text-lg px-6 py-2 rounded cursor-pointer shadow-2xl"
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default Chat;
