export default function FilterSidebar({
  selectedDepartments = [],
  setSelectedDepartments = () => {},
  selectedTypes = [],
  setSelectedTypes = () => {},
  selectedLocations = [],
  setSelectedLocations = () => {},
}) {
  const handleDepartmentChange = (department) => {
    setSelectedDepartments((prev) =>
      prev.includes(department)
        ? prev.filter((item) => item !== department)
        : [...prev, department]
    );
  };

  const handleTypeChange = (type) => {
    setSelectedTypes((prev) =>
      prev.includes(type)
        ? prev.filter((item) => item !== type)
        : [...prev, type]
    );
  };

  const handleLocationChange = (location) => {
    setSelectedLocations((prev) =>
      prev.includes(location)
        ? prev.filter((item) => item !== location)
        : [...prev, location]
    );
  };

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

          {[
            "Software Engineering",
            "Frontend Development",
            "Artificial Intelligence",
            "QA Engineering",
            "DevOps",
          ].map((department) => (
            <label
              key={department}
              className="flex items-center gap-2 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={selectedDepartments.includes(department)}
                onChange={() =>
                  handleDepartmentChange(department)
                }
              />

              {department}
            </label>
          ))}

        </div>
      </div>

      {/* Employment Type */}
      <div className="mb-8">

        <h3 className="font-semibold mb-3">
          Employment Type
        </h3>

        <div className="space-y-3">

          {[
            "Full-Time",
            "Part-Time",
            "Internship",
            "Contract",
          ].map((type) => (
            <label
              key={type}
              className="flex items-center gap-2 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={selectedTypes.includes(type)}
                onChange={() => handleTypeChange(type)}
              />

              {type}
            </label>
          ))}

        </div>
      </div>

      {/* Location */}
      <div>

        <h3 className="font-semibold mb-3">
          Office
        </h3>

        <div className="space-y-3">

          <label className="flex items-center gap-2 cursor-pointer">

            <input
              type="checkbox"
              checked={selectedLocations.includes("Amman")}
              onChange={() =>
                handleLocationChange("Amman")
              }
            />

            Amman Headquarters

          </label>

        </div>
      </div>

    </div>
  );
}