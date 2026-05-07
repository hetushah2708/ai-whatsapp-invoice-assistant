export default function UploadCard({
  file,
  setFile,
  handleUpload,
  response,
  loading,
}) {

  return (

    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">

      <h2 className="text-2xl font-semibold text-white mb-6">

        Upload Invoice

      </h2>

      <label
  className="border-2 border-dashed border-zinc-700 hover:border-indigo-500 transition rounded-2xl p-10 flex flex-col items-center justify-center cursor-pointer mb-6 bg-zinc-950"
>

  <div className="text-5xl mb-4">
    📄
  </div>

  <p className="text-zinc-300 font-medium">

    Drag & Drop Invoice

  </p>

  <p className="text-zinc-500 text-sm mt-2">

    or click to browse files

  </p>

  <input
    type="file"
    onChange={(e) => setFile(e.target.files[0])}
    className="hidden"
  />

</label>

{file && (

  <div className="mb-4 text-sm text-zinc-400">

    Selected File:
    <span className="ml-2 text-white">

      {file.name}

    </span>

  </div>

)}

      <button
  onClick={handleUpload}
  disabled={loading}
  className={`w-full py-3 rounded-xl font-semibold text-white transition
  ${
    loading
      ? "bg-zinc-700 cursor-not-allowed"
      : "bg-indigo-600 hover:bg-indigo-500"
  }`}
>

  {loading ? "Processing Invoice..." : "Upload Invoice"}

</button>


      {response && (

        <div className="mt-8">

          <h3 className="text-xl font-semibold text-white mb-4">

            AI Response

          </h3>

          <div className="bg-zinc-800 rounded-xl p-4 overflow-auto text-sm text-white">

            <pre className="whitespace-pre-wrap">

              {JSON.stringify(response, null, 2)}

            </pre>

          </div>

        </div>

      )}

    </div>

  );
}