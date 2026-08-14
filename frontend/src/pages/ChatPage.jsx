import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import EmergencyBar from '../components/EmergencyBar';

const API_URL = "http://127.0.0.1:8008/chat";

const SUGGESTED_PROMPTS = [
  "I have a persistent headache",
  "Find a clinic near me",
  "How can I prevent malaria?",
  "What should I eat during pregnancy?",
  "I have chest pain"
];

const createGreeting = () => ({
  id: "greeting",
  sender: "bot",
  text: "Hello! I am MediGuide AI, your healthcare guidance assistant. Describe your symptoms or health questions and I will provide guidance, urgency triage, and point you to local clinics. How can I help you today?",
  urgency: "Low",
  title: "Welcome to MediGuide AI",
  recommendations: [],
  followUpQuestions: [],
  suggestedActions: ["Find Nearby Clinics", "Learn about Malaria"],
  timestamp: new Date()
});

export default function ChatPage() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([createGreeting()]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const scrollRef = useRef(null);
  const textareaRef = useRef(null);

  const hasConversation = messages.length > 1 || isLoading;

  const scrollToBottom = () => {
    const el = scrollRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const autoResize = () => {
    const ta = textareaRef.current;
    if (!ta) return;
    ta.style.height = "auto";
    ta.style.height = `${Math.min(ta.scrollHeight, 180)}px`;
  };

  const handleInputChange = (e) => {
    setInputText(e.target.value);
    autoResize();
  };

  const startNewChat = () => {
    setMessages([createGreeting()]);
    setInputText("");
    if (textareaRef.current) textareaRef.current.style.height = "auto";
  };

  const handleSendMessage = async (textToSend) => {
    const text = textToSend.trim();
    if (!text || isLoading) return;

    const userMsg = { id: `user-${Date.now()}`, sender: "user", text, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInputText("");
    if (textareaRef.current) textareaRef.current.style.height = "auto";
    setIsLoading(true);

    const historyPayload = messages
      .filter(m => m.id !== "greeting")
      .map(m => ({
        role: m.sender === "user" ? "user" : "assistant",
        content: m.sender === "user" ? m.text : `${m.title ? m.title + "\n" : ""}${m.text}`
      }));

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, history: historyPayload })
      });

      if (!response.ok) throw new Error("Server response error");

      const data = await response.json();

      const botMsg = {
        id: `bot-${Date.now()}`,
        sender: "bot",
        text: data.response,
        urgency: data.urgency,
        title: data.title,
        recommendations: data.recommendations || [],
        followUpQuestions: data.followUpQuestions || [],
        suggestedActions: data.suggestedActions || [],
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMsg]);
    } catch (error) {
      console.error("Chat API Error:", error);
      const fallbackMsg = {
        id: `bot-fallback-${Date.now()}`,
        sender: "bot",
        text: "Service is temporarily unavailable or offline. Please check your connection. You can also view clinics or browse health articles.",
        urgency: "Medium",
        title: "Connection Error",
        recommendations: ["Check your network connection", "Ensure local server is running on port 8008"],
        followUpQuestions: [],
        suggestedActions: ["Find Nearby Clinics", "Browse Health Library"],
        timestamp: new Date()
      };
      setMessages(prev => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (inputText.trim() && !isLoading) handleSendMessage(inputText);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleFormSubmit(e);
    }
  };

  const handleSuggestedAction = (actionText) => {
    const lower = actionText.toLowerCase();
    if (lower.includes("clinic") || lower.includes("er")) {
      navigate("/clinics");
    } else if (lower.includes("malaria") || lower.includes("hypertension") || lower.includes("headache") || lower.includes("pregnancy") || lower.includes("library")) {
      navigate("/library");
    } else {
      handleSendMessage(actionText);
    }
  };

  const handlePromptClick = (prompt) => {
    if (prompt.toLowerCase().includes("clinic")) {
      navigate("/clinics");
    } else {
      handleSendMessage(prompt);
    }
  };

  const copyText = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      console.error("Copy failed:", err);
    }
  };

  const renderUrgencyBadge = (urgency) => {
    if (!urgency) return null;
    let className = "badge-low";
    let icon = "🟢";
    if (urgency === "Medium") { className = "badge-medium"; icon = "🟡"; }
    else if (urgency === "High") { className = "badge-high"; icon = "🔴"; }
    return <span className={`badge ${className} urgency-badge`}>{icon} {urgency} Urgency</span>;
  };

  return (
    <div className="chat-page fade-in">
      <EmergencyBar onAction={() => navigate("/clinics")} />

      <header className="chat-header">
        <div className="chat-header-inner">
          <div className="chat-model-info">
            <div className="model-avatar" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
              </svg>
            </div>
            <div>
              <div className="model-name">MediGuide AI</div>
              <div className="model-status">
                <span className={`status-dot ${hasConversation ? '' : 'status-online'}`} />
                Healthcare guidance assistant
              </div>
            </div>
          </div>
          <button className="new-chat-btn" onClick={startNewChat} title="Start a new conversation">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M12 5v14M5 12h14" />
            </svg>
            New chat
          </button>
        </div>
      </header>

      <div className="chat-scroll" ref={scrollRef}>
        <div className="chat-conversation">
          {!hasConversation && (
            <div className="chat-welcome">
              <div className="welcome-orb" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                </svg>
              </div>
              <h2>How can I help you today?</h2>
              <p>Describe your symptoms or ask a health question. I'll give you guidance, urgency triage, and point you to local clinics.</p>
              <div className="welcome-chips">
                {SUGGESTED_PROMPTS.map(prompt => (
                  <button key={prompt} className="welcome-chip" onClick={() => handlePromptClick(prompt)}>
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((msg) => {
            const isUser = msg.sender === "user";
            const isGreeting = msg.id === "greeting";
            const isHighUrgency = !isUser && msg.urgency === "High";

            if (isGreeting && !hasConversation) return null;

            return (
              <div key={msg.id} className={`chat-msg ${isUser ? "chat-msg-user" : "chat-msg-bot"}`}>
                {!isUser && (
                  <div className="msg-avatar" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                    </svg>
                  </div>
                )}

                <div className="msg-main">
                  {!isUser && (
                    <div className="msg-meta">
                      {msg.title && <span className="msg-title">{msg.title}</span>}
                      {renderUrgencyBadge(msg.urgency)}
                    </div>
                  )}

                  <div className={`msg-bubble ${isUser ? "msg-bubble-user" : "msg-bubble-bot"} ${isHighUrgency ? "bubble-high-urgency" : ""}`}>
                    {isHighUrgency && (
                      <div className="high-urgency-header">
                        <span className="er-pulse">🚨</span>
                        <span>CRITICAL HEALTH WARNING</span>
                      </div>
                    )}
                    <div className="msg-text">{msg.text}</div>

                    {!isUser && msg.recommendations && msg.recommendations.length > 0 && (
                      <div className="msg-details">
                        <div className="msg-details-title">Recommendations</div>
                        <ul className="msg-list">
                          {msg.recommendations.map((rec, idx) => <li key={idx}>{rec}</li>)}
                        </ul>
                      </div>
                    )}

                    {!isUser && msg.followUpQuestions && msg.followUpQuestions.length > 0 && (
                      <div className="msg-details msg-details-question">
                        <div className="msg-details-title">Follow-up questions</div>
                        <ul className="msg-list">
                          {msg.followUpQuestions.map((q, idx) => <li key={idx}>{q}</li>)}
                        </ul>
                      </div>
                    )}
                  </div>

                  {!isUser && msg.suggestedActions && msg.suggestedActions.length > 0 && (
                    <div className="msg-action-chips">
                      {msg.suggestedActions.map((action, idx) => (
                        <button key={idx} className="action-chip" onClick={() => handleSuggestedAction(action)}>
                          <svg className="chip-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M5 12h14" />
                            <path d="m12 5 7 7-7 7" />
                          </svg>
                          {action}
                        </button>
                      ))}
                    </div>
                  )}

                  {!isUser && (
                    <div className="msg-tools">
                      <button className="msg-tool-btn" onClick={() => copyText(msg.text)} title="Copy response">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="9" y="9" width="13" height="13" rx="2" />
                          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                        </svg>
                        Copy
                      </button>
                      <span className="msg-time">{msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {isLoading && (
            <div className="chat-msg chat-msg-bot">
              <div className="msg-avatar" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                </svg>
              </div>
              <div className="msg-main">
                <div className="typing-bubble">
                  <span className="typing-dot"></span>
                  <span className="typing-dot"></span>
                  <span className="typing-dot"></span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="chat-input-area">
        <form className="chat-input-shell" onSubmit={handleFormSubmit}>
          <textarea
            ref={textareaRef}
            className="chat-textarea"
            placeholder="Describe your symptoms or ask a health question..."
            value={inputText}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            rows={1}
            maxLength={300}
            disabled={isLoading}
            aria-label="Message MediGuide AI"
          />
          <div className="chat-input-footer">
            <span className="chat-input-note">
              <svg className="note-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="16" x2="12" y2="12" />
                <line x1="12" y1="8" x2="12.01" y2="8" />
              </svg>
              MediGuide AI can make mistakes — verify important information with a professional.
            </span>
            <button
              type="submit"
              className="send-btn"
              disabled={!inputText.trim() || isLoading}
              aria-label="Send message"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 2 11 13" />
                <path d="M22 2 15 22l-4-9-9-4 20-7Z" />
              </svg>
            </button>
          </div>
        </form>
      </div>

      <style>{`
        .chat-page {
          flex: 1;
          display: flex;
          flex-direction: column;
          min-height: 0;
          background-color: var(--color-bg);
        }

        /* Header */
        .chat-header {
          border-bottom: 1px solid var(--color-border);
          background-color: var(--color-surface);
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(10px);
        }
        .chat-header-inner {
          max-width: 820px;
          margin: 0 auto;
          padding: 0.7rem 1rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
        }
        .chat-model-info {
          display: flex;
          align-items: center;
          gap: 0.7rem;
        }
        .model-avatar {
          width: 2.35rem;
          height: 2.35rem;
          border-radius: 12px;
          background: var(--color-primary-grad);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 12px -3px rgba(13, 110, 110, 0.5);
        }
        .model-avatar svg {
          width: 1.3rem;
          height: 1.3rem;
        }
        .model-name {
          font-family: var(--font-display);
          font-weight: 700;
          font-size: 0.98rem;
          color: var(--color-text);
          line-height: 1.2;
        }
        .model-status {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.74rem;
          color: var(--color-text-muted);
        }
        .status-dot {
          width: 0.5rem;
          height: 0.5rem;
          border-radius: 50%;
          background-color: var(--color-primary-soft);
          box-shadow: 0 0 0 3px rgba(20, 184, 166, 0.18);
          animation: pulse-dot 1.6s infinite ease-in-out;
        }
        .new-chat-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          background: none;
          border: 1px solid var(--color-border-strong);
          color: var(--color-text-muted);
          font-size: 0.85rem;
          font-weight: 600;
          padding: 0.45rem 0.85rem;
          border-radius: 9999px;
          cursor: pointer;
          transition: all var(--transition-fast);
        }
        .new-chat-btn svg {
          width: 0.95rem;
          height: 0.95rem;
        }
        .new-chat-btn:hover {
          color: var(--color-primary);
          border-color: var(--color-primary);
          background-color: var(--color-primary-light);
        }

        /* Scroll / conversation */
        .chat-scroll {
          flex: 1;
          overflow-y: auto;
          min-height: 0;
        }
        .chat-conversation {
          max-width: 820px;
          margin: 0 auto;
          padding: 1.5rem 1rem 2rem;
          display: flex;
          flex-direction: column;
          gap: 1.4rem;
        }

        /* Welcome empty state */
        .chat-welcome {
          text-align: center;
          padding: 3.5rem 1rem 2.5rem;
          animation: fadeIn 0.35s ease-out;
        }
        .welcome-orb {
          width: 4rem;
          height: 4rem;
          margin: 0 auto 1.25rem;
          border-radius: 50%;
          background: var(--color-primary-grad);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 12px 30px -8px rgba(13, 110, 110, 0.55);
        }
        .welcome-orb svg {
          width: 2rem;
          height: 2rem;
        }
        .chat-welcome h2 {
          font-size: 1.75rem;
          margin-bottom: 0.75rem;
        }
        .chat-welcome p {
          color: var(--color-text-muted);
          max-width: 560px;
          margin: 0 auto 2rem;
          line-height: 1.65;
        }
        .welcome-chips {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 0.6rem;
        }
        .welcome-chip {
          background-color: var(--color-surface);
          border: 1px solid var(--color-border);
          color: var(--color-text);
          font-size: 0.88rem;
          font-weight: 500;
          padding: 0.6rem 1rem;
          border-radius: 9999px;
          cursor: pointer;
          transition: all var(--transition-fast);
          box-shadow: var(--shadow-xs);
        }
        .welcome-chip:hover {
          border-color: var(--color-primary);
          color: var(--color-primary);
          background-color: var(--color-primary-light);
          transform: translateY(-2px);
        }

        /* Messages */
        .chat-msg {
          display: flex;
          gap: 0.85rem;
          animation: fadeIn 0.25s ease-out;
        }
        .chat-msg-user {
          justify-content: flex-end;
        }
        .msg-avatar {
          width: 2.1rem;
          height: 2.1rem;
          border-radius: 50%;
          background: var(--color-primary-grad);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          margin-top: 0.25rem;
          box-shadow: 0 3px 10px -2px rgba(13, 110, 110, 0.5);
        }
        .msg-avatar svg {
          width: 1.15rem;
          height: 1.15rem;
        }
        .msg-main {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
          max-width: calc(100% - 3rem);
        }
        .chat-msg-user .msg-main {
          max-width: 78%;
        }
        .msg-meta {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          flex-wrap: wrap;
        }
        .msg-title {
          font-size: 0.78rem;
          font-weight: 700;
          color: var(--color-text-muted);
          letter-spacing: 0.01em;
        }
        .msg-bubble {
          font-size: 0.95rem;
          line-height: 1.65;
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-sm);
        }
        .msg-bubble-user {
          background: linear-gradient(135deg, var(--color-primary) 0%, #0f8f8f 100%);
          color: white;
          padding: 0.8rem 1.1rem;
          border-bottom-right-radius: 6px;
          box-shadow: 0 4px 14px -6px rgba(13, 110, 110, 0.55);
        }
        .msg-bubble-bot {
          background-color: var(--color-surface);
          color: var(--color-text);
          border: 1px solid var(--color-border);
          padding: 0.85rem 1.1rem;
          border-bottom-left-radius: 6px;
        }
        .msg-text {
          white-space: pre-line;
        }
        .bubble-high-urgency {
          background-color: var(--urgency-high-bg);
          border: 2px solid var(--urgency-high-text) !important;
          color: var(--urgency-high-text) !important;
          box-shadow: 0 0 14px var(--urgency-high-glow);
          animation: pulseGlow 2s infinite ease-in-out;
        }
        .high-urgency-header {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-weight: 800;
          font-size: 0.78rem;
          letter-spacing: 0.05em;
          margin-bottom: 0.6rem;
          border-bottom: 1px solid var(--urgency-high-border);
          padding-bottom: 0.4rem;
        }
        .er-pulse {
          font-size: 1.1rem;
          animation: pulse-dot 1s infinite alternate;
        }
        @keyframes pulseGlow {
          0% { box-shadow: 0 0 5px var(--urgency-high-glow); }
          50% { box-shadow: 0 0 16px var(--urgency-high-glow); }
          100% { box-shadow: 0 0 5px var(--urgency-high-glow); }
        }

        .msg-details {
          margin-top: 0.8rem;
          border-top: 1px solid var(--color-border);
          padding-top: 0.7rem;
        }
        .bubble-high-urgency .msg-details {
          border-top-color: var(--urgency-high-border);
        }
        .msg-details-title {
          font-size: 0.75rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: var(--color-primary);
          margin-bottom: 0.4rem;
        }
        .bubble-high-urgency .msg-details-title {
          color: var(--urgency-high-text);
        }
        .msg-details-question .msg-details-title {
          color: #b45309;
        }
        .msg-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
          font-size: 0.9rem;
        }
        .msg-list li {
          padding-left: 1.3rem;
          position: relative;
          line-height: 1.5;
        }
        .msg-list li::before {
          content: "→";
          position: absolute;
          left: 0;
          color: var(--color-primary);
          font-weight: 700;
        }
        .bubble-high-urgency .msg-list li::before {
          color: var(--urgency-high-text);
        }

        .msg-action-chips {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
        }
        .action-chip {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          background-color: var(--color-surface);
          border: 1px solid var(--color-border-strong);
          color: var(--color-primary);
          font-size: 0.82rem;
          font-weight: 600;
          padding: 0.4rem 0.85rem;
          border-radius: 9999px;
          cursor: pointer;
          transition: all var(--transition-fast);
          box-shadow: var(--shadow-xs);
        }
        .chip-icon {
          width: 0.85rem;
          height: 0.85rem;
        }
        .action-chip:hover {
          background-color: var(--color-primary-light);
          border-color: var(--color-primary);
          color: var(--color-primary-hover);
        }

        .msg-tools {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-top: 0.15rem;
        }
        .msg-tool-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.3rem;
          background: none;
          border: none;
          color: var(--color-text-muted);
          font-size: 0.78rem;
          font-weight: 600;
          cursor: pointer;
          padding: 0.25rem 0.4rem;
          border-radius: var(--radius-sm);
          transition: all var(--transition-fast);
        }
        .msg-tool-btn svg {
          width: 0.9rem;
          height: 0.9rem;
        }
        .msg-tool-btn:hover {
          color: var(--color-primary);
          background-color: var(--color-primary-light);
        }
        .msg-time {
          font-size: 0.72rem;
          color: var(--color-text-muted);
          opacity: 0.85;
        }

        /* Typing indicator */
        .typing-bubble {
          display: inline-flex;
          align-items: center;
          gap: 0.3rem;
          background-color: var(--color-surface);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-lg);
          border-bottom-left-radius: 6px;
          padding: 0.8rem 1.1rem;
          box-shadow: var(--shadow-sm);
        }
        .typing-dot {
          width: 0.5rem;
          height: 0.5rem;
          background-color: var(--color-primary);
          border-radius: 50%;
          display: inline-block;
          animation: typingDot 1.4s infinite ease-in-out both;
        }
        .typing-dot:nth-child(2) { animation-delay: 0.16s; }
        .typing-dot:nth-child(3) { animation-delay: 0.32s; }
        @keyframes typingDot {
          0%, 80%, 100% { transform: translateY(0); opacity: 0.4; }
          40% { transform: translateY(-4px); opacity: 1; }
        }

        /* Input area */
        .chat-input-area {
          border-top: 1px solid var(--color-border);
          background: rgba(255, 255, 255, 0.92);
          backdrop-filter: blur(10px);
          padding: 0.9rem 1rem 1rem;
        }
        .chat-input-shell {
          max-width: 820px;
          margin: 0 auto;
          background-color: var(--color-surface);
          border: 1.5px solid var(--color-border-strong);
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-md);
          transition: border-color var(--transition-fast), box-shadow var(--transition-fast);
        }
        .chat-input-shell:focus-within {
          border-color: var(--color-primary);
          box-shadow: 0 0 0 4px rgba(13, 110, 110, 0.12), var(--shadow-md);
        }
        .chat-textarea {
          width: 100%;
          border: none;
          resize: none;
          outline: none;
          background: transparent;
          padding: 0.85rem 1rem 0.5rem;
          font-size: 0.95rem;
          line-height: 1.55;
          color: var(--color-text);
          max-height: 180px;
        }
        .chat-textarea::placeholder {
          color: #94a3b8;
        }
        .chat-input-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 0.75rem;
          padding: 0.3rem 0.7rem 0.7rem;
        }
        .chat-input-note {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.74rem;
          color: var(--color-text-muted);
        }
        .note-icon {
          width: 0.85rem;
          height: 0.85rem;
          color: var(--color-primary-soft);
          flex-shrink: 0;
        }
        .send-btn {
          width: 2.5rem;
          height: 2.5rem;
          border-radius: 50%;
          border: none;
          background: var(--color-primary-grad);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all var(--transition-fast);
          box-shadow: 0 4px 12px -4px rgba(13, 110, 110, 0.55);
          flex-shrink: 0;
        }
        .send-btn svg {
          width: 1.1rem;
          height: 1.1rem;
          margin-left: 1px;
        }
        .send-btn:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 8px 18px -6px rgba(13, 110, 110, 0.6);
        }
        .send-btn:disabled {
          background: var(--color-surface-muted);
          color: #cbd5e1;
          box-shadow: none;
          cursor: not-allowed;
        }

        @media (max-width: 640px) {
          .chat-conversation {
            padding: 1.25rem 0.9rem 1.5rem;
            gap: 1.1rem;
          }
          .chat-welcome {
            padding: 2.5rem 0.5rem 2rem;
          }
          .chat-msg {
            gap: 0.6rem;
          }
          .chat-msg-user .msg-main {
            max-width: 100%;
          }
          .chat-input-note {
            display: none;
          }
          .chat-input-footer {
            justify-content: flex-end;
            padding: 0.3rem 0.5rem 0.5rem;
          }
        }
      `}</style>
    </div>
  );
}
