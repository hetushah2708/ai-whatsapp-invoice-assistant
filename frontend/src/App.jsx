import { useEffect, useState } from "react";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import Dashboard from "./pages/Dashboard";

function App() {

  const [invoices, setInvoices] = useState([]);
  const [file, setFile] = useState(null);
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {

    fetchInvoices();

  }, []);

  const fetchInvoices = async () => {

    try {

      const res = await axios.get(
        "http://127.0.0.1:8000/invoices"
      );

      setInvoices(res.data);

    } catch (error) {

      console.error(error);

      toast.error("Failed to load invoices.", {
        id: "fetch-error"
      });

    }

  };

  const handleUpload = async () => {

    if (!file || loading) {

      toast.error("Please select a file first.");

      return;

    }

    const formData = new FormData();

    formData.append("file", file);

    setLoading(true);

    const toastId = toast.loading(
      "Processing invoice with AI..."
    );

    try {

      const res = await axios.post(
        "http://127.0.0.1:8000/upload",
        formData
      );

      setResponse(res.data);

      setFile(null);

      await fetchInvoices();

      toast.success(
        "Invoice processed successfully.",
        {
          id: toastId
        }
      );

    } catch (error) {

      console.error("Upload Error:", error);

      toast.error(
        "Upload failed. Please try again.",
        {
          id: toastId
        }
      );

    } finally {

      setLoading(false);

    }

  };

  const handleDelete = async (invoiceId) => {

    const toastId = toast.loading(
      "Deleting invoice..."
    );

    try {

      await axios.delete(
        `http://127.0.0.1:8000/invoices/${invoiceId}`
      );

      await fetchInvoices();

      toast.success(
        "Invoice deleted.",
        {
          id: toastId
        }
      );

    } catch (error) {

      console.error("Delete Error:", error);

      toast.error(
        "Failed to delete invoice.",
        {
          id: toastId
        }
      );

    }

  };

  return (

    <>

      <Toaster
        position="bottom-right"
        gutter={10}
        toastOptions={{
          duration: 4000,
          style: {
            background: "#111113",
            color: "#f4f4f5",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "12px",
            fontSize: "13px",
            fontWeight: "500",
            padding: "12px 16px",
            boxShadow:
              "0 8px 32px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.04) inset",
            fontFamily:
              "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
            maxWidth: "340px",
          },

          success: {
            duration: 3500,
            iconTheme: {
              primary: "#10b981",
              secondary: "#111113",
            },
            style: {
              background: "#111113",
              border:
                "1px solid rgba(16,185,129,0.2)",
            },
          },

          error: {
            duration: 5000,
            iconTheme: {
              primary: "#f43f5e",
              secondary: "#111113",
            },
            style: {
              background: "#111113",
              border:
                "1px solid rgba(244,63,94,0.2)",
            },
          },

          loading: {
            iconTheme: {
              primary: "#6366f1",
              secondary: "#111113",
            },
            style: {
              background: "#111113",
              border:
                "1px solid rgba(99,102,241,0.2)",
            },
          },

        }}
      />

      <Dashboard
        invoices={invoices}
        file={file}
        setFile={setFile}
        handleUpload={handleUpload}
        response={response}
        loading={loading}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        handleDelete={handleDelete}
      />

    </>

  );

}

export default App;