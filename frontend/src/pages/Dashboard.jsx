import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import StatsCards from "../components/StatsCards";
import UploadCard from "../components/UploadCard";
import InvoiceTable from "../components/InvoiceTable";
import AnalyticsChart from "../components/AnalyticsChart";

export default function Dashboard({
  invoices,
  file,
  setFile,
  handleUpload,
  response,
  loading,
  handleDelete,
  searchTerm,
  setSearchTerm,
}) {

  return (

    <div className="flex bg-black min-h-screen text-white">

      <Sidebar />

      <div className="flex-1">

        <Navbar />

        <div className="p-6 lg:p-8 space-y-8">

          {/* KPI SECTION */}
          <StatsCards invoices={invoices} />

          {/* TOP GRID */}
          <div className="grid grid-cols-1 xl:grid-cols-5 gap-8">

            {/* LEFT SIDE */}
            <div className="xl:col-span-2">

              <UploadCard
                file={file}
                setFile={setFile}
                handleUpload={handleUpload}
                response={response}
                loading={loading}
              />

            </div>

            {/* RIGHT SIDE */}
            <div className="xl:col-span-3">

              <AnalyticsChart invoices={invoices} />

            </div>

          </div>

          {/* TABLE SECTION */}
          <div className="w-full">

            <InvoiceTable
              invoices={invoices}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              handleDelete={handleDelete}
            />

          </div>

        </div>

      </div>

    </div>

  );
}