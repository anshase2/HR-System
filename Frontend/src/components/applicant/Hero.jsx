import SearchBar from "./SearchBar";
import heroImage from "../../assets/images/hero.png";

export default function Hero() {
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

  <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
   View Open Positions
  </button>

  <button className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50 transition">
    About ITG
  </button>

</div>

<div className="mt-10">
  <SearchBar />
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