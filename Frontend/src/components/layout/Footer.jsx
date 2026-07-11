export default function Footer() {
  return (
    <footer className="border-t mt-20">

      <div className="max-w-7xl mx-auto px-8 py-6 flex justify-between items-center">

        {/* Left */}
        <p className="text-gray-500 text-sm">
          © 2026 AI Recruit. All rights reserved.
        </p>

        {/* Right */}
        <div className="flex gap-6 text-sm text-gray-500">

          <a href="#" className="hover:text-blue-600 transition">
            Privacy
          </a>

          <a href="#" className="hover:text-blue-600 transition">
            Terms
          </a>

          <a href="#" className="hover:text-blue-600 transition">
            Contact
          </a>

        </div>

      </div>

    </footer>
  );
}