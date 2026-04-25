export default function ApiStatus({ status, countdown, lastUpdate}) {
    const statusConfig = {
        ok: {label: "Live", color: "text-green-400", dot: "bg-green-400"},
        loading: {label: "Loading", color: "text-yellow-400", dot: "bg-yellow-400"},
        error: {label: "Error", color: "text-red-400", dot: "bg-red-400"},
    }

    const {label, color, dot} = statusConfig[status]

    const formatTime = (date) => {
        if (!date) return "-"
        return date.toLocaleTimeString("th-TH", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit"
        })
    }

    return (
        <div className="flex flex-col items-end text-sm gap-1">
            <div className="flex items-center gap-2">
                <span className={`flex items-center gap-1 ${color}`}>
                    <span className={`w-2 h-2 rounded-full ${dot} ${status === "ok" ? "animate-pulse" : ""}`}>    
                    </span>
                    {label}
                </span>
                <span className="text-gray-500">|</span>
                <span className="text-gray-400">
                    refresh in <span className="text-white font-mono">{countdown}s</span>
                </span>
            </div>
            <div className="text-gray-500 text-xs text-right">
                last update: <span className="text-gray-400">{formatTime(lastUpdate)}</span>
            </div>
        </div>
    )
}