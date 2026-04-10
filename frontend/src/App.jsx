import { useArbitrageData } from "./hooks/useArbitrageData"
import ArbitrageTable from "./components/ArbitrageTable"
import FeeInput from "./components/FeeInput"
import SearchBox from "./components/SearchBox"
import ApiStatus from "./components/ApiStatus"

function App() {
  const { filteredData, fee, setFee, search, setSearch, calculateRealSpread, lastUpdate, countdown, status } = useArbitrageData()
  
  return (
    <div className="h-screen flex flex-col bg-gray-950">
      <div className="px-8 py-4 shrink-0">

        <div className="flex items-start justify-between mb-4">
          <h1 className="text-white text-2xl font-bold mb-4">
            Crypto Arbitrage Scanner
          </h1>
          <ApiStatus status={status} countdown={countdown} lastUpdate={lastUpdate} />
        </div>
        
        <FeeInput fee={fee} onChange={setFee} />
        <SearchBox value={search} onChange={setSearch} />
      </div>
      <div className="flex-1 min-h-0 overflow-auto px-8 pb-4">
        <ArbitrageTable data={filteredData} calculateRealSpread={calculateRealSpread} />
      </div>

    </div>
  );
}

export default App;