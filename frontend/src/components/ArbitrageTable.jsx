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
                        <th>Coin</th>
                        <th>Bitkub</th>
                        <th>Binance TH</th>
                        <th>Spread %</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(row => (
                        <tr key={row.coin} className="bg-gray-900">
                            <td>{row.coin}</td>
                            <td>{row.bitkub_price}</td>
                            <td>{row.binance_price}</td>
                            <td>{row.spread_percent}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}