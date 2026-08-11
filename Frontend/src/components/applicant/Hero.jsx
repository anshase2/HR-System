import SearchBar from "./SearchBar";
import heroImage from "../../assets/images/hero.png";
import { Link } from "react-router-dom";
export default function Hero({
  search,
  setSearch,
  department,
  setDepartment,
  onSearch,
}) {
  return (
    <section className="bg-gray-50">

      <div className="max-w-7xl mx-auto px-8 py-24">

        <div className="grid grid-cols-2 gap-20 items-center">

          {/* Left */}

          <div>
            <p className="text-blue-600 font-semibold uppercase tracking-widest">
    AI Powered Recruitment Platform
</p>

            <h1 className="text-6xl font-bold text-gray-900 leading-tight">

             Build Your Career

<span className="text-blue-600">
  {" "}at ITG
</span>

            </h1>

            <p className="mt-8 text-xl text-gray-600">

            Explore career opportunities at Integrated Technology Group. Our AI-powered recruitment platform helps connect talented candidates with the right ITG positions.

            </p>
            <div className="mt-10 flex gap-6">

 

  <Link
  to="/about"
  className="bg-blue-600 text-white px-8 py-4 rounded-xl hover:bg-blue-700 transition duration-300"
>
  About ITG
</Link>
</div>

<div className="mt-10">
  <SearchBar
    search={search}
    setSearch={setSearch}
    department={department}
    setDepartment={setDepartment}
    onSearch={onSearch}
  />
</div>
          </div>

          {/* Right */}

          <div className="flex justify-center">
<div className="flex justify-center items-center">
  <img
    src={heroImage}
    alt="AI Recruitment"
    className="w-[700px] h-auto object-contain"
  />
</div>

          </div>

        </div>

      </div>

    </section>
  );
}