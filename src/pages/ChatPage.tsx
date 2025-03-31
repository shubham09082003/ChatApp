import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";

function ChatPage() {
  const { roomId } = useParams();
  const [messages, setMessages] = useState<string[]>([]);
  const wsRef = useRef<WebSocket | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ws = new WebSocket("https://real-time-chat-backend-h1w4.onrender.com/");

    ws.onopen = () => {
      ws.send(
        JSON.stringify({
          type: "join",
          payload: {
            roomId: roomId,
          },
        })
      );
    };

    ws.onmessage = (event) => {
      setMessages((prevMessages) => [...prevMessages, event.data]);
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    ws.onclose = () => {
      console.log("WebSocket connection closed");
    };

    wsRef.current = ws;

  }, [roomId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (wsRef.current && inputRef.current && inputRef.current.value.trim() !== "") {
      wsRef.current.send(
        JSON.stringify({
          type: "chat",
          payload: {
            message: inputRef.current.value,
          },
        })
      );
      inputRef.current.value = "";
    }
  };

  return (
    <div className="bg-black h-screen flex justify-center items-center">
      <div className="flex flex-col w-[50%] border border-gray-400 h-[90vh] p-6">
        
        <div className="pb-4 border-b border-gray-500">
          <div className="flex items-center gap-2">
            <img src={"/chat-icon.png"} width={30} />
            <h1 className="text-white text-2xl">Real Time Chat App</h1>
          </div>
          <div className="text-gray-500">RoomId: {roomId}</div>
        </div>

        <div className="flex-1 overflow-y-auto border border-gray-400 rounded-md p-4 mt-4">
          {messages.map((message, index) => (
            <div key={index} className="bg-white p-3 max-w-fit rounded-md mt-3">
              {message}
            </div>
          ))}

          <div ref={messagesEndRef}></div>
        </div>


        <div className="mt-2 flex gap-2 w-full bg-black p-4">
          <input
            className="bg-gray-400 p-2 w-[80%] rounded-md"
            type="text"
            placeholder="Enter the message"
            ref={inputRef}
          />
          <button
            onClick={sendMessage}
            className="bg-white p-2 rounded-md w-[20%]"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatPage;
