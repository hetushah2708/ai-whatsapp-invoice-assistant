import { useState, useEffect } from "react";
import { Sparkles, Bell, ChevronDown, User } from "lucide-react";
 
export default function Navbar() {
  const [now, setNow] = useState(new Date());
 
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(t);
  }, []);
 
  const greeting = () => {
    const h = now.getHours();
    if (h < 12) return "Good morning";
    if (h < 17) return "Good afternoon";
    return "Good evening";
  };
 
  const dateStr = now.toLocaleDateString("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
 
  return (
    <>
      <style>{`
       
 
        .nb-root {
          --accent: #6366f1;
          --accent-dim: rgba(99,102,241,0.1);
          --border: rgba(255,255,255,0.07);
          --surface: rgba(255,255,255,0.03);
          --surface-2: rgba(255,255,255,0.055);
          --text-primary: #f4f4f5;
          --text-secondary: #71717a;
          --text-tertiary: #3f3f46;
          --green: #10b981;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        }
 
        .nb-bar {
          background: rgba(10,10,11,0.92);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border-bottom: 1px solid var(--border);
          padding: 0 28px;
          height: 62px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          position: sticky;
          top: 0;
          z-index: 50;
        }
 
        /* subtle top-edge highlight */
        .nb-bar::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent 0%, rgba(99,102,241,0.35) 40%, rgba(99,102,241,0.15) 70%, transparent 100%);
          pointer-events: none;
        }
 
        /* Left */
        .nb-left {
          display: flex;
          flex-direction: column;
          gap: 2px;
          min-width: 0;
        }
 
        .nb-greeting {
          display: flex;
          align-items: center;
          gap: 7px;
        }
 
        .nb-greeting-text {
          font-family: var(--display);
          font-size: 15px;
          font-weight: 600;
          color: var(--text-primary);
          letter-spacing: -0.01em;
          white-space: nowrap;
        }
 
        .nb-sparkle {
          color: #818cf8;
          flex-shrink: 0;
        }
 
        .nb-sub {
          font-family: var(--mono);
          font-size: 10.5px;
          color: var(--text-tertiary);
          letter-spacing: 0.03em;
          white-space: nowrap;
        }
 
        /* Right */
        .nb-right {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-shrink: 0;
        }
 
        /* Date chip */
        .nb-date {
          font-family: var(--mono);
          font-size: 11px;
          color: var(--text-secondary);
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 8px;
          padding: 5px 12px;
          white-space: nowrap;
        }
 
        /* AI status */
        .nb-ai-status {
          display: flex;
          align-items: center;
          gap: 7px;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 10px;
          padding: 6px 12px;
          white-space: nowrap;
          transition: border-color 0.15s;
        }
 
        .nb-ai-status:hover {
          border-color: rgba(99,102,241,0.25);
        }
 
        .nb-status-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: var(--green);
          box-shadow: 0 0 6px rgba(16,185,129,0.5);
          flex-shrink: 0;
          animation: nb-pulse 2.5s ease-in-out infinite;
        }
 
        @keyframes nb-pulse {
          0%,100% { opacity: 1; }
          50% { opacity: 0.35; }
        }
 
        .nb-ai-label {
          font-family: var(--mono);
          font-size: 11px;
          color: var(--green);
          letter-spacing: 0.02em;
        }
 
        .nb-ai-model {
          font-family: var(--mono);
          font-size: 10px;
          color: var(--text-tertiary);
          margin-left: 2px;
        }
 
        /* Icon button */
        .nb-icon-btn {
          width: 34px;
          height: 34px;
          border-radius: 9px;
          background: var(--surface);
          border: 1px solid var(--border);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: var(--text-secondary);
          transition: background 0.15s, border-color 0.15s, color 0.15s;
          flex-shrink: 0;
          position: relative;
        }
 
        .nb-icon-btn:hover {
          background: var(--surface-2);
          border-color: rgba(255,255,255,0.12);
          color: var(--text-primary);
        }
 
        .nb-notif-dot {
          position: absolute;
          top: 6px;
          right: 6px;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--accent);
          border: 1.5px solid #0a0a0b;
        }
 
        /* Profile */
        .nb-profile {
          display: flex;
          align-items: center;
          gap: 8px;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 10px;
          padding: 5px 10px 5px 6px;
          cursor: pointer;
          transition: background 0.15s, border-color 0.15s;
        }
 
        .nb-profile:hover {
          background: var(--surface-2);
          border-color: rgba(255,255,255,0.1);
        }
 
        .nb-avatar {
          width: 26px;
          height: 26px;
          border-radius: 7px;
          background: var(--accent-dim);
          border: 1px solid rgba(99,102,241,0.22);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #818cf8;
          flex-shrink: 0;
        }
 
        .nb-profile-name {
          font-size: 12.5px;
          font-weight: 500;
          color: var(--text-primary);
          white-space: nowrap;
        }
 
        .nb-chevron {
          color: var(--text-tertiary);
        }
 
        /* Divider */
        .nb-sep {
          width: 1px;
          height: 20px;
          background: var(--border);
          flex-shrink: 0;
        }
 
        @media (max-width: 640px) {
          .nb-bar { padding: 0 16px; height: 56px; }
          .nb-date { display: none; }
          .nb-profile-name, .nb-chevron { display: none; }
          .nb-profile { padding: 5px 6px; }
          .nb-ai-model { display: none; }
        }
      `}</style>
 
      <div className="nb-root">
        <div className="nb-bar">
 
          {/* Left — greeting + subtitle */}
          <div className="nb-left">
            <div className="nb-greeting">
              <Sparkles size={14} strokeWidth={2} className="nb-sparkle" />
              <span className="nb-greeting-text">{greeting()}, Admin</span>
            </div>
            <span className="nb-sub">AI Invoice Processing Dashboard</span>
          </div>
 
          {/* Right — controls */}
          <div className="nb-right">
 
            {/* Date */}
            <span className="nb-date">{dateStr}</span>
 
            <div className="nb-sep" />
 
            {/* AI model status */}
            <div className="nb-ai-status">
              <div className="nb-status-dot" />
              <span className="nb-ai-label">Ollama AI</span>
              <span className="nb-ai-model">· online</span>
            </div>
 
            <div className="nb-sep" />
 
            {/* Notifications */}
            <div className="nb-icon-btn" title="Notifications">
              <Bell size={15} strokeWidth={1.8} />
              <div className="nb-notif-dot" />
            </div>
 
            {/* Profile */}
            <div className="nb-profile">
              <div className="nb-avatar">
                <User size={13} strokeWidth={1.8} />
              </div>
              <span className="nb-profile-name">Admin</span>
              <ChevronDown size={12} strokeWidth={2} className="nb-chevron" />
            </div>
 
          </div>
        </div>
      </div>
    </>
  );
}