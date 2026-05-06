function App() {

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

            <button className="bg-white text-black px-4 py-2 rounded-xl font-medium hover:bg-zinc-200 transition">

              Upload

            </button>

          </div>

          <div className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800 md:col-span-2">

            <h2 className="text-2xl font-semibold mb-4">
              Invoice Overview
            </h2>

            <p className="text-zinc-400">
              Processed invoices will appear here.
            </p>

          </div>

        </div>

      </div>

    </div>
  )
}

export default App