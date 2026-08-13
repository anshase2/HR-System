export default function About() {
  return (
    <div className="min-h-screen bg-gray-100">

      {/* Hero Section */}

      <section className="bg-white py-20">

        <div className="max-w-7xl mx-auto px-6">

          <h1 className="text-5xl font-bold text-gray-900">
            About <span className="text-blue-600">Integrated Technology Group</span>
          </h1>

          <p className="mt-8 text-lg text-gray-600 leading-8 max-w-4xl">
            Integrated Technology Group (ITG) is a leading technology company
            delivering innovative digital solutions across the Middle East.
            ITG specializes in enterprise software development, cloud computing,
            cybersecurity, artificial intelligence, data analytics, and IT consulting.
            Through innovation and technology, ITG empowers organizations to
            accelerate their digital transformation and achieve sustainable growth.
          </p>

        </div>

      </section>

      {/* Mission & Vision */}

      <section className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-8">

        <div className="bg-white rounded-xl shadow p-8">

          <h2 className="text-3xl font-bold mb-4 text-blue-600">
            Our Mission
          </h2>

          <p className="text-gray-600 leading-7">
            To empower businesses and governments with innovative technology
            solutions that improve efficiency, simplify operations,
            and create long-term value.
          </p>

        </div>

        <div className="bg-white rounded-xl shadow p-8">

          <h2 className="text-3xl font-bold mb-4 text-blue-600">
            Our Vision
          </h2>

          <p className="text-gray-600 leading-7">
            To become the trusted technology partner of choice by delivering
            world-class digital solutions while fostering innovation,
            collaboration, and continuous learning.
          </p>

        </div>

      </section>

      {/* Services */}

      <section className="max-w-7xl mx-auto px-6 py-10">

        <h2 className="text-4xl font-bold text-center mb-12">
          What We Do
        </h2>

        <div className="grid md:grid-cols-3 gap-8">

          <div className="bg-white rounded-xl shadow p-8">
            <h3 className="text-xl font-bold text-blue-600">
              Software Development
            </h3>
            <p className="mt-4 text-gray-600">
              Enterprise web and mobile applications tailored to business needs.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow p-8">
            <h3 className="text-xl font-bold text-blue-600">
              Cloud Solutions
            </h3>
            <p className="mt-4 text-gray-600">
              Secure cloud infrastructure and migration services.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow p-8">
            <h3 className="text-xl font-bold text-blue-600">
              Artificial Intelligence
            </h3>
            <p className="mt-4 text-gray-600">
              AI-powered automation, analytics, and intelligent business solutions.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow p-8">
            <h3 className="text-xl font-bold text-blue-600">
              Cybersecurity
            </h3>
            <p className="mt-4 text-gray-600">
              Comprehensive security services to protect digital assets.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow p-8">
            <h3 className="text-xl font-bold text-blue-600">
              Data Analytics
            </h3>
            <p className="mt-4 text-gray-600">
              Transforming business data into valuable insights.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow p-8">
            <h3 className="text-xl font-bold text-blue-600">
              IT Consulting
            </h3>
            <p className="mt-4 text-gray-600">
              Helping organizations adopt modern technologies and best practices.
            </p>
          </div>

        </div>

      </section>

      {/* Why Join */}

      <section className="bg-white mt-16 py-16">

        <div className="max-w-7xl mx-auto px-6">

          <h2 className="text-4xl font-bold text-center mb-10">
            Why Join ITG?
          </h2>

          <div className="grid md:grid-cols-3 gap-8">

            <div className="bg-gray-50 rounded-xl p-6 shadow">
              ✅ Professional Work Environment
            </div>

            <div className="bg-gray-50 rounded-xl p-6 shadow">
              🚀 Career Growth Opportunities
            </div>

            <div className="bg-gray-50 rounded-xl p-6 shadow">
              📚 Continuous Learning & Training
            </div>

            <div className="bg-gray-50 rounded-xl p-6 shadow">
              🤝 Collaborative Teams
            </div>

            <div className="bg-gray-50 rounded-xl p-6 shadow">
              💡 Innovative Projects
            </div>

            <div className="bg-gray-50 rounded-xl p-6 shadow">
              🌍 Regional Technology Leader
            </div>

          </div>

        </div>

      </section>

    </div>
  );
}