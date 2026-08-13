export default function AuthLayout({ children }) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-white flex">

      {/* Background Blur Circle 1 */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-300 rounded-full blur-3xl opacity-30"></div>

      {/* Background Blur Circle 2 */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-200 rounded-full blur-3xl opacity-30"></div>

      {/* Background Blur Circle 3 */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-sky-200 rounded-full blur-3xl opacity-20"></div>

      {/* Left Side */}
      <div className="relative hidden lg:flex w-1/2 items-center justify-center p-16">

        <div className="max-w-md z-10">

          <h1 className="text-6xl font-extrabold text-blue-700">
            TalentAI
          </h1>

          <h2 className="text-3xl mt-6 font-bold text-gray-800">
            Smart Recruitment Platform
          </h2>

          <p className="mt-6 text-gray-600 leading-8">

            Discover new career opportunities and connect talented
            people with the right companies using Artificial Intelligence.

          </p>

          <div className="mt-12 space-y-5 text-gray-700">

            <div>✓ AI Candidate Matching</div>

            <div>✓ Fast Recruitment Process</div>

            <div>✓ HR Management Dashboard</div>

            <div>✓ Secure & Easy Application</div>

          </div>

        </div>

      </div>

      {/* Right Side */}
      <div className="relative flex-1 flex justify-center items-center p-10">

        <div className="bg-white/90 backdrop-blur-md w-[470px] rounded-3xl shadow-2xl border border-white p-10">

          {children}

        </div>

      </div>

    </div>
  );
}