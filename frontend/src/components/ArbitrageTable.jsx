import ArbitrageRow from "./ArbitrageRow"

export default function ArbitrageTable({ data, calculateRealSpread }) {
    return (
        <div className="overflow-x-auto rounded-lg p-8 bg-gray-600">
            <table className="w-full text-sm text-white">
                <thead>
                    <tr className="bg-gray-800">
                        <th className="border border-gray-700">Coin</th>
                        <th className="border border-gray-700">Bitkub (THB)</th>
                        <th className="border border-gray-700">Binance TH (THB)</th>
                        <th className="border border-gray-700">Binance TH (USDT)</th>
                        <th className="border border-gray-700">Spread %</th>
                        <th className="border border-gray-700">After Fee</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(row => (
                        <ArbitrageRow
                            key={row.coin}
                            row={row}
                            realSpread={calculateRealSpread(row.spread_percent)}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    )
}