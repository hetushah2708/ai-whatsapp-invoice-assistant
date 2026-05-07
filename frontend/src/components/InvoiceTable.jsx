import { useState } from "react";
import {
  Search,
  Download,
  Trash2,
  FileText,
  Image,
  ReceiptText,
  PackageOpen,
} from "lucide-react";

import InvoicePreviewModal from "./InvoicePreviewModal";

export default function InvoiceTable({
  invoices = [],
  searchTerm = "",
  setSearchTerm,
  handleDelete,
}) {

  const [deletingId, setDeletingId] = useState(null);
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  const filteredInvoices = (invoices || []).filter((invoice) => {

    let data = {};

    try {

      data =
        typeof invoice.structured_data === "string"
          ? JSON.parse(invoice.structured_data)
          : invoice.structured_data;

    } catch (error) {

      data = {};

    }

    return (

      invoice.filename
        .toLowerCase()
        .includes(searchTerm.toLowerCase())

      ||

      (data.invoice_number || "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase())

      ||

      (data.vendor_name || "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase())

    );

  });

  const handleDeleteWithAnimation = (id) => {

    setDeletingId(id);

    setTimeout(() => {

      handleDelete(id);

      setDeletingId(null);

    }, 300);

  };

  const getFileType = (filename) => {

    const ext = filename?.split(".").pop()?.toLowerCase();

    if (["pdf"].includes(ext)) return "pdf";

    if (["jpg", "jpeg", "png", "webp", "gif"].includes(ext)) {
      return "image";
    }

    return "other";

  };

  return (

    <>

      <style>{`

        .inv-root {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          --accent: #6366f1;
          --accent-dim: rgba(99,102,241,0.12);
          --surface: rgba(255,255,255,0.03);
          --surface-hover: rgba(255,255,255,0.055);
          --border: rgba(255,255,255,0.07);
          --text-primary: #f4f4f5;
          --text-secondary: #71717a;
          --text-tertiary: #52525b;
          --green: #10b981;
          --green-dim: rgba(16,185,129,0.1);
          --red: #f43f5e;
          --red-dim: rgba(244,63,94,0.08);
        }

        .inv-wrapper {
          background: #0c0c0d;
          border: 1px solid var(--border);
          border-radius: 20px;
          overflow: hidden;
          box-shadow:
            0 0 0 1px rgba(255,255,255,0.04) inset,
            0 32px 64px -16px rgba(0,0,0,0.6);
        }

        .inv-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 24px 28px 20px;
          border-bottom: 1px solid var(--border);
          background: rgba(255,255,255,0.015);
          gap: 16px;
          flex-wrap: wrap;
        }

        .inv-title-group {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .inv-icon-wrap {
          width: 34px;
          height: 34px;
          border-radius: 9px;
          background: var(--accent-dim);
          border: 1px solid rgba(99,102,241,0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--accent);
        }

        .inv-title {
          font-size: 17px;
          font-weight: 600;
          color: var(--text-primary);
          margin: 0;
        }

        .inv-count {
          font-size: 11px;
          color: var(--text-tertiary);
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 6px;
          padding: 2px 8px;
          margin-left: 4px;
        }

        .inv-controls {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
        }

        .inv-search-wrap {
          position: relative;
          display: flex;
          align-items: center;
        }

        .inv-search-icon {
          position: absolute;
          left: 12px;
          color: var(--text-tertiary);
          width: 15px;
          height: 15px;
        }

        .inv-search {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 10px;
          padding: 8px 14px 8px 36px;
          font-size: 13px;
          color: var(--text-primary);
          outline: none;
          width: 220px;
          transition: 0.2s;
        }

        .inv-search:focus {
          border-color: rgba(99,102,241,0.4);
          background: rgba(99,102,241,0.04);
          box-shadow: 0 0 0 3px rgba(99,102,241,0.08);
        }

        .inv-export-all {
          display: flex;
          align-items: center;
          gap: 7px;
          background: var(--accent);
          color: white;
          border-radius: 10px;
          padding: 8px 16px;
          font-size: 13px;
          text-decoration: none;
          transition: 0.2s;
        }

        .inv-export-all:hover {
          opacity: 0.9;
          transform: translateY(-1px);
        }

        .inv-table-scroll {
          overflow-x: auto;
        }

        .inv-table {
          width: 100%;
          border-collapse: collapse;
          min-width: 600px;
        }

        .inv-table thead th {
          padding: 14px 16px;
          font-size: 11px;
          color: var(--text-tertiary);
          text-transform: uppercase;
          text-align: left;
          border-bottom: 1px solid var(--border);
          background: rgba(255,255,255,0.015);
          position: sticky;
          top: 0;
        }

        .inv-table tbody tr {
          border-bottom: 1px solid var(--border);
          transition: background 0.2s;
        }

        .inv-table tbody tr:hover {
          background: var(--surface-hover);
        }

        .inv-table tbody tr.deleting {
          opacity: 0;
          transform: translateX(8px);
          transition: opacity 0.3s, transform 0.3s;
        }

        .inv-table td {
          padding: 18px 16px;
          vertical-align: middle;
        }

        .inv-id {
          font-size: 12px;
          color: var(--text-tertiary);
        }

        .inv-filename-wrap {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .inv-file-badge {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          font-size: 10px;
          padding: 4px 8px;
          border-radius: 6px;
        }

        .inv-file-badge.pdf {
          background: rgba(239,68,68,0.1);
          color: #f87171;
        }

        .inv-file-badge.image {
          background: rgba(56,189,248,0.1);
          color: #38bdf8;
        }

        .inv-filename {
          font-size: 13px;
          color: var(--text-primary);
          background: transparent;
          border: none;
          cursor: pointer;
        }

        .inv-status-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 12px;
          padding: 5px 10px;
          border-radius: 8px;
          background: var(--green-dim);
          color: var(--green);
        }

        .inv-ai-grid {
          display: grid;
          gap: 4px;
        }

        .inv-ai-label {
          font-size: 11px;
          color: var(--text-tertiary);
        }

        .inv-ai-value {
          font-size: 13px;
          color: var(--text-primary);
        }

        .inv-ai-amount {
          color: var(--green);
          font-weight: 600;
        }

        .inv-actions {
          display: flex;
          justify-content: flex-end;
          gap: 8px;
        }

        .inv-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          border-radius: 9px;
          padding: 7px 12px;
          font-size: 12px;
          transition: 0.2s;
          text-decoration: none;
          border: none;
          cursor: pointer;
        }

        .inv-btn-export {
          background: rgba(99,102,241,0.12);
          color: #818cf8;
        }

        .inv-btn-delete {
          background: rgba(244,63,94,0.08);
          color: #fb7185;
        }

        .inv-btn:hover {
          transform: translateY(-1px);
        }

        .inv-empty {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 72px 24px;
          text-align: center;
        }

        .inv-empty-title {
          font-size: 16px;
          color: var(--text-secondary);
        }

        .inv-empty-sub {
          font-size: 13px;
          color: var(--text-tertiary);
          max-width: 280px;
          line-height: 1.5;
        }

      `}</style>

      <div className="inv-root">

        <div className="inv-wrapper">

          {/* HEADER */}
          <div className="inv-header">

            <div className="inv-title-group">

              <div className="inv-icon-wrap">

                <ReceiptText size={16} />

              </div>

              <h2 className="inv-title">

                Invoice History

                <span className="inv-count">

                  {filteredInvoices.length}

                </span>

              </h2>

            </div>

            <div className="inv-controls">

              <div className="inv-search-wrap">

                <Search className="inv-search-icon" />

                <input
                  type="text"
                  placeholder="Search invoices..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="inv-search"
                />

              </div>

              <a
                href="http://127.0.0.1:8000/export/csv"
                target="_blank"
                rel="noreferrer"
                className="inv-export-all"
              >

                <Download size={14} />

                Export CSV

              </a>

            </div>

          </div>

          {/* TABLE */}
          <div className="inv-table-scroll">

            <table className="inv-table">

              <thead>

                <tr>

                  <th>ID</th>
                  <th>File</th>
                  <th>Status</th>
                  <th>AI Output</th>
                  <th style={{ textAlign: "right" }}>Actions</th>

                </tr>

              </thead>

              <tbody>

                {filteredInvoices.length > 0 ? (

                  filteredInvoices.map((invoice) => {

                    let data = {};

                    try {

                      data =
                        typeof invoice.structured_data === "string"
                          ? JSON.parse(invoice.structured_data)
                          : invoice.structured_data;

                    } catch {

                      data = {};

                    }

                    const fileType = getFileType(invoice.filename);

                    return (

                      <tr
                        key={invoice.id}
                        className={deletingId === invoice.id ? "deleting" : ""}
                      >

                        <td>

                          <span className="inv-id">

                            #{invoice.id}

                          </span>

                        </td>

                        <td>

                          <div className="inv-filename-wrap">

                            <span className={`inv-file-badge ${fileType}`}>

                              {fileType === "pdf" ? (
                                <FileText size={10} />
                              ) : (
                                <Image size={10} />
                              )}

                              {fileType.toUpperCase()}

                            </span>

                            <button
                              onClick={() => setSelectedInvoice(invoice)}
                              className="inv-filename hover:text-indigo-400 transition"
                            >

                              {invoice.filename}

                            </button>

                          </div>

                        </td>

                        <td>

                          <span className="inv-status-badge">

                            {invoice.status}

                          </span>

                        </td>

                        <td>

                          <div className="inv-ai-grid">

                            <span className="inv-ai-label">

                              Vendor

                            </span>

                            <span className="inv-ai-value">

                              {data.vendor_name || "—"}

                            </span>

                            <span className="inv-ai-label">

                              Invoice #

                            </span>

                            <span className="inv-ai-value">

                              {data.invoice_number || "—"}

                            </span>

                            <span className="inv-ai-label">

                              Amount

                            </span>

                            <span className="inv-ai-amount">

                              ₹{data.total_amount || "0"}

                            </span>

                          </div>

                        </td>

                        <td>

                          <div className="inv-actions">

                            <button
                              onClick={() => setSelectedInvoice(invoice)}
                              className="inv-btn"
                              style={{
                                background: "rgba(16,185,129,0.08)",
                                color: "#34d399",
                              }}
                            >

                              View

                            </button>

                            <a
                              href={`http://127.0.0.1:8000/export/csv/${invoice.id}`}
                              target="_blank"
                              rel="noreferrer"
                              className="inv-btn inv-btn-export"
                            >

                              <Download size={13} />

                              Export

                            </a>

                            <button
                              onClick={() =>
                                handleDeleteWithAnimation(invoice.id)
                              }
                              className="inv-btn inv-btn-delete"
                            >

                              <Trash2 size={13} />

                              Delete

                            </button>

                          </div>

                        </td>

                      </tr>

                    );

                  })

                ) : (

                  <tr>

                    <td colSpan={5} style={{ padding: 0 }}>

                      <div className="inv-empty">

                        <div style={{ marginBottom: "12px" }}>

                          <PackageOpen size={30} color="#52525b" />

                        </div>

                        <p className="inv-empty-title">

                          No invoices found

                        </p>

                        <p className="inv-empty-sub">

                          {searchTerm
                            ? `No results for "${searchTerm}".`
                            : "Upload your first invoice to start AI processing."}

                        </p>

                      </div>

                    </td>

                  </tr>

                )}

              </tbody>

            </table>

          </div>

        </div>

      </div>

      {selectedInvoice && (

        <InvoicePreviewModal
          invoice={selectedInvoice}
          onClose={() => setSelectedInvoice(null)}
        />

      )}

    </>

  );

}