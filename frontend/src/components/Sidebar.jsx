import { useState } from "react";
import {
  LayoutDashboard,
  ReceiptText,
  BarChart2,
  Settings,
  Sparkles,
  Zap,
  ChevronRight,
  User,
} from "lucide-react";
 
const NAV_ITEMS = [
  { id: "dashboard", label: "Dashboard",  icon: LayoutDashboard },
  { id: "invoices",  label: "Invoices",   icon: ReceiptText     },
  { id: "analytics", label: "Analytics",  icon: BarChart2       },
  { id: "settings",  label: "Settings",   icon: Settings        },
];
 
export default function Sidebar() {
  const [active, setActive] = useState("dashboard");
 
  return (
    <>
      <style>{`
       
 
        .sb-root {
          --accent: #6366f1;
          --accent-dim: rgba(99,102,241,0.12);
          --accent-glow: rgba(99,102,241,0.18);
          --border: rgba(255,255,255,0.07);
          --surface: rgba(255,255,255,0.03);
          --surface-2: rgba(255,255,255,0.055);
          --text-primary: #f4f4f5;
          --text-secondary: #71717a;
          --text-tertiary: #3f3f46;
          --mono: 'DM Mono', monospace;
          --display: 'Syne', sans-serif;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        }
 
        .sb-wrap {
          width: 240px;
          min-height: 100vh;
          background: #0a0a0b;
          border-right: 1px solid var(--border);
          display: flex;
          flex-direction: column;
          padding: 20px 14px;
          position: relative;
          flex-shrink: 0;
        }
 
        /* Subtle top-left glow */
        .sb-wrap::before {
          content: '';
          position: absolute;
          top: 0; left: 0;
          width: 180px; height: 180px;
          background: radial-gradient(ellipse at top left, rgba(99,102,241,0.08) 0%, transparent 70%);
          pointer-events: none;
          border-radius: 0 0 100% 0;
        }
 
        /* Logo */
        .sb-logo {
          display: flex;
          align-items: center;
          gap: 9px;
          padding: 6px 8px 20px;
          border-bottom: 1px solid var(--border);
          margin-bottom: 20px;
        }
 
        .sb-logo-mark {
          width: 30px;
          height: 30px;
          border-radius: 8px;
          background: var(--accent);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          box-shadow: 0 2px 10px rgba(99,102,241,0.4);
          flex-shrink: 0;
        }
 
        .sb-logo-text {
          font-family: var(--display);
          font-size: 16px;
          font-weight: 700;
          color: var(--text-primary);
          letter-spacing: -0.02em;
        }
 
        .sb-logo-text span {
          color: #818cf8;
        }
 
        /* Section label */
        .sb-section-label {
          font-family: var(--mono);
          font-size: 9.5px;
          font-weight: 500;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--text-tertiary);
          padding: 0 8px;
          margin-bottom: 6px;
        }
 
        /* Nav */
        .sb-nav {
          display: flex;
          flex-direction: column;
          gap: 2px;
          flex: 1;
        }
 
        .sb-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 9px 10px;
          border-radius: 10px;
          cursor: pointer;
          border: none;
          background: none;
          width: 100%;
          text-align: left;
          transition: background 0.15s, color 0.15s;
          position: relative;
          color: var(--text-secondary);
          font-size: 13.5px;
          font-weight: 500;
          font-family: inherit;
        }
 
        .sb-item:hover {
          background: var(--surface-2);
          color: var(--text-primary);
        }
 
        .sb-item.active {
          background: var(--accent-dim);
          color: #a5b4fc;
          border: 1px solid rgba(99,102,241,0.16);
        }
 
        .sb-item.active::before {
          content: '';
          position: absolute;
          left: -14px;
          top: 50%;
          transform: translateY(-50%);
          width: 3px;
          height: 60%;
          background: var(--accent);
          border-radius: 0 2px 2px 0;
        }
 
        .sb-item-icon {
          width: 30px;
          height: 30px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: background 0.15s;
        }
 
        .sb-item:not(.active) .sb-item-icon {
          background: var(--surface);
        }
 
        .sb-item.active .sb-item-icon {
          background: rgba(99,102,241,0.18);
          color: #818cf8;
        }
 
        .sb-item-arrow {
          margin-left: auto;
          opacity: 0;
          transition: opacity 0.15s, transform 0.15s;
          color: var(--text-tertiary);
        }
 
        .sb-item:hover .sb-item-arrow,
        .sb-item.active .sb-item-arrow {
          opacity: 1;
          transform: translateX(2px);
        }
 
        .sb-item.active .sb-item-arrow {
          color: #6366f1;
        }
 
        /* Divider */
        .sb-divider {
          height: 1px;
          background: var(--border);
          margin: 16px 0;
        }
 
        /* Status badge */
        .sb-status {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 12px;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 10px;
          margin-bottom: 16px;
        }
 
        .sb-status-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #10b981;
          flex-shrink: 0;
          box-shadow: 0 0 6px rgba(16,185,129,0.5);
          animation: sb-pulse 2.5s ease-in-out infinite;
        }
 
        @keyframes sb-pulse {
          0%,100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
 
        .sb-status-text {
          font-family: var(--mono);
          font-size: 10.5px;
          color: #10b981;
          letter-spacing: 0.03em;
        }
 
        .sb-status-badge {
          margin-left: auto;
          font-family: var(--mono);
          font-size: 9px;
          padding: 2px 7px;
          border-radius: 20px;
          background: rgba(16,185,129,0.1);
          color: #10b981;
          border: 1px solid rgba(16,185,129,0.18);
          letter-spacing: 0.04em;
        }
 
        /* Profile */
        .sb-profile {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 10px;
          border-radius: 12px;
          border: 1px solid var(--border);
          background: var(--surface);
          cursor: pointer;
          transition: background 0.15s, border-color 0.15s;
          margin-top: auto;
        }
 
        .sb-profile:hover {
          background: var(--surface-2);
          border-color: rgba(255,255,255,0.1);
        }
 
        .sb-avatar {
          width: 32px;
          height: 32px;
          border-radius: 8px;
          background: var(--accent-dim);
          border: 1px solid rgba(99,102,241,0.22);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #818cf8;
          flex-shrink: 0;
        }
 
        .sb-profile-info { flex: 1; min-width: 0; }
 
        .sb-profile-name {
          font-size: 12.5px;
          font-weight: 500;
          color: var(--text-primary);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
 
        .sb-profile-role {
          font-family: var(--mono);
          font-size: 10px;
          color: var(--text-secondary);
          margin-top: 1px;
        }
 
        .sb-profile-settings {
          color: var(--text-tertiary);
          transition: color 0.15s;
        }
 
        .sb-profile:hover .sb-profile-settings {
          color: var(--text-secondary);
        }
 
        @media (max-width: 768px) {
          .sb-wrap {
            width: 64px;
            padding: 16px 10px;
          }
          .sb-logo-text,
          .sb-section-label,
          .sb-item span,
          .sb-item-arrow,
          .sb-status-text,
          .sb-status-badge,
          .sb-profile-info,
          .sb-profile-settings {
            display: none;
          }
          .sb-logo { justify-content: center; padding-bottom: 16px; }
          .sb-item { justify-content: center; padding: 10px; }
          .sb-item.active::before { display: none; }
          .sb-profile { justify-content: center; padding: 10px; }
          .sb-status { justify-content: center; padding: 10px; }
        }
      `}</style>
 
      <div className="sb-root">
        <div className="sb-wrap">
 
          {/* Logo */}
          <div className="sb-logo">
            <div className="sb-logo-mark">
              <Sparkles size={15} strokeWidth={2} />
            </div>
            <span className="sb-logo-text">
              Invoice<span>AI</span>
            </span>
          </div>
 
          {/* Status */}
          <div className="sb-status">
            <div className="sb-status-dot" />
            <span className="sb-status-text">AI Online</span>
            <span className="sb-status-badge">v2.0</span>
          </div>
 
          {/* Nav */}
          <p className="sb-section-label">Menu</p>
          <nav className="sb-nav">
            {NAV_ITEMS.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActive(id)}
                className={`sb-item${active === id ? " active" : ""}`}
              >
                <span className="sb-item-icon">
                  <Icon size={15} strokeWidth={1.9} />
                </span>
                <span>{label}</span>
                <ChevronRight size={13} strokeWidth={2} className="sb-item-arrow" />
              </button>
            ))}
          </nav>
 
          <div className="sb-divider" />
 
          {/* Profile */}
          <div className="sb-profile">
            <div className="sb-avatar">
              <User size={15} strokeWidth={1.8} />
            </div>
            <div className="sb-profile-info">
              <div className="sb-profile-name">Admin</div>
              <div className="sb-profile-role">AI Invoice Platform</div>
            </div>
            <Settings size={13} strokeWidth={1.8} className="sb-profile-settings" />
          </div>
 
        </div>
      </div>
    </>
  );
}