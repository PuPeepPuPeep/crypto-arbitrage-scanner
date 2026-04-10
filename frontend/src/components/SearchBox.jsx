export default function SearchBox({ value, onChange }) {
    return (
        <input
            type="text"
            placeholder="Search coin"
            value={value}
            onChange={event => onChange(event.target.value)}
            className="w-full bg-gray-800 text-white rounded px-4 py-2 mb-4 border border-gray-700"
        />
    )
}