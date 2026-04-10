import ArbitrageRow from "./ArbitrageRow"

export default function ArbitrageTable({ data, calculateRealSpread }) {
    return (
            <table className="w-full text-sm text-white">
                <thead className="sticky top-0">
                    <tr className="bg-gray-800">
                        <th className="border border-gray-700 w-[75px]">Coin</th>
                        <th className="border border-gray-700 text-right w-[200px]">Bitkub (THB)</th>
                        <th className="border border-gray-700 text-right w-[200px]">Binance TH (THB)</th>
                        <th className="border border-gray-700 text-right w-[200px]">Binance TH (USDT)</th>
                        <th className="border border-gray-700 text-right w-[90px]">Spread %</th>
                        <th className="border border-gray-700 text-right w-[90px]">After Fee</th>
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
    )
}