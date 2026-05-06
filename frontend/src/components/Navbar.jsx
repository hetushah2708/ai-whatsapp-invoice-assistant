export default function Navbar() {

  return (

    <div className="border-b border-zinc-800 bg-zinc-950 px-8 py-5 flex items-center justify-between">

      <div>

        <h1 className="text-3xl font-bold text-white">

          AI Invoice Dashboard

        </h1>

        <p className="text-zinc-500 text-sm mt-1">

          AI Powered Invoice Processing System

        </p>

      </div>

      <div className="bg-zinc-800 text-zinc-300 px-4 py-2 rounded-xl">

        Ollama AI

      </div>

    </div>

  );
}