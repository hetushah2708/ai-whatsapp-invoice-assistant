import {
  FileText,
  CheckCircle2,
  IndianRupee,
  TrendingUp,
  FileImage,
  FileSpreadsheet,
  Sparkles,
  Activity,
} from "lucide-react";

export default function StatsCards({ invoices }) {

  const totalInvoices = invoices.length;

  const processedInvoices = invoices.filter(
    (invoice) => invoice.status === "processed"
  ).length;

  let totalRevenue = 0;

  let pdfCount = 0;
  let imageCount = 0;

  invoices.forEach((invoice) => {

    try {

      const data =
        typeof invoice.structured_data === "string"
          ? JSON.parse(invoice.structured_data)
          : invoice.structured_data;

      const amount = parseFloat(
        String(data.total_amount || "0")
          .replace(/,/g, "")
          .replace(/[^\d.]/g, "")
      );

      if (!isNaN(amount)) {

        totalRevenue += amount;

      }

    } catch {

      // ignore parsing errors

    }

    const filename = invoice.filename.toLowerCase();

    if (filename.endsWith(".pdf")) {

      pdfCount++;

    } else {

      imageCount++;

    }

  });

  const successRate =
    totalInvoices > 0
      ? ((processedInvoices / totalInvoices) * 100).toFixed(0)
      : 0;

  const averageInvoice =
    totalInvoices > 0
      ? (totalRevenue / totalInvoices).toFixed(0)
      : 0;

  const cards = [
    {
      title: "Total Invoices",
      value: totalInvoices,
      icon: FileText,
      color: "text-blue-400",
      bg: "from-blue-500/10 to-blue-500/5",
    },
    {
      title: "Processed",
      value: processedInvoices,
      icon: CheckCircle2,
      color: "text-green-400",
      bg: "from-green-500/10 to-green-500/5",
    },
    {
      title: "Total Revenue",
      value: `₹${totalRevenue.toLocaleString()}`,
      icon: IndianRupee,
      color: "text-indigo-400",
      bg: "from-indigo-500/10 to-indigo-500/5",
    },
    {
      title: "Success Rate",
      value: `${successRate}%`,
      icon: TrendingUp,
      color: "text-yellow-400",
      bg: "from-yellow-500/10 to-yellow-500/5",
    },
    {
      title: "Average Invoice",
      value: `₹${averageInvoice}`,
      icon: Activity,
      color: "text-pink-400",
      bg: "from-pink-500/10 to-pink-500/5",
    },
    {
      title: "PDF Uploads",
      value: pdfCount,
      icon: FileSpreadsheet,
      color: "text-red-400",
      bg: "from-red-500/10 to-red-500/5",
    },
    {
      title: "Image Uploads",
      value: imageCount,
      icon: FileImage,
      color: "text-cyan-400",
      bg: "from-cyan-500/10 to-cyan-500/5",
    },
    {
      title: "AI Accuracy",
      value: "92%",
      icon: Sparkles,
      color: "text-violet-400",
      bg: "from-violet-500/10 to-violet-500/5",
    },
  ];

  return (

    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">

      {cards.map((card, index) => {

        const Icon = card.icon;

        return (

          <div
            key={index}
            className={`relative overflow-hidden rounded-3xl border border-zinc-800 bg-gradient-to-br ${card.bg} bg-zinc-900 p-6 transition duration-300 hover:-translate-y-1 hover:border-zinc-700 hover:shadow-2xl`}
          >

            <div className="flex items-center justify-between mb-5">

              <div>

                <p className="text-zinc-500 text-sm mb-2">

                  {card.title}

                </p>

                <h2 className={`text-4xl font-bold ${card.color}`}>

                  {card.value}

                </h2>

              </div>

              <div
                className={`p-3 rounded-2xl bg-zinc-800/70 ${card.color}`}
              >

                <Icon size={28} />

              </div>

            </div>

            <div className="h-1 w-full bg-zinc-800 rounded-full overflow-hidden">

              <div
                className={`h-full ${card.color.replace(
                  "text",
                  "bg"
                )} w-3/4 rounded-full`}
              />

            </div>

          </div>

        );

      })}

    </div>

  );

}