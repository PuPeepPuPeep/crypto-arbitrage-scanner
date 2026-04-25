export default function ArbitrageRow({ row, realSpread }) {

    const baseCell = "text-right font-mono border border-gray-700"
    const priceColor = (a, b) => a < b ? "text-green-400" : a > b ? "text-red-400" : ""

    return (
        <tr className="bg-gray-900 hover:bg-gray-700">
            <td className="border border-gray-700 font-mono font-medium">{row.coin}</td>
            <td className={`${baseCell} ${priceColor(row.bitkub_price, row.binance_price_thb)}`}>
                {row.bitkub_price.toLocaleString()}
            </td>
            <td className={`${baseCell} ${priceColor(row.binance_price_thb, row.bitkub_price)}`}>
                {row.binance_price_thb.toLocaleString()}
            </td>
            <td className={baseCell}>{row.binance_price.toLocaleString()}</td>
            <td className={baseCell}>{row.spread_percent.toFixed(2)}</td>
            <td className={baseCell}>{realSpread}</td>
        </tr>
    )
}