export default function Sidebar() {

  return (

    <div className="w-64 bg-zinc-950 border-r border-zinc-800 min-h-screen p-6">

      <h1 className="text-3xl font-bold text-white mb-10">

        InvoiceAI

      </h1>

      <div className="space-y-4">

        <button className="w-full text-left bg-indigo-600 hover:bg-indigo-500 transition px-4 py-3 rounded-xl text-white font-medium">

          Dashboard

        </button>

        <button className="w-full text-left hover:bg-zinc-800 transition px-4 py-3 rounded-xl text-zinc-300">

          Invoices

        </button>

        <button className="w-full text-left hover:bg-zinc-800 transition px-4 py-3 rounded-xl text-zinc-300">

          Analytics

        </button>

        <button className="w-full text-left hover:bg-zinc-800 transition px-4 py-3 rounded-xl text-zinc-300">

          Settings

        </button>

      </div>

    </div>

  );
}