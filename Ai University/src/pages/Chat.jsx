import React, { useState, useRef, useEffect } from "react";
import { FaArrowUp } from "react-icons/fa";
import "animate.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Chat() {
  const [message, setMessage] = useState("");
  const [chats, setChats] = useState([]);
  const [isTyping, setTyping] = useState(false);
  const chatEndRef = useRef(null);

  // Scroll to bottom when chat updates
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chats, isTyping]);

  const createChat = async (e) => {
    e.preventDefault();
    const userMsg = message.trim();
    if (!userMsg) return;

    setMessage(""); // Clear input

    // Push user message
    setChats((prev) => [
      ...prev,
      { sender: "me", message: userMsg, createdAt: new Date() },
    ]);

    setTyping(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMsg }),
      });

      if (!res.ok) throw new Error(`Server error: ${res.statusText}`);
      const data = await res.json();

      setChats((prev) => [
        ...prev,
        { sender: "ai", message: data.result, createdAt: new Date() },
      ]);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setTyping(false);
    }
  };

  return (
    <>
      <div className="bg-white w-screen h-screen flex justify-center relative">
        <img
          src="/i01.jpg"
          alt="Background"
          className="w-full h-full object-cover object-center absolute inset-0"
        />
        <div className="lg:w-[70%] w-full h-screen bg-white/30 backdrop-blur-sm absolute z-10 flex flex-col">
          {/* Header */}
          <div className="bg-linear-to-br from-orange-400 to-indigo-400 h-[10%] flex justify-center items-center text-2xl font-medium text-white tracking-wide">
            Chat with Lucifer
          </div>

          {/* Chat Box */}
          <div className="h-[80%] overflow-y-auto overflow-x-hidden p-8 flex-1">
            {chats.map((item, index) => (
              <div key={index}>
                {item.sender === "me" && (
                  <div className="mt-5 flex flex-col-reverse gap-2 justify-start animate__animated animate__fadeIn">
                    <small className="text-gray-500 pl-3">You</small>
                    <div className="bg-rose-200 shadow font-medium px-6 py-3 rounded-xl w-fit">
                      {item.message}
                    </div>
                  </div>
                )}
                {item.sender === "ai" && (
                  <div className="mt-5 flex flex-col-reverse gap-2 items-end animate__animated animate__fadeIn">
                    <small className="text-gray-500 pr-3 text-end w-full">
                      Lucifer
                    </small>
                    <div className="bg-green-200 shadow font-medium px-6 py-3 rounded-xl w-fit max-w-full wrap-break-word">
                      {item.message}
                    </div>
                  </div>
                )}
              </div>
            ))}
            {isTyping && (
              <small className="w-full inline-block text-end text-gray-500 pr-3 animate__animated animate__fadeIn">
                Typing...
              </small>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Input */}
          <div className="bg-linear-to-br from-indigo-400 to-orange-400 h-[10%] flex justify-center items-center">
            <div className="bg-white shadow w-[90%] h-[70%] rounded-full flex justify-between items-center">
              <form
                onSubmit={createChat}
                className="bg-white w-full h-full rounded-full flex justify-between items-center"
              >
                <input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  type="text"
                  placeholder="Type a message..."
                  className="ml-5 h-full w-[90%] outline-none"
                />
                <button className="bg-black text-white lg:w-10 w-[15%] h-[80%] rounded-full mr-2 flex justify-center items-center shadow">
                  <FaArrowUp />
                </button>
              </form>
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  );
}

export default Chat;
