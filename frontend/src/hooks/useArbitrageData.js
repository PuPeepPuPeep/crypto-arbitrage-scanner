import { useState, useEffect } from "react"
import axios, { spread } from "axios"

export function useArbitrageData() {
    const [data, setData] = useState([])
    const [fee, setFee] = useState({
        bitkub: 0.25, binance: 0.10
    })
    const [search, setSearch] = useState("")

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get("http://localhost:8000/arbitrage")
            setData(response.data)
        }
        fetchData()
        const interval = setInterval(fetchData, 5000)
        return () => clearInterval(interval)
    }, [])

    const filteredData = data.filter(row =>
        row.coin.toLowerCase().includes(search.toLowerCase())
    )

    const  calculateRealSpread = (spread) => {
        const totalFee = fee.bitkub + fee.binance
        return (spread - totalFee).toFixed(2)
    }

    return { filteredData, fee, setFee, search, setSearch, calculateRealSpread }
}