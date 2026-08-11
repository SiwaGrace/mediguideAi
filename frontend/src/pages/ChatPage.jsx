import React, { useState, useRef, useEffect } from 'react';
import EmergencyBar from '../components/EmergencyBar';

export default function ChatPage({ setCurrentPage }) {
  const [messages, setMessages] = useState([
    {
      id: "greeting",
      sender: "bot",
      text: "Hello! I am MediGuide AI, your healthcare guidance assistant. Please describe your symptoms or health questions (for example: malaria prevention, pregnancy care, hypertension, or headache self-care) and I will provide guidance, urgency triage, and point you to local clinics. How can I help you today?",
      urgency: "Low",
      title: "Welcome to MediGuide AI",
      recommendations: [],
      followUpQuestions: [],
      suggestedActions: ["Find Nearby Clinics", "Learn about Malaria"],
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const messagesEndRef = useRef(null);

  // Auto scroll to bottom when messages list changes
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend) => {
    const text = textToSend.trim();
    if (!text) return;

    // 1. Add user message to UI
    const userMsg = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: text,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMsg]);
    setInputText("");
    setIsLoading(true);

    // 2. Prepare history for API
    // Map current chat bubbles to {role, content} format
    const historyPayload = messages
      .filter(m => m.id !== "greeting") // omit welcome greeting
      .map(m => ({
        role: m.sender === "user" ? "user" : "assistant",
        content: m.sender === "user" ? m.text : `${m.title ? m.title + "\n" : ""}${m.text}`
      }));

    try {
      // 3. Request FastAPI server
      const response = await fetch("http://127.0.0.1:8008/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: text,
          history: historyPayload
        })
      });

      if (!response.ok) {
        throw new Error("Server response error");
      }

      const data = await response.json();

      // 4. Add bot response to UI
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
      // Offline fallback indicator
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
    if (inputText.trim() && !isLoading) {
      handleSendMessage(inputText);
    }
  };

  const handleSuggestedAction = (actionText) => {
    // Check if it's navigation action
    if (actionText.toLowerCase().includes("clinic") || actionText.toLowerCase().includes("er")) {
      setCurrentPage("clinics");
    } else if (actionText.toLowerCase().includes("malaria") || actionText.toLowerCase().includes("hypertension") || actionText.toLowerCase().includes("headache") || actionText.toLowerCase().includes("pregnancy")) {
      setCurrentPage("library");
    } else {
      // Otherwise feed it back into chat as user message
      handleSendMessage(actionText);
    }
  };

  const renderUrgencyBadge = (urgency) => {
    if (!urgency) return null;
    let className = "badge-low";
    let icon = "🟢";
    if (urgency === "Medium") {
      className = "badge-medium";
      icon = "🟡";
    } else if (urgency === "High") {
      className = "badge-high";
      icon = "🔴";
    }

    return (
      <span className={`badge ${className} urgency-badge`}>
        <span className="urgency-badge-icon">{icon}</span>
        {urgency} Urgency
      </span>
    );
  };

  return (
    <div className="chat-page-container fade-in">
      <EmergencyBar onAction={() => setCurrentPage("clinics")} />

      <div className="chat-window-wrapper">
        <div className="chat-messages-container">
          {messages.map((msg) => {
            const isUser = msg.sender === "user";
            const isHighUrgency = !isUser && msg.urgency === "High";

            return (
              <div
                key={msg.id}
                className={`message-bubble-wrapper ${isUser ? 'align-right' : 'align-left'}`}
              >
                {!isUser && renderUrgencyBadge(msg.urgency)}
                
                <div className={`message-bubble ${isUser ? 'bubble-user' : 'bubble-bot'} ${isHighUrgency ? 'bubble-high-urgency' : ''}`}>
                  {isHighUrgency && (
                    <div className="high-urgency-header">
                      <span className="er-pulse">🚨</span>
                      <span>CRITICAL HEALTH WARNING</span>
                    </div>
                  )}

                  {!isUser && msg.title && <h4 className="message-title">{msg.title}</h4>}
                  
                  <div className="message-text">{msg.text}</div>

                  {!isUser && msg.recommendations && msg.recommendations.length > 0 && (
                    <div className="message-details-section">
                      <h5>Recommendations:</h5>
                      <ul className="rec-list">
                        {msg.recommendations.map((rec, index) => (
                          <li key={index}>📌 {rec}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {!isUser && msg.followUpQuestions && msg.followUpQuestions.length > 0 && (
                    <div className="message-details-section">
                      <h5>Follow-up Questions (Please reply if relevant):</h5>
                      <ul className="followup-list">
                        {msg.followUpQuestions.map((q, index) => (
                          <li key={index}>❓ {q}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {!isUser && msg.suggestedActions && msg.suggestedActions.length > 0 && (
                  <div className="suggested-actions-container">
                    {msg.suggestedActions.map((action, index) => (
                      <button
                        key={index}
                        className="btn btn-outline btn-suggested-action"
                        onClick={() => handleSuggestedAction(action)}
                      >
                        {action}
                      </button>
                    ))}
                  </div>
                )}
                
                <span className="message-time">
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            );
          })}

          {isLoading && (
            <div className="message-bubble-wrapper align-left">
              <div className="message-bubble bubble-bot typing-indicator-bubble">
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <form className="chat-input-bar" onSubmit={handleFormSubmit}>
          <input
            type="text"
            className="input-field chat-text-input"
            placeholder="Type symptoms or health questions (e.g. malaria testing, chest pain)..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            disabled={isLoading}
            maxLength={300}
          />
          <button 
            type="submit" 
            className="btn btn-primary chat-send-btn" 
            disabled={!inputText.trim() || isLoading}
          >
            Send
            <svg className="send-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </button>
        </form>
      </div>

      <style>{`
        .chat-page-container {
          display: flex;
          flex-direction: column;
          height: calc(100vh - 75px); /* Fit window below navbar */
          overflow: hidden;
        }
        .chat-window-wrapper {
          flex: 1;
          display: flex;
          flex-direction: column;
          background-color: #f1f5f9;
          border-left: 1px solid var(--color-border);
          border-right: 1px solid var(--color-border);
          max-width: 800px;
          width: 100%;
          margin: 0 auto;
          overflow: hidden;
        }
        .chat-messages-container {
          flex: 1;
          overflow-y: auto;
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        .message-bubble-wrapper {
          display: flex;
          flex-direction: column;
          max-width: 75%;
          animation: fadeIn 0.2s ease-out;
        }
        .align-left {
          align-self: flex-start;
          align-items: flex-start;
        }
        .align-right {
          align-self: flex-end;
          align-items: flex-end;
        }
        
        .urgency-badge {
          margin-bottom: 0.35rem;
          font-size: 0.7rem;
        }
        
        .message-bubble {
          padding: 1rem 1.25rem;
          border-radius: var(--radius-lg);
          font-size: 0.95rem;
          line-height: 1.5;
          box-shadow: var(--shadow-sm);
        }
        
        .bubble-user {
          background-color: var(--color-primary);
          color: white;
          border-bottom-right-radius: 4px;
        }
        
        .bubble-bot {
          background-color: var(--color-surface);
          color: var(--color-text);
          border: 1px solid var(--color-border);
          border-bottom-left-radius: 4px;
        }
        
        /* High Urgency Chat Bubble warning styling */
        .bubble-high-urgency {
          background-color: var(--urgency-high-bg);
          border: 2px solid var(--urgency-high-text) !important;
          color: var(--urgency-high-text) !important;
          box-shadow: 0 0 10px var(--urgency-high-glow);
          animation: pulseGlow 2s infinite ease-in-out;
        }
        
        .high-urgency-header {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-weight: 800;
          font-size: 0.8rem;
          letter-spacing: 0.05em;
          margin-bottom: 0.75rem;
          border-bottom: 1px solid var(--urgency-high-border);
          padding-bottom: 0.4rem;
        }
        .er-pulse {
          font-size: 1.15rem;
          animation: pulse-dot 1s infinite alternate;
        }
        
        @keyframes pulseGlow {
          0% { box-shadow: 0 0 5px var(--urgency-high-glow); }
          50% { box-shadow: 0 0 15px var(--urgency-high-glow); }
          100% { box-shadow: 0 0 5px var(--urgency-high-glow); }
        }
        
        .message-title {
          font-weight: 700;
          font-size: 1.05rem;
          color: var(--color-primary);
          margin-bottom: 0.5rem;
        }
        .bubble-high-urgency .message-title {
          color: var(--urgency-high-text);
        }
        
        .message-text {
          white-space: pre-line;
        }
        
        .message-details-section {
          margin-top: 1rem;
          border-top: 1px solid var(--color-border);
          padding-top: 0.75rem;
          font-size: 0.875rem;
        }
        .bubble-high-urgency .message-details-section {
          border-top-color: var(--urgency-high-border);
        }
        .message-details-section h5 {
          font-weight: 700;
          margin-bottom: 0.4rem;
        }
        .rec-list, .followup-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
        }
        .rec-list li, .followup-list li {
          line-height: 1.4;
        }
        
        .suggested-actions-container {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
          margin-top: 0.5rem;
          width: 100%;
        }
        .btn-suggested-action {
          padding: 0.4rem 0.85rem;
          font-size: 0.8rem;
          border-radius: 9999px;
          background-color: var(--color-surface);
          border-color: var(--color-border);
          color: var(--color-primary);
        }
        .btn-suggested-action:hover {
          background-color: var(--color-primary-light);
          border-color: var(--color-primary);
        }
        
        .message-time {
          font-size: 0.7rem;
          color: var(--color-text-muted);
          margin-top: 0.25rem;
          align-self: flex-end;
        }
        .align-left .message-time {
          align-self: flex-start;
        }
        
        /* Typing Indicator dots */
        .typing-indicator-bubble {
          padding: 0.75rem 1rem;
          border-radius: 16px;
        }
        .typing-indicator {
          display: flex;
          align-items: center;
          gap: 4px;
          height: 1.25rem;
        }
        .typing-indicator span {
          width: 6px;
          height: 6px;
          background-color: var(--color-text-muted);
          border-radius: 50%;
          display: inline-block;
          animation: typingDot 1.4s infinite ease-in-out both;
        }
        .typing-indicator span:nth-child(1) { animation-delay: -0.32s; }
        .typing-indicator span:nth-child(2) { animation-delay: -0.16s; }
        
        @keyframes typingDot {
          0%, 80%, 100% { transform: scale(0); }
          40% { transform: scale(1); }
        }
        
        /* Input Bar styling */
        .chat-input-bar {
          background-color: var(--color-surface);
          border-top: 1px solid var(--color-border);
          padding: 1rem;
          display: flex;
          gap: 0.75rem;
        }
        .chat-text-input {
          flex: 1;
        }
        .chat-send-btn {
          border-radius: var(--radius-md);
        }
        .send-icon {
          width: 0.95rem;
          height: 0.95rem;
        }
        
        @media (max-width: 640px) {
          .chat-messages-container {
            padding: 1rem;
            gap: 1rem;
          }
          .message-bubble-wrapper {
            max-width: 90%;
          }
          .chat-input-bar {
            padding: 0.75rem;
          }
        }
      `}</style>
    </div>
  );
}
