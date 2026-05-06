import { useEffect, useState } from "react";
import api from "./api/axios";

function App() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [invoices, setInvoices] = useState([]);

  // Upload Invoice
  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);

      const res = await api.post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setResponse(res.data);

      // Refresh invoice table
      fetchInvoices();

    } catch (error) {
      console.error("Upload Error:", error);

    } finally {
      setLoading(false);
    }
  };

  // Fetch All Invoices
  const fetchInvoices = async () => {
    try {
      const res = await api.get("/invoices");
      setInvoices(res.data);

    } catch (error) {
      console.error("Fetch Error:", error);
    }
  };

  // Run Once On Page Load
  useEffect(() => {
    fetchInvoices();
  }, []);

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <div className="max-w-7xl mx-auto p-8">

        {/* Heading */}
        <h1 className="text-5xl font-bold mb-8">
          AI Invoice Dashboard
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* Upload Card */}
          <div className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800">
            <h2 className="text-2xl font-semibold mb-4">
              Upload Invoice
            </h2>

            <input
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
              className="mb-4 block w-full text-sm"
            />

            <button
              onClick={handleUpload}
              disabled={loading}
              className="bg-white text-black px-4 py-2 rounded-xl font-medium hover:bg-zinc-200 transition disabled:opacity-50"
            >
              {loading ? "Processing..." : "Upload"}
            </button>

            {/* Upload Response */}
            {response && (
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-2">
                  AI Response
                </h3>

                <div className="bg-zinc-800 p-4 rounded-xl text-sm overflow-auto">
                  <pre className="whitespace-pre-wrap">
                    {JSON.stringify(response, null, 2)}
                  </pre>
                </div>
              </div>
            )}
          </div>

          {/* Invoice Table */}
          <div className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800 md:col-span-2">
            <h2 className="text-2xl font-semibold mb-4">
              Invoice History
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full text-left">

                <thead>
                  <tr className="border-b border-zinc-700 text-zinc-400">
                    <th className="py-3 pr-4">ID</th>
                    <th className="py-3 pr-4">Filename</th>
                    <th className="py-3 pr-4">Status</th>
                    <th className="py-3">AI Output</th>
                  </tr>
                </thead>

                <tbody>
                  {invoices.length > 0 ? (
                    invoices.map((invoice) => (
                      <tr
                        key={invoice.id}
                        className="border-b border-zinc-800"
                      >
                        <td className="py-4 pr-4">
                          {invoice.id}
                        </td>

                        <td className="py-4 pr-4">
                          {invoice.filename}
                        </td>

                        <td className="py-4 pr-4">
                          <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm">
                            {invoice.status}
                          </span>
                        </td>

                        <td className="py-4 text-zinc-400 max-w-md">
                          <pre className="whitespace-pre-wrap text-xs overflow-auto">
                            {typeof invoice.structured_data === "object"
                              ? JSON.stringify(invoice.structured_data, null, 2)
                              : invoice.structured_data}
                          </pre>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="4"
                        className="py-6 text-center text-zinc-500"
                      >
                        No invoices found
                      </td>
                    </tr>
                  )}
                </tbody>

              </table>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default App;