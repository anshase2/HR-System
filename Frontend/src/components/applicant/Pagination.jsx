export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}) {
  return (
    <div className="flex justify-center items-center gap-3 mt-10">

      {/* Previous */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`w-10 h-10 border rounded-lg transition ${
          currentPage === 1
            ? "text-gray-300 cursor-not-allowed"
            : "hover:bg-gray-100"
        }`}
      >
        &lt;
      </button>

      {/* Page Numbers */}
      {Array.from({ length: totalPages }, (_, index) => {
        const page = index + 1;

        return (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`w-10 h-10 rounded-lg ${
              currentPage === page
                ? "bg-blue-600 text-white"
                : "border hover:bg-gray-100"
            }`}
          >
            {page}
          </button>
        );
      })}

      {/* Next */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`w-10 h-10 border rounded-lg transition ${
          currentPage === totalPages
            ? "text-gray-300 cursor-not-allowed"
            : "hover:bg-gray-100"
        }`}
      >
        &gt;
      </button>

    </div>
  );
}