import { useState, useEffect, useRef } from "react"
import axios, { spread } from "axios"

const refresh_interval = 30

export function useArbitrageData() {
    const [data, setData] = useState([])
    const [fee, setFee] = useState({
        bitkub: 0.25, binance: 0.10
    })
    const [search, setSearch] = useState("")
    const [lastUpdate, setLastupdate] = useState(null)
    const [countdown, setCountdown] = useState(refresh_interval)
    const [status, setStatus] = useState("loading")

    const countdownRef = useRef(refresh_interval)

    useEffect(() => {
        const fetchData = async () => {
            setStatus("loading")
            try {
                const response = await axios.get("http://localhost:8000/arbitrage")
                setData(response.data)
                setLastupdate(new Date())
                setStatus("ok")
            } catch (error) {
                setStatus("error")
            }
            countdownRef.current = refresh_interval
            setCountdown(refresh_interval)
        }

        fetchData()
        const fetchInterval = setInterval(fetchData, refresh_interval * 1000)
        const countdownInterval = setInterval(() => {
            countdownRef.current -= 1
            setCountdown(countdownRef.current)
        }, 1000)

        return () => {
            clearInterval(fetchInterval)
            clearInterval(countdownInterval)
        }
    }, [])

    const filteredData = data.filter(row =>
        row.coin.toLowerCase().includes(search.toLowerCase())
    )

    const  calculateRealSpread = (spread) => {
        const totalFee = fee.bitkub + fee.binance
        return (spread - totalFee).toFixed(2)
    }

    return { filteredData, fee, setFee, search, setSearch, calculateRealSpread, lastUpdate, countdown, status }
}