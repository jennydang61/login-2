import React, { useState, useEffect } from "react";
import axios from "../../api/axios";
import useAuth from "../../hooks/useAuth";
import "./messagesStyle.css";

const Messages = () => {
  const { auth } = useAuth(); 
  const [chatUsers, setChatUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  // fetch chat users 
  useEffect(() => {
    const fetchChatUsers = async () => {
      try {
        const response = await axios.get(`/message/chatUsers`, {
          params: { user_ID: auth.id },
        });
        setChatUsers(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    if (auth?.id) {
      fetchChatUsers();
    }
  }, [auth]);

  // fetch messages for the selected user
  useEffect(() => {
    const fetchMessages = async () => {
      if (!selectedUser) return;

      try {
        const response = await axios.get(`/message/chat`, {
          params: {
            user1_ID: auth.id,
            user2_ID: selectedUser.user_ID,
          },
        });
        setMessages(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchMessages();
  }, [selectedUser, auth]);

  // send message
  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    try {
      await axios.post(`/message/sendMessage`, {
        sender_ID: auth.id,
        receiver_ID: selectedUser.user_ID,
        content: newMessage,
      });

      // append the sent message to chat
      setMessages((prev) => [
        ...prev,
        {
          sender_ID: auth.id,
          receiver_ID: selectedUser.user_ID,
          content: newMessage,
          time_stamp: new Date().toLocaleString(),
        },
      ]);
      setNewMessage("");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div id="messages-container">
      <h2>Messages</h2>
      <div>
        {selectedUser ? (
          <div>
            <h3>Chat with {selectedUser.name}</h3>
            <div>
              <ul>
                {messages.map((msg, index) => (
                  <li
                    key={index}
                    style={{
                      textAlign: msg.sender_ID === auth.id ? "right" : "left",
                    }}
                  >
                    {msg.content}
                  </li>
                ))}
              </ul>
              <input
                type="text"
                placeholder="Type a message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="message"
              />
              <button onClick={handleSendMessage} className="message-button">Send</button>
              <button onClick={() => setSelectedUser(null)} className="message-button">Back</button>
            </div>
          </div>
        ) : (
          <div>
            <ul>
              {chatUsers.map((user) => (
                <li key={user.user_ID}>
                  <span>{user.name}</span>
                  <button onClick={() => setSelectedUser(user)} className="message-button">Chat</button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

// hard code for testing
/*
const Messages = () => {
  const auth = { id: 1, name: "Logged In User" };

  const [chatUsers] = useState([
    { user_ID: 2, name: "Alice Johnson" },
    { user_ID: 3, name: "Bob Smith" },
    { user_ID: 4, name: "Charlie Brown" },
  ]);

  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const chatHistories = {
    2: [
      { sender_ID: 1, content: "Hi Alice!", time_stamp: new Date().toLocaleString() },
      { sender_ID: 2, content: "Hello!", time_stamp: new Date().toLocaleString() },
    ],
    3: [
      { sender_ID: 1, content: "Hey Bob!", time_stamp: new Date().toLocaleString() },
      { sender_ID: 3, content: "Hi!", time_stamp: new Date().toLocaleString() },
    ],
    4: [
      { sender_ID: 1, content: "Hi Charlie!", time_stamp: new Date().toLocaleString() },
      { sender_ID: 4, content: "Good evening!", time_stamp: new Date().toLocaleString() },
    ],
  };

  const handleSelectUser = (user) => {
    setSelectedUser(user);
    setMessages(chatHistories[user.user_ID] || []);
  };

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const newMsg = {
      sender_ID: auth.id,
      content: newMessage,
      time_stamp: new Date().toLocaleString(),
    };

    setMessages((prevMessages) => [...prevMessages, newMsg]);
    setNewMessage("");
  };

  return (
    <div id="messages-container">
      <h2>Messages</h2>
      <div>
        {selectedUser ? (
          <div>
            <h3>Chat with {selectedUser.name}</h3>
            <div>
              <ul>
                {messages.map((msg, index) => (
                  <li
                    key={index}
                    style={{
                      textAlign: msg.sender_ID === auth.id ? "right" : "left",
                    }}
                  >
                    {msg.content}
                  </li>
                ))}
              </ul>
              <input
                type="text"
                placeholder="Type a message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="message"
              />
              <button onClick={handleSendMessage} className="message-button">Send</button>
              <button onClick={() => setSelectedUser(null)} className="message-button">Back</button>
            </div>
          </div>
        ) : (
          <div>
            <ul>
              {chatUsers.map((user) => (
                <li key={user.user_ID}>
                  <span>{user.name}</span>
                  <button onClick={() => handleSelectUser(user)} className="message-button">Chat</button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}; */

export default Messages;