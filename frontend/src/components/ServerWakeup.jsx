import { useEffect, useState } from "react"

const COLD_START_SECONDS = 60

export default function ServerWakeup() {
    const [elapsed, setElapsed] = useState(0)

    useEffect(() => {
        const timer = setInterval(() => setElapsed(e => e + 1), 1000)
        return () => clearInterval(timer)
    }, [])

    const progress = Math.min((elapsed / COLD_START_SECONDS) * 100, 95)

    return (
        <div className="h-screen flex flex-col items-center justify-center bg-gray-950 gap-6">
            <div className="text-4xl">⚡</div>
            <div className="text-center">
                <p className="text-white text-xl font-semibold mb-1">Server is waking up...</p>
                <p className="text-gray-400 text-sm">It may take 30-60 seconds</p>
            </div>
            <div className="w-72 bg-gray-800 rounded-full h2">
                <div 
                    className="bg-yellow-400 h-2 rounded-full transition-all duration-1000"
                    style={{ width: `${progress}%` }}
                >
                </div>
            </div>
            <p className="text-gray-500 text-sm font-mono">{elapsed}s elapsed</p>
        </div>
    )
}