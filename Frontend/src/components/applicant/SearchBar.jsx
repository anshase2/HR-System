export default function SearchBar({
  searchQuery,
  onSearchChange,
  onSearchSubmit,
}) {
  const handleSubmit = (event) => {
    event.preventDefault();
    onSearchSubmit?.();
  };

  return (
    <form onSubmit={handleSubmit} className="mt-12">
      <div className="flex bg-white rounded-2xl shadow-lg p-3">
        <input
          type="text"
          placeholder="Search job titles or descriptions..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="flex-1 px-5 py-4 outline-none"
        />

        <button
          type="submit"
          className="ml-3 bg-blue-600 text-white px-10 rounded-xl hover:bg-blue-700 transition"
        >
          Find Jobs
        </button>
      </div>

      <p className="text-sm text-gray-500 mt-2">
        Search runs on loaded results. Use filters for exact department and
        location matches.
      </p>
    </form>
  );
}