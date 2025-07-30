import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const Chat = () => {
  const { targetUserId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const loggedInUser = useSelector((store) => store.user);
  const userId = loggedInUser?._id;

  const getCurrTime = (timeStr) => {
    const date = new Date(timeStr);
    return date.toLocaleDateString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const fetchChatMessages = async () => {
    const res = await axios.get(`${BASE_URL}/chat/${targetUserId}`, {
      withCredentials: true,
    });

    const chatMessages = res?.data?.chat?.messages.map((msg) => {
      const { senderId, message, createdAt } = msg;
      return {
        firstName: senderId?.firstName,
        lastName: senderId?.lastName,
        photoUrl: senderId?.photoUrl,
        text: message,
        time: getCurrTime(createdAt),
      };
    });

    setMessages(chatMessages);
  };

  useEffect(() => {
    if (!loggedInUser || !targetUserId) return;

    const socket = createSocketConnection();

    socket.emit("joinChat", {
      userId,
      targetUserId,
    });

    socket.on(
      "messageReceived",
      ({ firstName, lastName, photoUrl, text, time }) => {
        setMessages((prev) => [
          ...prev,
          {
            firstName,
            lastName,
            photoUrl,
            text,
            time: getCurrTime(time),
          },
        ]);
      }
    );

    return () => {
      socket.disconnect();
    };
  }, [userId, targetUserId, loggedInUser]);

  useEffect(() => {
    fetchChatMessages();
  }, [targetUserId]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const socket = createSocketConnection();

    socket.emit("sendMessage", {
      firstName: loggedInUser.firstName,
      lastName: loggedInUser.lastName,
      photoUrl: loggedInUser.photoUrl,
      userId,
      targetUserId,
      text: newMessage,
    });

    setNewMessage("");
  };

  return (
    <form onSubmit={sendMessage}>
      <div className="w-1/2 mx-auto border border-gray-600 m-5 h-[70vh] flex flex-col">
        <h1 className="p-5 border-b border-gray-600">Chat</h1>
        <div className="flex-1 overflow-y-auto p-5">
          {messages.map((message, index) => (
            <div key={index}>
              <div className="chat chat-start mb-4">
                <div className="chat-image avatar">
                  <div className="w-10 rounded-full">
                    <img alt="user profile" src={message.photoUrl} />
                  </div>
                </div>
                <div className="chat-header">
                  {`${message.firstName} ${message.lastName}`}
                  <time className="text-xs opacity-50 ml-2">
                    {message.time}
                  </time>
                </div>
                <div className="chat-bubble">{message.text}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="p-5 border-t border-gray-600 flex items-center gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="flex-1 border border-gray-500 text-white rounded p-2"
            placeholder="Type your message..."
          />
          <button type="submit" className="btn btn-secondary">
            Send
          </button>
        </div>
      </div>
    </form>
  );
};

export default Chat;
