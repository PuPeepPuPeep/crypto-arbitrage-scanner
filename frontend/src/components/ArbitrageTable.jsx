import { useEffect, useState } from "react"
import axios, { spread } from "axios"

export default function ArbitrageTable() {
    const [data, setData] = useState([])

    const [fee, setFee] = useState({
        bitkub: 0.25,
        binance: 0.25
    })

    const fetchData = async () => {
        const result = await axios.get("http://localhost:8000/arbitrage")
        setData(result.data)       
    }

    useEffect(() => {
        fetchData()
        const interval = setInterval(fetchData, 5000) //refresh time 5000 = 5 sec
        return () => clearInterval(interval)
    }, [])

    const calculateRealSpread = (spread) => {
        const totalFee = fee.bitkub + fee.binance
        return (spread - totalFee).toFixed(2)
    }

    return (
        <div>
            //Fee input
            <div className="flex gap-6 mb-4 text-white">
                <div>
                    <label className="text-sm text-gray-400">Bitkub Fee</label>
                    <input
                        type="number"
                        value={fee.bitkub}
                        step="0.01"
                        onChange={event => setFee({...fee, bitkub: parseFloat(event.target.value)})}
                        className="block w-24 bg-gray-800 text-white rounded px-2 py-1 mt-1"
                    />
                </div>
                <div>
                    <label className="text-sm text-gray-400">Binance Fee</label>
                    <input 
                        type="number"
                        value={fee.binance}
                        step="0.01"
                        onChange={event => setFee({...fee, binance: parseFloat(event.target.value)})}
                        className="block w-24 bg-gray-800 text-white rounded px-2 py-1 mt-1"
                    />
                </div>
                <div className="self-end pb-1 text-gray-400 text-sm">
                    Total Fee: {(fee.bitkub + fee.binance).toFixed(2)}%
                </div>
            </div>
            //Table
            <div className="overflow-x-auto">
                <table className="w-full text-white">
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
                        {data.map(row => {
                            const realSpread = calculateRealSpread(row.spread_percent)
                        
                            return (
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
                                    <td className="border border-gray-700">{realSpread}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}