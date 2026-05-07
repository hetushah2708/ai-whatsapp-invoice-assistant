import { useEffect, useState, useRef } from "react";
import {
  FileText,
  Upload,
  Image,
  Building2,
  IndianRupee,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Clock,
  Zap,
  Activity,
} from "lucide-react";

// ─── Helpers ────────────────────────────────────────────────────────────────

function timeAgo(dateStr) {

  const date = new Date(dateStr);

  if (isNaN(date)) return "just now";

  const diff = Math.floor((Date.now() - date) / 1000);

  if (diff < 60) return `${diff}s ago`;

  if (diff < 3600) {
    return `${Math.floor(diff / 60)}m ago`;
  }

  if (diff < 86400) {
    return `${Math.floor(diff / 3600)}h ago`;
  }

  return `${Math.floor(diff / 86400)}d ago`;

}

function parseStructuredData(inv) {

  try {

    return typeof inv.structured_data === "string"
      ? JSON.parse(inv.structured_data || "{}")
      : inv.structured_data || {};

  } catch {

    return {};

  }

}

function generateActivities(invoices) {

  if (!invoices || invoices.length === 0) return [];

  const activities = [];

  const sorted = [...invoices].sort(

    (a, b) =>
      new Date(
        b.createdAt ?? b.date ?? Date.now()
      ) -
      new Date(
        a.createdAt ?? a.date ?? Date.now()
      )

  );

  sorted.slice(0, 8).forEach((inv) => {

    const data = parseStructuredData(inv);

    const filename = inv.filename?.toLowerCase() || "";

    const isPdf = filename.endsWith(".pdf");

    // Upload Activity
    activities.push({

      id: `${inv.id}-upload`,

      label: isPdf
        ? "PDF document uploaded"
        : "Invoice image processed",

      icon: isPdf ? Upload : Image,

      color: isPdf
        ? "text-blue-400"
        : "text-violet-400",

      dot: isPdf
        ? "bg-blue-400"
        : "bg-violet-400",

      glow: isPdf
        ? "shadow-blue-500/40"
        : "shadow-violet-500/40",

      badge: isPdf ? "PDF" : "OCR",

      badgeColor: isPdf
        ? "bg-blue-500/20 text-blue-300 border-blue-500/30"
        : "bg-violet-500/20 text-violet-300 border-violet-500/30",

      time:
        inv.createdAt ??
        inv.date ??
        new Date().toISOString(),

    });

    // AI Processing
    activities.push({

      id: `${inv.id}-processed`,

      label: `Invoice #${inv.id} processed`,

      icon: CheckCircle2,

      color: "text-emerald-400",

      dot: "bg-emerald-400",

      glow: "shadow-emerald-500/40",

      badge: "AI",

      badgeColor:
        "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",

      time:
        inv.createdAt ??
        inv.date ??
        new Date().toISOString(),

    });

    // Vendor Detection
    if (data.vendor_name) {

      activities.push({

        id: `${inv.id}-vendor`,

        label: `Vendor detected: ${data.vendor_name}`,

        icon: Building2,

        color: "text-amber-400",

        dot: "bg-amber-400",

        glow: "shadow-amber-500/40",

        badge: "NLP",

        badgeColor:
          "bg-amber-500/20 text-amber-300 border-amber-500/30",

        time:
          inv.createdAt ??
          inv.date ??
          new Date().toISOString(),

      });

    }

    // Revenue Extraction
    if (data.total_amount) {

      activities.push({

        id: `${inv.id}-revenue`,

        label: `Revenue extracted: ₹${data.total_amount}`,

        icon: IndianRupee,

        color: "text-teal-400",

        dot: "bg-teal-400",

        glow: "shadow-teal-500/40",

        badge: "EXT",

        badgeColor:
          "bg-teal-500/20 text-teal-300 border-teal-500/30",

        time:
          inv.createdAt ??
          inv.date ??
          new Date().toISOString(),

      });

    }

    // AI Extraction
    activities.push({

      id: `${inv.id}-ai`,

      label: "AI extraction successful",

      icon: Sparkles,

      color: "text-pink-400",

      dot: "bg-pink-400",

      glow: "shadow-pink-500/40",

      badge: "AI",

      badgeColor:
        "bg-pink-500/20 text-pink-300 border-pink-500/30",

      time:
        inv.createdAt ??
        inv.date ??
        new Date().toISOString(),

    });

  });

  return activities
    .sort(
      (a, b) =>
        new Date(b.time) - new Date(a.time)
    )
    .slice(0, 12);

}

// ─── Pulse Dot ──────────────────────────────────────────────────────────────

function PulseDot({ color }) {

  return (

    <span className="relative flex h-2.5 w-2.5 shrink-0 mt-[3px]">

      <span
        className={`animate-ping absolute inline-flex h-full w-full rounded-full ${color} opacity-60`}
      />

      <span
        className={`relative inline-flex rounded-full h-2.5 w-2.5 ${color}`}
      />

    </span>

  );

}

// ─── Empty State ────────────────────────────────────────────────────────────

function EmptyState() {

  return (

    <div className="flex flex-col items-center justify-center py-14 px-6 text-center">

      <div className="relative mb-5">

        <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">

          <Activity className="w-7 h-7 text-white/20" />

        </div>

        <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-zinc-900 border border-white/10 flex items-center justify-center">

          <Clock className="w-3 h-3 text-white/30" />

        </div>

      </div>

      <p className="text-white/50 text-sm font-medium tracking-wide mb-1">

        No activity yet

      </p>

      <p className="text-white/25 text-xs leading-relaxed max-w-[200px]">

        Upload your first invoice to start seeing AI processing events here.

      </p>

    </div>

  );

}

// ─── Activity Feed ──────────────────────────────────────────────────────────

export default function ActivityFeed({
  invoices = [],
}) {

  const [activities, setActivities] = useState([]);
  const [visible, setVisible] = useState(false);
  const [times, setTimes] = useState({});

  const containerRef = useRef(null);

  // Generate activities
  useEffect(() => {

    setActivities(
      generateActivities(invoices)
    );

  }, [invoices]);

  // Live timestamps
  useEffect(() => {

    const tick = () => {

      const map = {};

      activities.forEach((a) => {

        map[a.id] = timeAgo(a.time);

      });

      setTimes(map);

    };

    tick();

    const id = setInterval(
      tick,
      30000
    );

    return () => clearInterval(id);

  }, [activities]);

  // Entrance animation
  useEffect(() => {

    const obs = new IntersectionObserver(

      ([entry]) => {

        if (entry.isIntersecting) {

          setVisible(true);

        }

      },

      {
        threshold: 0.1,
      }

    );

    if (containerRef.current) {

      obs.observe(containerRef.current);

    }

    return () => obs.disconnect();

  }, []);

  return (

    <div
      ref={containerRef}
      className="
        relative flex flex-col
        rounded-2xl border border-white/[0.08]
        bg-white/[0.03] backdrop-blur-xl
        overflow-hidden
        transition-all duration-300
      "
      style={{
        background:
          "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.02) 100%)",
        boxShadow:
          "0 0 0 1px rgba(255,255,255,0.06), 0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06)",
      }}
    >

      {/* TOP ACCENT */}
      <div
        className="absolute top-0 left-8 right-8 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(139,92,246,0.5), rgba(59,130,246,0.5), transparent)",
        }}
      />

      {/* HEADER */}
      <div className="flex items-center justify-between px-5 pt-5 pb-4 border-b border-white/[0.06]">

        <div className="flex items-center gap-2.5">

          <div className="w-7 h-7 rounded-lg bg-violet-500/10 border border-violet-500/20 flex items-center justify-center">

            <Zap className="w-3.5 h-3.5 text-violet-400" />

          </div>

          <div>

            <h3 className="text-[13px] font-semibold text-white/90 tracking-tight">

              Activity Feed

            </h3>

            <p className="text-[11px] text-white/35 leading-none mt-0.5">

              Real-time AI events

            </p>

          </div>

        </div>

        <div className="flex items-center gap-2">

          {activities.length > 0 && (

            <span className="text-[11px] text-white/30 tabular-nums">

              {activities.length} events

            </span>

          )}

          <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">

            <span className="relative flex h-1.5 w-1.5">

              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />

              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />

            </span>

            <span className="text-[10px] font-medium text-emerald-400 tracking-wide uppercase">

              Live

            </span>

          </span>

        </div>

      </div>

      {/* FEED */}
      <div
        className="flex-1 overflow-y-auto px-2 py-2 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent"
        style={{
          maxHeight: 380,
        }}
      >

        {activities.length === 0 ? (

          <EmptyState />

        ) : (

          <ul className="space-y-0.5">

            {activities.map((activity, i) => {

              const Icon = activity.icon;

              const delay = visible
                ? `${i * 40}ms`
                : "0ms";

              return (

                <li
                  key={activity.id}
                  className="
                    group flex items-start gap-3 px-3 py-3 rounded-xl
                    hover:bg-white/[0.04] cursor-default
                    transition-all duration-200
                  "
                  style={{
                    opacity: visible ? 1 : 0,
                    transform: visible
                      ? "translateY(0)"
                      : "translateY(6px)",
                    transition:
                      `opacity 0.35s ease ${delay},
                      transform 0.35s ease ${delay},
                      background 0.2s`,
                  }}
                >

                  {/* ICON */}
                  <div
                    className={`
                      w-8 h-8 rounded-lg shrink-0 flex items-center justify-center
                      bg-white/[0.05] border border-white/[0.07]
                      group-hover:border-white/[0.12]
                      transition-all duration-200
                      shadow-sm ${activity.glow}
                    `}
                  >

                    <Icon
                      className={`w-3.5 h-3.5 ${activity.color}`}
                    />

                  </div>

                  {/* CONTENT */}
                  <div className="flex-1 min-w-0">

                    <div className="flex items-center gap-2 flex-wrap">

                      <p className="text-[12.5px] font-medium text-white/80 group-hover:text-white/95 transition-colors duration-200 truncate leading-snug">

                        {activity.label}

                      </p>

                      <span
                        className={`
                          shrink-0 text-[9px] font-semibold px-1.5 py-0.5
                          rounded border tracking-widest uppercase
                          ${activity.badgeColor}
                        `}
                      >

                        {activity.badge}

                      </span>

                    </div>

                    <p className="text-[11px] text-white/30 mt-0.5 flex items-center gap-1.5">

                      <Clock className="w-2.5 h-2.5 shrink-0" />

                      {times[activity.id] ??
                        timeAgo(activity.time)}

                    </p>

                  </div>

                  {/* PULSE */}
                  <PulseDot
                    color={activity.dot}
                  />

                </li>

              );

            })}

          </ul>

        )}

      </div>

      {/* FOOTER */}
      {activities.length > 0 && (

        <div className="px-5 py-3 border-t border-white/[0.05] flex items-center justify-between">

          <p className="text-[11px] text-white/25">

            Showing latest {activities.length} events

          </p>

          <div className="flex items-center gap-1 text-[11px] text-white/25">

            <AlertCircle className="w-3 h-3" />

            Auto-refreshes

          </div>

        </div>

      )}

    </div>

  );

}