export default function Pagination() {
  return (
    <div className="flex justify-center items-center gap-3 mt-10">

      <button className="w-10 h-10 border rounded-lg hover:bg-gray-100">
        &lt;
      </button>

      <button className="w-10 h-10 bg-blue-600 text-white rounded-lg">
        1
      </button>

      <button className="w-10 h-10 border rounded-lg hover:bg-gray-100">
        2
      </button>

      <button className="w-10 h-10 border rounded-lg hover:bg-gray-100">
        3
      </button>

      <button className="w-10 h-10 border rounded-lg hover:bg-gray-100">
        &gt;
      </button>

    </div>
  );
}