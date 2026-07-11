export default function FilterSidebar() {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">

      <h2 className="text-2xl font-bold mb-6">
        Filter Jobs
      </h2>

      {/* Department */}

      <div className="mb-8">

        <h3 className="font-semibold mb-3">
          Department
        </h3>

        <div className="space-y-3">

          <label className="flex items-center gap-2">
            <input type="checkbox" />
            Software Engineering
          </label>

          <label className="flex items-center gap-2">
            <input type="checkbox" />
            Frontend Development
          </label>

          <label className="flex items-center gap-2">
            <input type="checkbox" />
            Artificial Intelligence
          </label>

          <label className="flex items-center gap-2">
            <input type="checkbox" />
            Quality Assurance
          </label>

          <label className="flex items-center gap-2">
            <input type="checkbox" />
            DevOps
          </label>

        </div>

      </div>

      {/* Employment Type */}

      <div className="mb-8">

        <h3 className="font-semibold mb-3">
          Employment Type
        </h3>

        <div className="space-y-3">

          <label className="flex items-center gap-2">
            <input type="checkbox" />
            Full Time
          </label>

          <label className="flex items-center gap-2">
            <input type="checkbox" />
            Hybrid
          </label>

          <label className="flex items-center gap-2">
            <input type="checkbox" />
            Internship
          </label>

        </div>

      </div>

      {/* Location */}

      <div>

        <h3 className="font-semibold mb-3">
          Office
        </h3>

        <div className="space-y-3">

          <label className="flex items-center gap-2">
            <input type="checkbox" />
            Amman Headquarters
          </label>

        </div>

      </div>

    </div>
  );
}