import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

export default function AnalyticsChart({ invoices }) {

  const chartData = invoices.map((invoice) => {

    let amount = 0;

    try {

      const data =
        typeof invoice.structured_data === "string"
          ? JSON.parse(invoice.structured_data)
          : invoice.structured_data;

      amount = parseFloat(
        String(data.total_amount || "0")
          .replace(/,/g, "")
          .replace(/[^\d.]/g, "")
      );

    } catch {

      amount = 0;

    }

    return {

      name: `#${invoice.id}`,
      revenue: amount || 0,

    };

  });

  return (

    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 mt-8">

      <h2 className="text-2xl font-semibold text-white mb-6">

        Revenue Analytics

      </h2>

      <div className="h-80">

        <ResponsiveContainer width="100%" height="100%">

          <BarChart data={chartData}>

            <XAxis dataKey="name" stroke="#888" />

            <YAxis stroke="#888" />

            <Tooltip 

            formatter={(value) => [`₹${value}`, "Revenue"]}
            contentStyle={{
            backgroundColor: "#18181b",
            border: "1px solid #27272a",
            borderRadius: "12px",
            color: "white",
  }}
            
            />

            <Bar
              dataKey="revenue"
              fill="#6366f1"
              radius={[8, 8, 0, 0]}
              animationDuration={1500}
            />

          </BarChart>

        </ResponsiveContainer>

      </div>

    </div>

  );

}