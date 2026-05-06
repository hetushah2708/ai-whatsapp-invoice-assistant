export default function UploadCard({
  file,
  setFile,
  handleUpload,
  response,
}) {

  return (

    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">

      <h2 className="text-2xl font-semibold text-white mb-6">

        Upload Invoice

      </h2>

      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
        className="mb-4 block w-full text-sm text-zinc-400"
      />

      <button
        onClick={handleUpload}
        className="w-full bg-indigo-600 hover:bg-indigo-500 transition py-3 rounded-xl font-semibold text-white"
      >
        Upload Invoice
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