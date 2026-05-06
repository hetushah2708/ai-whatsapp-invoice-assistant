export default function InvoiceTable({ invoices }) {

  return (

    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">

      <div className="flex items-center justify-between mb-6">

        <h2 className="text-2xl font-semibold text-white">

          Invoice History

        </h2>

        <span className="text-zinc-500 text-sm">

          {invoices.length} invoices

        </span>

      </div>

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead>

            <tr className="border-b border-zinc-800 text-zinc-500 text-left">

              <th className="pb-4">ID</th>
              <th className="pb-4">Filename</th>
              <th className="pb-4">Status</th>
              <th className="pb-4">AI Output</th>

            </tr>

          </thead>

          <tbody>

            {invoices.map((invoice) => (

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

                  {(() => {

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

                    );
                  })()}

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>

  );
}