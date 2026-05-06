export default function StatsCards({ invoices }) {

  return (

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">

        <p className="text-zinc-500 text-sm">
          Total Invoices
        </p>

        <h2 className="text-4xl font-bold text-white mt-2">
          {invoices.length}
        </h2>

      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">

        <p className="text-zinc-500 text-sm">
          Processed
        </p>

        <h2 className="text-4xl font-bold text-green-400 mt-2">

          {
            invoices.filter(
              (invoice) => invoice.status === "processed"
            ).length
          }

        </h2>

      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">

        <p className="text-zinc-500 text-sm">
          AI Engine
        </p>

        <h2 className="text-3xl font-bold text-indigo-400 mt-2">
          TinyLlama
        </h2>

      </div>

    </div>

  );
}