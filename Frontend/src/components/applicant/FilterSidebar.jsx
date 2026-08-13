import {
  EMPLOYMENT_TYPES,
  WORKPLACE_TYPES,
  EXPERIENCE_LEVELS,
  formatEnumLabel,
} from "../../constants/jobEnums";

export default function FilterSidebar({
  filters,
  onFilterChange,
  onClearFilters,
}) {
  const handleChange = (field, value) => {
    onFilterChange({ ...filters, [field]: value });
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">
          Filter Jobs
        </h2>

        <button
          type="button"
          onClick={onClearFilters}
          className="text-sm text-blue-600 hover:underline"
        >
          Clear
        </button>
      </div>

      <div className="mb-6">
        <label
          className="block font-semibold mb-2"
          htmlFor="filter-department"
        >
          Department
        </label>

        <input
          id="filter-department"
          type="text"
          placeholder="Exact department match"
          value={filters.department}
          onChange={(e) =>
            handleChange("department", e.target.value)
          }
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="mb-6">
        <label
          className="block font-semibold mb-2"
          htmlFor="filter-location"
        >
          Location
        </label>

        <input
          id="filter-location"
          type="text"
          placeholder="Exact location match"
          value={filters.location}
          onChange={(e) =>
            handleChange("location", e.target.value)
          }
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="mb-6">
        <label
          className="block font-semibold mb-2"
          htmlFor="filter-employmentType"
        >
          Employment Type
        </label>

        <select
          id="filter-employmentType"
          value={filters.employmentType}
          onChange={(e) =>
            handleChange("employmentType", e.target.value)
          }
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All</option>

          {EMPLOYMENT_TYPES.map((type) => (
            <option key={type} value={type}>
              {formatEnumLabel(type)}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-6">
        <label
          className="block font-semibold mb-2"
          htmlFor="filter-workplaceType"
        >
          Workplace Type
        </label>

        <select
          id="filter-workplaceType"
          value={filters.workplaceType}
          onChange={(e) =>
            handleChange("workplaceType", e.target.value)
          }
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All</option>

          {WORKPLACE_TYPES.map((type) => (
            <option key={type} value={type}>
              {formatEnumLabel(type)}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label
          className="block font-semibold mb-2"
          htmlFor="filter-experience"
        >
          Experience Level
        </label>

        <select
          id="filter-experience"
          value={filters.experience}
          onChange={(e) =>
            handleChange("experience", e.target.value)
          }
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All</option>

          {EXPERIENCE_LEVELS.map((level) => (
            <option key={level} value={level}>
              {formatEnumLabel(level)}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}