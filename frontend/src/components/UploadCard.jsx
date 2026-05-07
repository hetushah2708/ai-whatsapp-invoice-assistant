import { useState, useRef } from "react";
import {
  Upload,
  FileText,
  Image,
  Sparkles,
  CheckCircle2,
  Building2,
  Hash,
  IndianRupee,
  Activity,
  Loader2,
  CloudUpload,
  X,
} from "lucide-react";
 
export default function UploadCard({
  file,
  setFile,
  handleUpload,
  response,
  loading,
}) {
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef(null);
 
  const getFileType = (filename) => {
    const ext = filename?.split(".").pop()?.toLowerCase();
    if (ext === "pdf") return "pdf";
    if (["jpg", "jpeg", "png", "webp"].includes(ext)) return "image";
    return "other";
  };
 
  const handleDragOver = (e) => {
    e.preventDefault();
    setDragging(true);
  };
 
  const handleDragLeave = () => setDragging(false);
 
  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const dropped = e.dataTransfer.files[0];
    if (dropped) setFile(dropped);
  };
 
  const clearFile = (e) => {
    e.stopPropagation();
    setFile(null);
    if (inputRef.current) inputRef.current.value = "";
  };
 
  const parseResponse = (resp) => {
    if (!resp) return null;
    try {
      const data =
        resp.structured_data
          ? (typeof resp.structured_data === "string"
              ? JSON.parse(resp.structured_data)
              : resp.structured_data)
          : resp;
      return data;
    } catch {
      return resp;
    }
  };
 
  const parsed = parseResponse(response);
  const fileType = file ? getFileType(file.name) : null;
 
  const uploadState = loading ? "uploading" : response ? "success" : "idle";
 
  return (
    <>
      <style>{`
        
 
        .uc-root {
          --accent: #6366f1;
          --accent-mid: rgba(99,102,241,0.18);
          --accent-dim: rgba(99,102,241,0.08);
          --accent-glow: 0 0 24px rgba(99,102,241,0.18);
          --green: #10b981;
          --green-dim: rgba(16,185,129,0.1);
          --border: rgba(255,255,255,0.07);
          --border-hover: rgba(99,102,241,0.45);
          --surface: rgba(255,255,255,0.03);
          --surface-2: rgba(255,255,255,0.055);
          --text-primary: #f4f4f5;
          --text-secondary: #a1a1aa;
          --text-tertiary: #52525b;
          --mono: 'DM Mono', monospace;
          --display: 'Syne', sans-serif;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        }
 
        .uc-card {
          background: #0c0c0d;
          border: 1px solid var(--border);
          border-radius: 20px;
          padding: 28px;
          box-shadow:
            0 0 0 1px rgba(255,255,255,0.04) inset,
            0 32px 64px -16px rgba(0,0,0,0.5);
        }
 
        .uc-header {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 24px;
        }
 
        .uc-header-icon {
          width: 34px;
          height: 34px;
          border-radius: 9px;
          background: var(--accent-dim);
          border: 1px solid rgba(99,102,241,0.22);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #818cf8;
        }
 
        .uc-title {
          font-family: var(--display);
          font-size: 17px;
          font-weight: 600;
          color: var(--text-primary);
          margin: 0;
          letter-spacing: -0.01em;
        }
 
        /* Drop zone */
        .uc-dropzone {
          border: 1.5px dashed var(--border-hover);
          border-radius: 16px;
          padding: 40px 24px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          background: var(--surface);
          transition: border-color 0.2s, background 0.2s, box-shadow 0.2s;
          position: relative;
          margin-bottom: 16px;
          outline: none;
        }
 
        .uc-dropzone:hover,
        .uc-dropzone.dragging {
          border-color: var(--accent);
          background: var(--accent-dim);
          box-shadow: var(--accent-glow);
        }
 
        .uc-dropzone.dragging {
          box-shadow: 0 0 40px rgba(99,102,241,0.25);
        }
 
        .uc-drop-icon-wrap {
          width: 56px;
          height: 56px;
          border-radius: 16px;
          background: var(--accent-mid);
          border: 1px solid rgba(99,102,241,0.25);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #818cf8;
          margin-bottom: 16px;
          transition: transform 0.2s;
        }
 
        .uc-dropzone:hover .uc-drop-icon-wrap,
        .uc-dropzone.dragging .uc-drop-icon-wrap {
          transform: translateY(-3px);
        }
 
        .uc-drop-title {
          font-size: 14px;
          font-weight: 500;
          color: var(--text-primary);
          margin: 0 0 6px;
        }
 
        .uc-drop-sub {
          font-size: 12.5px;
          color: var(--text-tertiary);
          margin: 0;
        }
 
        .uc-drop-formats {
          display: flex;
          gap: 6px;
          margin-top: 14px;
        }
 
        .uc-format-pill {
          font-family: var(--mono);
          font-size: 10px;
          padding: 3px 9px;
          border-radius: 6px;
          background: var(--surface-2);
          border: 1px solid var(--border);
          color: var(--text-tertiary);
          letter-spacing: 0.04em;
        }
 
        /* File preview */
        .uc-file-preview {
          display: flex;
          align-items: center;
          gap: 12px;
          background: var(--surface-2);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 12px 14px;
          margin-bottom: 16px;
          animation: fadeSlideIn 0.2s ease;
        }
 
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
 
        .uc-file-icon {
          width: 36px;
          height: 36px;
          border-radius: 9px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
 
        .uc-file-icon.pdf {
          background: rgba(239,68,68,0.1);
          border: 1px solid rgba(239,68,68,0.18);
          color: #f87171;
        }
 
        .uc-file-icon.image {
          background: rgba(56,189,248,0.08);
          border: 1px solid rgba(56,189,248,0.18);
          color: #38bdf8;
        }
 
        .uc-file-icon.other {
          background: var(--surface);
          border: 1px solid var(--border);
          color: var(--text-secondary);
        }
 
        .uc-file-info { flex: 1; min-width: 0; }
 
        .uc-file-name {
          font-size: 13px;
          font-weight: 500;
          color: var(--text-primary);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
 
        .uc-file-meta {
          font-family: var(--mono);
          font-size: 11px;
          color: var(--text-tertiary);
          margin-top: 2px;
        }
 
        .uc-file-clear {
          width: 28px;
          height: 28px;
          border-radius: 8px;
          background: none;
          border: 1px solid var(--border);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-tertiary);
          cursor: pointer;
          transition: background 0.15s, color 0.15s;
          flex-shrink: 0;
        }
 
        .uc-file-clear:hover {
          background: rgba(244,63,94,0.1);
          border-color: rgba(244,63,94,0.2);
          color: #fb7185;
        }
 
        /* Upload button */
        .uc-btn {
          width: 100%;
          padding: 12px;
          border-radius: 12px;
          border: none;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: opacity 0.15s, transform 0.1s, box-shadow 0.2s;
          font-family: inherit;
          letter-spacing: -0.01em;
        }
 
        .uc-btn.idle {
          background: var(--accent);
          color: #fff;
          box-shadow: 0 2px 12px rgba(99,102,241,0.35);
        }
 
        .uc-btn.idle:hover {
          opacity: 0.88;
          transform: translateY(-1px);
          box-shadow: 0 4px 20px rgba(99,102,241,0.45);
        }
 
        .uc-btn.idle:active { transform: scale(0.98); }
 
        .uc-btn.uploading {
          background: rgba(99,102,241,0.18);
          color: #818cf8;
          cursor: not-allowed;
          border: 1px solid rgba(99,102,241,0.2);
        }
 
        .uc-btn.success {
          background: var(--green-dim);
          color: var(--green);
          border: 1px solid rgba(16,185,129,0.2);
          cursor: not-allowed;
        }
 
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        .uc-spin { animation: spin 0.9s linear infinite; }
 
        /* AI response */
        .uc-response {
          margin-top: 24px;
          animation: fadeSlideIn 0.3s ease;
        }
 
        .uc-response-header {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 16px;
        }
 
        .uc-response-title {
          font-family: var(--display);
          font-size: 14px;
          font-weight: 600;
          color: var(--text-primary);
          margin: 0;
        }
 
        .uc-success-pill {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-size: 11px;
          font-weight: 500;
          padding: 3px 10px;
          border-radius: 20px;
          background: var(--green-dim);
          color: var(--green);
          border: 1px solid rgba(16,185,129,0.18);
          margin-left: auto;
          font-family: var(--mono);
        }
 
        .uc-fields {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
        }
 
        @media (max-width: 480px) {
          .uc-fields { grid-template-columns: 1fr; }
        }
 
        .uc-field {
          background: var(--surface-2);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 14px 16px;
          transition: border-color 0.15s;
        }
 
        .uc-field:hover { border-color: rgba(255,255,255,0.12); }
 
        .uc-field-header {
          display: flex;
          align-items: center;
          gap: 7px;
          margin-bottom: 8px;
        }
 
        .uc-field-icon {
          width: 22px;
          height: 22px;
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
 
        .uc-field-label {
          font-family: var(--mono);
          font-size: 10.5px;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: var(--text-tertiary);
        }
 
        .uc-field-value {
          font-size: 14px;
          font-weight: 500;
          color: var(--text-primary);
          word-break: break-word;
          line-height: 1.4;
        }
 
        .uc-field-value.amount {
          font-family: var(--mono);
          font-size: 16px;
          color: var(--green);
          letter-spacing: -0.02em;
        }
 
        .uc-field-value.muted {
          color: var(--text-tertiary);
          font-style: italic;
          font-size: 13px;
        }
 
        /* Processing loader */
        .uc-loader {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 40px 24px;
          gap: 14px;
        }
 
        .uc-loader-ring {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          border: 2px solid var(--accent-mid);
          border-top-color: var(--accent);
          animation: spin 0.9s linear infinite;
        }
 
        .uc-loader-text {
          font-size: 13px;
          color: var(--text-secondary);
        }
 
        .uc-loader-sub {
          font-family: var(--mono);
          font-size: 11px;
          color: var(--text-tertiary);
          text-align: center;
          max-width: 200px;
        }
 
        /* Raw fallback */
        .uc-raw {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 14px;
          font-family: var(--mono);
          font-size: 11.5px;
          color: var(--text-secondary);
          overflow: auto;
          max-height: 200px;
          white-space: pre-wrap;
          margin-top: 10px;
        }
 
        .uc-divider {
          height: 1px;
          background: var(--border);
          margin: 20px 0;
        }
      `}</style>
 
      <div className="uc-root">
        <div className="uc-card">
 
          {/* Header */}
          <div className="uc-header">
            <div className="uc-header-icon">
              <Sparkles size={16} strokeWidth={1.8} />
            </div>
            <h2 className="uc-title">Upload Invoice</h2>
          </div>
 
          {/* Drop zone */}
          <label
            className={`uc-dropzone${dragging ? " dragging" : ""}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <div className="uc-drop-icon-wrap">
              <CloudUpload size={26} strokeWidth={1.6} />
            </div>
            <p className="uc-drop-title">
              {dragging ? "Drop it here" : "Drag & drop your invoice"}
            </p>
            <p className="uc-drop-sub">or click to browse files</p>
            <div className="uc-drop-formats">
              <span className="uc-format-pill">PDF</span>
              <span className="uc-format-pill">JPG</span>
              <span className="uc-format-pill">PNG</span>
              <span className="uc-format-pill">WEBP</span>
            </div>
            <input
              ref={inputRef}
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
              className="hidden"
            />
          </label>
 
          {/* File preview */}
          {file && (
            <div className="uc-file-preview">
              <div className={`uc-file-icon ${fileType}`}>
                {fileType === "pdf" ? (
                  <FileText size={18} strokeWidth={1.8} />
                ) : (
                  <Image size={18} strokeWidth={1.8} />
                )}
              </div>
              <div className="uc-file-info">
                <div className="uc-file-name">{file.name}</div>
                <div className="uc-file-meta">
                  {(file.size / 1024).toFixed(1)} KB · {fileType.toUpperCase()}
                </div>
              </div>
              <button className="uc-file-clear" onClick={clearFile} title="Remove file">
                <X size={13} strokeWidth={2} />
              </button>
            </div>
          )}
 
          {/* Upload button */}
          <button
            onClick={handleUpload}
            disabled={loading}
            className={`uc-btn ${uploadState}`}
          >
            {uploadState === "uploading" && (
              <>
                <Loader2 size={16} strokeWidth={2} className="uc-spin" />
                Processing Invoice…
              </>
            )}
            {uploadState === "success" && (
              <>
                <CheckCircle2 size={16} strokeWidth={2} />
                Extracted Successfully
              </>
            )}
            {uploadState === "idle" && (
              <>
                <Upload size={16} strokeWidth={2} />
                Upload Invoice
              </>
            )}
          </button>
 
          {/* AI processing loader */}
          {loading && (
            <div className="uc-loader">
              <div className="uc-loader-ring" />
              <span className="uc-loader-text">AI is reading your invoice</span>
              <span className="uc-loader-sub">Extracting GST fields, vendor details & amounts…</span>
            </div>
          )}
 
          {/* AI extraction result */}
          {response && !loading && (
            <div className="uc-response">
              <div className="uc-divider" />
              <div className="uc-response-header">
                <Sparkles size={14} strokeWidth={2} color="#818cf8" />
                <p className="uc-response-title">AI Extraction</p>
                <span className="uc-success-pill">
                  <CheckCircle2 size={10} strokeWidth={2.5} />
                  Complete
                </span>
              </div>
 
              {parsed && typeof parsed === "object" ? (
                <div className="uc-fields">
 
                  <div className="uc-field">
                    <div className="uc-field-header">
                      <div className="uc-field-icon" style={{ background: "rgba(99,102,241,0.1)", color: "#818cf8" }}>
                        <Building2 size={13} strokeWidth={2} />
                      </div>
                      <span className="uc-field-label">Vendor</span>
                    </div>
                    <div className={`uc-field-value ${!parsed.vendor_name ? "muted" : ""}`}>
                      {parsed.vendor_name || "Not detected"}
                    </div>
                  </div>
 
                  <div className="uc-field">
                    <div className="uc-field-header">
                      <div className="uc-field-icon" style={{ background: "rgba(56,189,248,0.08)", color: "#38bdf8" }}>
                        <Hash size={13} strokeWidth={2} />
                      </div>
                      <span className="uc-field-label">Invoice #</span>
                    </div>
                    <div className={`uc-field-value ${!parsed.invoice_number ? "muted" : ""}`}>
                      {parsed.invoice_number || "Not detected"}
                    </div>
                  </div>
 
                  <div className="uc-field">
                    <div className="uc-field-header">
                      <div className="uc-field-icon" style={{ background: "rgba(16,185,129,0.1)", color: "#10b981" }}>
                        <IndianRupee size={13} strokeWidth={2} />
                      </div>
                      <span className="uc-field-label">Total Amount</span>
                    </div>
                    <div className={`uc-field-value amount ${!parsed.total_amount ? "muted" : ""}`}>
                      {parsed.total_amount ? `₹${parsed.total_amount}` : "—"}
                    </div>
                  </div>
 
                  <div className="uc-field">
                    <div className="uc-field-header">
                      <div className="uc-field-icon" style={{ background: "rgba(251,191,36,0.08)", color: "#fbbf24" }}>
                        <Activity size={13} strokeWidth={2} />
                      </div>
                      <span className="uc-field-label">Status</span>
                    </div>
                    <div className="uc-field-value">
                      {parsed.status || response.status || "Processed"}
                    </div>
                  </div>
 
                </div>
              ) : (
                <pre className="uc-raw">{JSON.stringify(response, null, 2)}</pre>
              )}
 
            </div>
          )}
 
        </div>
      </div>
    </>
  );
}