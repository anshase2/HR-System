export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-100 flex">

      {/* Left Side */}
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-blue-700 to-blue-500 text-white items-center justify-center p-16">

        <div className="max-w-md">

          <h1 className="text-5xl font-bold">
            TalentAI
          </h1>

          <h2 className="text-2xl mt-6 font-semibold">
            Smart Recruitment Platform
          </h2>

          <p className="mt-6 text-blue-100 leading-8">

            Discover new career opportunities and connect
            talented people with the right companies using
            Artificial Intelligence.

          </p>

          <div className="mt-12 space-y-5">

            <div>
              ✓ AI Candidate Matching
            </div>

            <div>
              ✓ Fast Recruitment Process
            </div>

            <div>
              ✓ HR Management Dashboard
            </div>

            <div>
              ✓ Secure & Easy Application
            </div>

          </div>

        </div>

      </div>

      {/* Right Side */}

      <div className="flex-1 flex justify-center items-center p-10">

        <div className="bg-white w-[470px] rounded-3xl shadow-xl p-10">

          {children}

        </div>

      </div>

    </div>
  );
}