import { X, FileText, ImageIcon, Download, MessageCircle, ExternalLink } from "lucide-react";
 
export default function InvoicePreviewModal({ invoice, onClose }) {
  if (!invoice) return null;
 
  let data = {};
  try {
    data =
      typeof invoice.structured_data === "string"
        ? JSON.parse(invoice.structured_data)
        : invoice.structured_data;
  } catch {
    data = {};
  }
 
  const fileUrl = `http://127.0.0.1:8000/uploads/${invoice.filename}`;
  const isPdf = invoice.filename.toLowerCase().endsWith(".pdf");
 
  // ── Action handlers ───────────────────────────────────────────────────────
 
  function handleDownload() {
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = invoice.filename;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.click();
  }
 
  function handleWhatsApp() {
    const vendor = data.vendor_name || "N/A";
    const invoiceNo = data.invoice_number || "N/A";
    const amount = data.total_amount || "0";
    const message = `Invoice Processed Successfully%0AVendor: ${encodeURIComponent(vendor)}%0AInvoice: ${encodeURIComponent(invoiceNo)}%0AAmount: ₹${encodeURIComponent(amount)}%0A%0AGenerated using InvoiceAI`;
    window.open(`https://wa.me/?text=${message}`, "_blank", "noopener,noreferrer");
  }
 
  // ── Render ────────────────────────────────────────────────────────────────
 
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(12px)" }}
    >
      <div
        className="w-full max-w-6xl rounded-3xl overflow-hidden shadow-2xl"
        style={{
          background: "linear-gradient(160deg, #0f0f11 0%, #0a0a0c 100%)",
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow:
            "0 0 0 1px rgba(255,255,255,0.04), 0 32px 80px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.06)",
        }}
      >
        {/* ── HEADER ────────────────────────────────────────────────────── */}
        <div
          className="flex items-center justify-between px-6 py-4"
          style={{
            borderBottom: "1px solid rgba(255,255,255,0.07)",
            background:
              "linear-gradient(90deg, rgba(99,102,241,0.06) 0%, transparent 60%)",
          }}
        >
          {/* Title */}
          <div className="flex items-center gap-3">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{
                background: "rgba(99,102,241,0.12)",
                border: "1px solid rgba(99,102,241,0.25)",
              }}
            >
              {isPdf ? (
                <FileText size={16} className="text-indigo-400" />
              ) : (
                <ImageIcon size={16} className="text-indigo-400" />
              )}
            </div>
            <div>
              <h2 className="text-[15px] font-semibold text-white leading-tight">
                Invoice Preview
              </h2>
              <p className="text-zinc-500 text-[11px] mt-0.5 truncate max-w-[260px]">
                {invoice.filename}
              </p>
            </div>
          </div>
 
          {/* Action buttons */}
          <div className="flex items-center gap-2">
            {/* Download */}
            <button
              onClick={handleDownload}
              title="Download Invoice"
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-[12px] font-medium text-zinc-300 hover:text-white transition-all duration-200"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.09)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(99,102,241,0.15)";
                e.currentTarget.style.borderColor = "rgba(99,102,241,0.35)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.09)";
              }}
            >
              <Download size={14} />
              <span className="hidden sm:inline">Download</span>
            </button>
 
            {/* WhatsApp Share */}
            <button
              onClick={handleWhatsApp}
              title="Share via WhatsApp"
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-[12px] font-medium text-emerald-300 hover:text-emerald-200 transition-all duration-200"
              style={{
                background: "rgba(34,197,94,0.08)",
                border: "1px solid rgba(34,197,94,0.2)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(34,197,94,0.16)";
                e.currentTarget.style.borderColor = "rgba(34,197,94,0.4)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(34,197,94,0.08)";
                e.currentTarget.style.borderColor = "rgba(34,197,94,0.2)";
              }}
            >
              <MessageCircle size={14} />
              <span className="hidden sm:inline">WhatsApp</span>
            </button>
 
            {/* Open in new tab */}
            <a
              href={fileUrl}
              target="_blank"
              download
              rel="noopener noreferrer"
              title="Open in new tab"
              className="w-9 h-9 rounded-xl flex items-center justify-center text-zinc-400 hover:text-white transition-all duration-200"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.09)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.04)";
              }}
            >
              <ExternalLink size={14} />
            </a>
 
            {/* Close */}
            <button
              onClick={onClose}
              title="Close"
              className="w-9 h-9 rounded-xl flex items-center justify-center text-zinc-400 hover:text-white transition-all duration-200"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(239,68,68,0.12)";
                e.currentTarget.style.borderColor = "rgba(239,68,68,0.3)";
                e.currentTarget.style.color = "#f87171";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
                e.currentTarget.style.color = "";
              }}
            >
              <X size={16} />
            </button>
          </div>
        </div>
 
        {/* ── CONTENT ───────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2">
 
          {/* LEFT — File preview */}
          <div
            className="min-h-[600px] flex items-center justify-center p-5"
            style={{
              borderRight: "1px solid rgba(255,255,255,0.06)",
              background:
                "radial-gradient(ellipse at 50% 50%, rgba(99,102,241,0.04) 0%, transparent 70%)",
            }}
          >
            {isPdf ? (
              <iframe
                src={fileUrl}
                title="PDF Preview"
                className="w-full h-[580px] rounded-2xl"
                style={{ border: "1px solid rgba(255,255,255,0.08)" }}
              />
            ) : (
              <img
                src={fileUrl}
                alt="Invoice"
                className="max-h-[580px] rounded-2xl object-contain"
                style={{ border: "1px solid rgba(255,255,255,0.08)" }}
              />
            )}
          </div>
 
          {/* RIGHT — Extracted data */}
          <div className="p-7 space-y-5 overflow-y-auto max-h-[680px]">
 
            {/* Section heading */}
            <div className="flex items-center gap-3 mb-1">
              <div
                className="w-11 h-11 rounded-2xl flex items-center justify-center"
                style={{
                  background: "rgba(99,102,241,0.1)",
                  border: "1px solid rgba(99,102,241,0.22)",
                }}
              >
                {isPdf ? (
                  <FileText size={20} className="text-indigo-400" />
                ) : (
                  <ImageIcon size={20} className="text-indigo-400" />
                )}
              </div>
              <div>
                <h3 className="text-white font-semibold text-base">
                  AI Extracted Data
                </h3>
                <p className="text-zinc-500 text-xs mt-0.5">
                  Structured invoice intelligence
                </p>
              </div>
            </div>
 
            {/* Data cards */}
            {[
              {
                label: "Vendor Name",
                value: data.vendor_name || "Not Found",
                valueClass: "text-white text-[17px] font-semibold",
              },
              {
                label: "Invoice Number",
                value: data.invoice_number || "Not Found",
                valueClass: "text-white text-[17px] font-semibold",
              },
              {
                label: "Total Amount",
                value: `₹${data.total_amount || "0"}`,
                valueClass: "text-emerald-400 text-2xl font-bold",
              },
            ].map(({ label, value, valueClass }) => (
              <div
                key={label}
                className="rounded-2xl p-5 transition-all duration-200"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.07)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.11)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.03)";
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)";
                }}
              >
                <p className="text-zinc-500 text-xs mb-2 uppercase tracking-widest font-medium">
                  {label}
                </p>
                <p className={valueClass}>{value}</p>
              </div>
            ))}
 
            {/* Status card */}
            <div
              className="rounded-2xl p-5 transition-all duration-200"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              <p className="text-zinc-500 text-xs mb-3 uppercase tracking-widest font-medium">
                Processing Status
              </p>
              <span
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium"
                style={{
                  background: "rgba(34,197,94,0.1)",
                  border: "1px solid rgba(34,197,94,0.2)",
                  color: "#4ade80",
                }}
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                </span>
                {invoice.status}
              </span>
            </div>
 
            {/* Quick-share footer strip */}
            <div
              className="rounded-2xl p-4 flex items-center justify-between gap-3 mt-2"
              style={{
                background:
                  "linear-gradient(135deg, rgba(99,102,241,0.08) 0%, rgba(139,92,246,0.06) 100%)",
                border: "1px solid rgba(99,102,241,0.15)",
              }}
            >
              <p className="text-zinc-400 text-xs leading-snug">
                Share or download this invoice instantly.
              </p>
              <div className="flex gap-2 shrink-0">
                <button
                  onClick={handleDownload}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[11px] font-medium text-indigo-300 hover:text-white transition-all duration-200"
                  style={{
                    background: "rgba(99,102,241,0.15)",
                    border: "1px solid rgba(99,102,241,0.3)",
                  }}
                >
                  <Download size={12} />
                  Download
                </button>
                <button
                  onClick={handleWhatsApp}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[11px] font-medium text-emerald-300 hover:text-white transition-all duration-200"
                  style={{
                    background: "rgba(34,197,94,0.1)",
                    border: "1px solid rgba(34,197,94,0.25)",
                  }}
                >
                  <MessageCircle size={12} />
                  WhatsApp
                </button>
              </div>
            </div>
 
          </div>
        </div>
      </div>
    </div>
  );
}