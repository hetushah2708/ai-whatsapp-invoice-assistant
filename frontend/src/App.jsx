import { useEffect, useState } from "react";

import axios from "axios";

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

      const response = await axios.get(
        "http://127.0.0.1:8000/invoices"
      );

      setInvoices(response.data);

    } catch (error) {
      

      console.error(error);

    }

  };


  const handleUpload = async () => {

    if (!file) return;

    const formData = new FormData();

    formData.append("file", file);

    setLoading(true);

    try {

      const response = await axios.post(
        "http://127.0.0.1:8000/upload",
        formData
      );

      setResponse(response.data);

      fetchInvoices();

      setLoading(false);

    } catch (error) {
       setLoading(false);

      console.error("Upload Error:", error);

    }

  };

  const handleDelete = async (invoiceId) => {

  try {

    await axios.delete(

      `http://127.0.0.1:8000/invoices/${invoiceId}`

    );

    fetchInvoices();

  } catch (error) {

    console.error("Delete Error:", error);

  }

};


  return (

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

  );
}

export default App;