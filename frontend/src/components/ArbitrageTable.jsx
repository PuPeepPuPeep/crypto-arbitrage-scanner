import { useEffect, useState } from "react"
import axios from "axios"

export default function ArbitrageTable() {
    const [data, setData] = useState([])

    const fetchData = async () => {
        const result = await axios.get("http://localhost:8000/arbitrage")
        setData(result.data)       
    }

    useEffect(() => {
        fetchData()
        const interval = setInterval(fetchData, 5000) //refresh time 5000 = 5 sec
        return () => clearInterval(interval)
    }, [])

    return (
        <div className="overflow-x-auto">
            <table className="w-full text-white">
                <thead>
                    <tr className="bg-gray-800">
                        <th className="border border-gray-700">Coin</th>
                        <th className="border border-gray-700">Bitkub (THB)</th>
                        <th className="border border-gray-700">Binance TH (THB)</th>
                        <th className="border border-gray-700">Binance TH (USDT)</th>
                        <th className="border border-gray-700">Spread %</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(row => (
                        <tr key={row.coin} className="bg-gray-900 border border-gray-700 text-center hover:bg-gray-700">
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
                            <td className="border border-gray-700">{row.binance_price}</td>
                            <td className="border border-gray-700">{row.spread_percent}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}