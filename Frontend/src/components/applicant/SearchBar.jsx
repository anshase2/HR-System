export default function SearchBar({
  search = "",
  setSearch,
  department = "",
  setDepartment,
  onSearch,
}) {
  return (
    <div className="mt-12">
      <div className="flex bg-white rounded-2xl shadow-lg p-3">

        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search ITG careers..."
          className="flex-1 px-5 py-4 outline-none"
        />

        <div className="w-px bg-gray-300 mx-2"></div>

        <input
          type="text"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          placeholder="📍 Department"
          className="w-56 px-5 py-4 outline-none"
        />

        <button
          onClick={onSearch}
          className="ml-3 bg-blue-600 text-white px-10 rounded-xl hover:bg-blue-700 transition"
        >
          Find Jobs
        </button>

      </div>
    </div>
  );
}