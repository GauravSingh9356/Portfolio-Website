import React, { useEffect, useRef, useState } from "react";
import "./Chatbot.css";

const STORAGE_KEY = "portfolio_chat_history_v1";
const nowTs = () => new Date().toISOString();

const ChatbotFriendly = ({ backendUrl = "/api/chat" }) => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const messagesRef = useRef(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setMessages(JSON.parse(raw));
    } catch (e) {
      console.warn("Failed to load chat history", e);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    } catch (e) {
      // ignore
    }
  }, [messages]);

  useEffect(() => {
    if (messagesRef.current)
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
  }, [messages, open]);

  const unreadCount = messages.filter(
    (m) => m.sender === "bot" && !m.read
  ).length;

  const markAllRead = () =>
    setMessages((m) =>
      m.map((x) => (x.sender === "bot" ? { ...x, read: true } : x))
    );

  const toggleOpen = () => {
    console.log("Toggle clicked!");
    setOpen((o) => {
      const next = !o;
      console.log("Chat open state changed to:", next);
      if (next) setTimeout(markAllRead, 120);
      return next;
    });
    setError(null);
  };

  const sendMessage = async (textArg) => {
    const raw = typeof textArg === "string" ? textArg : input;
    const text = raw && raw.trim();
    if (!text) return;

    const userMessage = {
      id: Date.now() + "-u",
      sender: "user",
      text,
      ts: nowTs(),
    };
    setMessages((m) => [...m, userMessage]);
    setInput("");
    setLoading(true);
    setError(null);

    try {
      const resp = await fetch("https://rag-chatbot-9kd8.onrender.com/query", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: text }),
      });

      if (!resp.ok) {
        const errText = await resp.text();
        throw new Error(errText || "Server error");
      }

      const data = await resp.json().catch(async () => {
        const t = await resp.text();
        return { reply: t };
      });

      const reply =
        data.reply ||
        data.answer ||
        data.result ||
        data.message ||
        JSON.stringify(data);
      const botMessage = {
        id: Date.now() + "-b",
        sender: "bot",
        text: reply,
        ts: nowTs(),
        read: open,
      };
      setMessages((m) => [...m, botMessage]);
    } catch (err) {
      setError("Sorry — I couldn't reach the assistant right now.");
      const botMessage = {
        id: Date.now() + "-b",
        sender: "bot",
        text: "Sorry, something went wrong.",
        ts: nowTs(),
        read: open,
      };
      setMessages((m) => [...m, botMessage]);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const formatTime = (iso) => {
    try {
      const d = new Date(iso);
      return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    } catch (e) {
      return "";
    }
  };

  const shouldPulse = messages.length === 0 && !open;
  const quickSuggestions = [
    "Tell me about Gaurav's projects",
    "What does Gaurav do?",
    "Show Gaurav's top skills",
  ];

  const quickAsk = (q) => {
    if (!open) setOpen(true);
    sendMessage(q);
  };

  return (
    <div className={`chatbot-root ${open ? "open" : ""}`}>
      <button
        className={`chat-toggle ${shouldPulse ? "pulse" : ""}`}
        onClick={toggleOpen}
        type="button"
        title="Chat with Gaurav"
        aria-label="Open chat"
        aria-expanded={open}
      >
        <div className="toggle-inner">
          <i className="fa fa-comments" aria-hidden="true"></i>
        </div>
        {unreadCount > 0 && <div className="chat-badge">{unreadCount}</div>}
      </button>

      <div className="chat-window" aria-hidden={!open}>
        <div className="chat-header">
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div className="bot-avatar">
              <img
                src="/images/robot-avatar.svg"
                alt="Bot"
                style={{ width: "100%", height: "100%" }}
              />
            </div>
            <div>
              <div className="chat-title">Gaurav's Assistant</div>
              <div className="chat-sub">
                Ask anything about Gaurav — projects, experience, hobbies
              </div>
            </div>
          </div>
          <button
            className="chat-close"
            onClick={toggleOpen}
            aria-label="Close chat"
          >
            ✕
          </button>
        </div>

        <div className="chat-body" ref={messagesRef}>
          {messages.length === 0 && (
            <div className="chat-empty">
              <div className="welcome">
                <div className="chip">
                  Hi — I'm Gaurav's assistant. Ask me anything about Gaurav.
                </div>
                <div className="suggestions">
                  {quickSuggestions.map((s) => (
                    <button
                      key={s}
                      className="suggestion-btn"
                      onClick={() => quickAsk(s)}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {messages.map((m) => (
            <div
              key={m.id}
              className={`chat-message ${m.sender === "user" ? "user" : "bot"}`}
            >
              {m.sender === "bot" && (
                <div className="avatar-wrap">
                  <div className="avatar bot-avatar-small">
                    <img
                      src="/images/robot-avatar.svg"
                      alt="Bot"
                      style={{ width: "100%", height: "100%" }}
                    />
                  </div>
                </div>
              )}

              <div className="bubble-wrap">
                <div className="bubble">{m.text}</div>
                <div className="ts">{m.ts ? formatTime(m.ts) : ""}</div>
              </div>

              {m.sender === "user" && (
                <div
                  className="avatar-wrap user"
                  style={{
                    padding: "4px 6px 4px 6px",
                  }}
                >
                  <div className="avatar user-avatar">You</div>
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div className="chat-message bot typing">
              <div className="avatar-wrap">
                <div className="avatar bot-avatar-small">
                  <img
                    src="/images/robot-avatar.svg"
                    alt="Bot"
                    style={{ width: "100%", height: "100%" }}
                  />
                </div>
              </div>
              <div className="bubble-wrap">
                <div className="typing-dots">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="chat-footer">
          <textarea
            className="chat-input"
            placeholder="Ask about Gaurav.."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            rows={1}
          />
          <button
            className="chat-send"
            onClick={() => sendMessage()}
            disabled={loading}
            aria-label="Send"
            title="Send"
          >
            {loading ? (
              <span className="loader" />
            ) : (
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                focusable="false"
                style={{ display: "block", width: "100%", height: "100%" }}
              >
                <path
                  d="M22 2L11 13"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M22 2L15 22L11 13L2 9L22 2Z"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="currentColor"
                  fillOpacity="0.12"
                />
              </svg>
            )}
          </button>
        </div>

        {error && <div className="chat-error">{error}</div>}
      </div>
    </div>
  );
};

export default ChatbotFriendly;
