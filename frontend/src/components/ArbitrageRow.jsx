export default function ArbitrageRow({ row, realSpread }) {
    return (
        <tr className="bg-gray-900 hover:bg-gray-700">
            <td className="border border-gray-700">{row.coin}</td>
            <td className={
                row.bitkub_price < row.binance_price_thb ?
                "text-green-400 border border-gray-700" :
                row.bitkub_price > row.binance_price_thb ?
                "text-red-400 border border-gray-700" :
                "border border-gray-700"
            }>
                {row.bitkub_price.toLocaleString()}
            </td>
            <td className={
                row.binance_price_thb < row.bitkub_price ?
                "text-green-400 border border-gray-700" :
                row.binance_price_thb > row.bitkub_price ?
                "text-red-400 border border-gray-700" :
                "border-gray-700"
            }>
                {row.binance_price_thb.toLocaleString()}
            </td>
            <td className="border border-gray-700">{row.binance_price.toLocaleString()}</td>
            <td className="border border-gray-700">{row.spread_percent.toFixed(2)}</td>
            <td className="border border-gray-700">{realSpread}</td>
        </tr>
    )
}