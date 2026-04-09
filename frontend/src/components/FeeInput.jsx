export default function FeeInput({ fee, onChange }) {
    return (
        <div className="flex gap-6 mb-4 text-white">
            {Object.entries(fee).map(([key, value]) => (
                <div key={key}>
                    <label className="text-sm text-gray-400">{key} Fee (%)</label>
                    <input
                        type="number"
                        value={value}
                        step="0.01"
                        onChange={event => onChange({...fee, [key]: parseFloat(event.target.value)})}
                        className="block w-24 bg-gray-800 rounded px-2 py-1 mt-1"
                    />
                </div>
            ))}
        </div>
    )
}