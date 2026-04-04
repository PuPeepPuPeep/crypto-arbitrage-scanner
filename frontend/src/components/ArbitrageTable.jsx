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
                        <th class="border border-gray-700">Coin</th>
                        <th class="border border-gray-700">Bitkub</th>
                        <th class="border border-gray-700">Binance TH</th>
                        <th class="border border-gray-700">Spread %</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(row => (
                        <tr key={row.coin} className="bg-gray-900 border border-gray-700 text-center hover:bg-gray-700">
                            <td class="border border-gray-700">{row.coin}</td>
                            <td class="border border-gray-700">{row.bitkub_price}</td>
                            <td class="border border-gray-700">{row.binance_price}</td>
                            <td class="border border-gray-700">{row.spread_percent}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}