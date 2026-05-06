import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import StatsCards from "../components/StatsCards";
import UploadCard from "../components/UploadCard";
import InvoiceTable from "../components/InvoiceTable";

export default function Dashboard({
  invoices,
  file,
  setFile,
  handleUpload,
  response,
}) {

  return (

    <div className="flex bg-black min-h-screen">

      <Sidebar />

      <div className="flex-1">

        <Navbar />

        <div className="p-8">

          <StatsCards invoices={invoices} />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            <div>

              <UploadCard
                file={file}
                setFile={setFile}
                handleUpload={handleUpload}
                response={response}
              />

            </div>

            <div className="lg:col-span-2">

              <InvoiceTable invoices={invoices} />

            </div>

          </div>

        </div>

      </div>

    </div>

  );
}