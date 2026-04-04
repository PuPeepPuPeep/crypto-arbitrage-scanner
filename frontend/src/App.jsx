import ArbitrageTable from "./components/ArbitrageTable";

function App() {
  return (
    <div className="min-h-screen bg-gray-950 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-white text-2xl font-bold mb-6">
          Crypto Arbitrage Dashboard
        </h1>
        <ArbitrageTable />
      </div>
    </div>
  );
}

export default App;