import { useArbitrageData } from "./hooks/useArbitrageData"
import ArbitrageTable from "./components/ArbitrageTable"
import FeeInput from "./components/FeeInput"
import SearchBox from "./components/SearchBox"

function App() {
  const { filteredData, fee, setFee, search, setSearch, calculateRealSpread } = useArbitrageData()
  
  return (
    <div className="min-h-screen bg-gray-950 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-white text-2xl font-bold mb-6">
          Crypto Arbitrage Scanner
        </h1>
        <FeeInput fee={fee} onChange={setFee} />
        <SearchBox value={search} onChange={setSearch} />
        <ArbitrageTable data={filteredData} calculateRealSpread={calculateRealSpread} />
      </div>
    </div>
  );
}

export default App;