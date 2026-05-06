import { useState } from "react";

import api from "./api/axios";


function App() {

  const [file, setFile] = useState(null);

  const [loading, setLoading] = useState(false);

  const [response, setResponse] = useState(null);


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

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);
    }
  };


  return (

    <div className="min-h-screen bg-zinc-950 text-white">

      <div className="max-w-7xl mx-auto p-8">

        <h1 className="text-5xl font-bold mb-8">
          AI Invoice Dashboard
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          <div className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800">

            <h2 className="text-2xl font-semibold mb-4">
              Upload Invoice
            </h2>

            <input
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
              className="mb-4 block"
            />

            <button
              onClick={handleUpload}
              className="bg-white text-black px-4 py-2 rounded-xl font-medium hover:bg-zinc-200 transition"
            >

              {loading ? "Processing..." : "Upload"}

            </button>

          </div>

          <div className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800 md:col-span-2">

            <h2 className="text-2xl font-semibold mb-4">
              AI Response
            </h2>

            <pre className="text-sm text-zinc-300 whitespace-pre-wrap">

              {response
                ? JSON.stringify(response, null, 2)
                : "No invoice processed yet."}

            </pre>

          </div>

        </div>

      </div>

    </div>
  )
}

export default App