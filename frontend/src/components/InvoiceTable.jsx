export default function InvoiceTable({
  invoices,
  searchTerm,
  setSearchTerm,
  handleDelete,
}) {

  const filteredInvoices = invoices.filter((invoice) => {

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

  return (

    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">

      <div className="flex items-center justify-between mb-6 gap-4">

        <h2 className="text-2xl font-semibold text-white">

          Invoice History

        </h2>

        <input
          type="text"
          placeholder="Search invoices..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-2 text-white outline-none focus:border-indigo-500 w-64"
        />

      </div>

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead>

            <tr className="border-b border-zinc-800 text-zinc-500 text-left">

              <th className="pb-4">ID</th>
              <th className="pb-4">Filename</th>
              <th className="pb-4">Status</th>
              <th className="pb-4">AI Output</th>
              <th className="pb-4 text-right">Actions</th>

              

            </tr>

          </thead>

          <tbody>

            {filteredInvoices.map((invoice) => {

              let data = {};

              try {

                data =
                  typeof invoice.structured_data === "string"
                    ? JSON.parse(invoice.structured_data)
                    : invoice.structured_data;

              } catch {

                data = {};

              }

              return (

                <tr
                  key={invoice.id}
                  className="border-b border-zinc-800 hover:bg-zinc-800/30 transition"
                >

                  <td className="py-6 text-white">

                    {invoice.id}

                  </td>

                  <td className="py-6 text-white">

                    {invoice.filename}

                  </td>

                  <td className="py-6">

                    <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm">

                      {invoice.status}

                    </span>

                  </td>

                  <td className="py-6">

                    <div className="space-y-2 text-sm">

                      <div>

                        <span className="text-zinc-500">

                          Vendor:

                        </span>

                        <span className="ml-2 text-white">

                          {data.vendor_name || "Not Found"}

                        </span>

                      </div>

                      <div>

                        <span className="text-zinc-500">

                          Invoice:

                        </span>

                        <span className="ml-2 text-white">

                          {data.invoice_number || "Not Found"}

                        </span>

                      </div>

                      <div>

                        <span className="text-zinc-500">

                          Amount:

                        </span>

                        <span className="ml-2 text-green-400 font-semibold">

                          ${data.total_amount || "0"}

                        </span>

                      </div>

                    </div>

                  </td>

                  <td className="py-6 text-right">

  <button
    onClick={() => handleDelete(invoice.id)}
    className="bg-red-500/20 hover:bg-red-500/30 text-red-400 px-4 py-2 rounded-xl transition"
  >

    Delete

  </button>

</td>

                </tr>

              );

            })}

          </tbody>

        </table>

      </div>

    </div>

  );
}