import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function ApplicationForm() {
  const [country, setCountry] = useState("Jordan");
  const { id } = useParams();

  const countryCodes = {
    Jordan: "+962",
    "Saudi Arabia": "+966",
    UAE: "+971",
    Qatar: "+974",
    Kuwait: "+965",
    Bahrain: "+973",
    Oman: "+968",
    Egypt: "+20",
    Iraq: "+964",
    Lebanon: "+961",
  };
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 py-12">

      <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-2xl p-10">

        <button
  onClick={() => navigate(-1)}
  className="mb-6 text-blue-600 font-semibold hover:text-blue-700 transition"
>
  ← Back to Job Details
</button>
<p className="text-blue-600 font-semibold mb-2">
  Applying for Job #{id}
</p>

        <h1 className="text-4xl font-bold text-gray-800">
          Job Application
        </h1>

        <p className="text-gray-500 mt-2 mb-8">
          Complete the form below to apply for this position.
        </p>

        {/* Full Name */}
        <div className="mb-5">
          <label className="block mb-2 font-medium">
            Full Name
          </label>

          <input
            type="text"
            placeholder="Enter your full name"
            className="w-full h-14 border rounded-xl px-4"
          />
        </div>

        {/* Email */}
        <div className="mb-5">
          <label className="block mb-2 font-medium">
            Email Address
          </label>

          <input
            type="email"
            placeholder="Enter your email"
            className="w-full h-14 border rounded-xl px-4"
          />
        </div>

        {/* Country */}
        <div className="mb-5">
          <label className="block mb-2 font-medium">
            Country
          </label>

          <select
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="w-full h-14 border rounded-xl px-4"
          >
            <option>Jordan</option>
            <option>Saudi Arabia</option>
            <option>UAE</option>
            <option>Qatar</option>
            <option>Kuwait</option>
            <option>Bahrain</option>
            <option>Oman</option>
            <option>Egypt</option>
            <option>Iraq</option>
            <option>Lebanon</option>
          </select>
        </div>

        {/* Phone */}
        <div className="mb-5">
          <label className="block mb-2 font-medium">
            Phone Number
          </label>

          <div className="flex">

            <div className="w-24 h-14 border rounded-l-xl flex justify-center items-center bg-gray-100">
              {countryCodes[country]}
            </div>

            <input
              type="tel"
              placeholder="7XXXXXXXX"
              className="flex-1 h-14 border border-l-0 rounded-r-xl px-4"
            />

          </div>
        </div>

        {/* Experience */}
        <div className="mb-5">
          <label className="block mb-2 font-medium">
            Years of Experience
          </label>

          <input
            type="number"
            placeholder="Example: 2"
            className="w-full h-14 border rounded-xl px-4"
          />
        </div>

        {/* Resume */}
        <div className="mb-6">
          <label className="block mb-2 font-medium">
            Upload Resume
          </label>

          <input
            type="file"
            accept=".pdf,.doc,.docx"
            className="w-full border rounded-xl p-3"
          />
        </div>

        {/* Cover Letter */}
        <div className="mb-6">
          <label className="block mb-2 font-medium">
            Cover Letter
          </label>

          <textarea
            rows="5"
            placeholder="Tell us why you're a good fit..."
            className="w-full border rounded-xl p-4"
          ></textarea>
        </div>

        {/* Checkbox */}
        <div className="flex items-center gap-2 mb-8">

          <input type="checkbox" />

          <span>
            I confirm that all information provided is correct.
          </span>

        </div>

        {/* Submit */}
        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white h-14 rounded-xl font-semibold">
          Submit Application
        </button>

      </div>

    </div>
  );
}