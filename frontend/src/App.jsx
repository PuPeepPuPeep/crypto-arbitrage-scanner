import { useArbitrageData } from "./hooks/useArbitrageData"
import ArbitrageTable from "./components/ArbitrageTable"
import FeeInput from "./components/FeeInput"
import SearchBox from "./components/SearchBox"
import ApiStatus from "./components/ApiStatus"
import ServerWakeup from "./components/ServerWakeup"

function App() {
  const { filteredData, fee, setFee, search, setSearch, calculateRealSpread, lastUpdate, countdown, isInitialLoad, status } = useArbitrageData()
  
  if (isInitialLoad && status === "loading") {
    return <ServerWakeup />
  }

  return (
    <div className="h-screen flex flex-col bg-gray-950">
      <div className="px-0 sm:px-8 py-4 shrink-0">

        <div className="flex items-start justify-between mb-4">
          <div>
            <h1 className="text-white text-2xl font-bold mb-1">
              Crypto Arbitrage Scanner
            </h1>
            <a 
              href="https://github.com/PuPeepPuPeep/crypto-arbitrage-scanner"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-gray-300 text-xs"
            >
              View on Github
            </a>
          </div>
          <ApiStatus status={status} countdown={countdown} lastUpdate={lastUpdate} />
        </div>
        
        <FeeInput fee={fee} onChange={setFee} />
        <SearchBox value={search} onChange={setSearch} />
      </div>
      <div className="flex-1 min-h-0 overflow-auto px-0 sm:px-8 pb-4">
        <ArbitrageTable data={filteredData} calculateRealSpread={calculateRealSpread} />
      </div>

    </div>
  );
}

export default App;