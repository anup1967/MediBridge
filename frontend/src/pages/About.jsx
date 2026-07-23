import Navbar from "../components/Navbar";

export default function About() {
  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-slate-50">

        <section className="bg-gradient-to-r from-blue-700 to-cyan-600 text-white">
          <div className="mx-auto max-w-7xl px-6 py-16">

            <h1 className="text-5xl font-bold">
              About MediBridge
            </h1>

            <p className="mt-5 max-w-3xl text-lg leading-8 text-blue-100">
              MediBridge is an emergency healthcare assistance platform
              designed to help people quickly find nearby hospitals and
              access important healthcare resources during critical situations.
            </p>

          </div>
        </section>


        <div className="mx-auto max-w-7xl px-6 py-12">

          <div className="grid gap-8 md:grid-cols-2">


            <div className="rounded-2xl bg-white p-8 shadow">

              <h2 className="text-2xl font-bold">
                The Problem
              </h2>

              <p className="mt-4 leading-7 text-gray-600">
                During medical emergencies, finding a suitable hospital with
                available resources can become difficult and time-consuming.
                Patients and their families often struggle to know which
                hospitals have emergency services, ICU beds, oxygen support,
                or other critical facilities available.
              </p>

            </div>


            <div className="rounded-2xl bg-white p-8 shadow">

              <h2 className="text-2xl font-bold">
                Our Solution
              </h2>

              <p className="mt-4 leading-7 text-gray-600">
                MediBridge provides a centralized platform where users can
                discover hospitals, view emergency resources, check availability,
                get directions, and directly contact healthcare facilities.
              </p>

            </div>


          </div>


          <div className="mt-8 rounded-2xl bg-white p-8 shadow">

            <h2 className="text-2xl font-bold">
              Key Features
            </h2>

            <ul className="mt-5 space-y-3 text-gray-600">

              <li>
                ✓ Search hospitals by location and speciality
              </li>

              <li>
                ✓ View emergency availability, beds, oxygen and ventilators
              </li>

              <li>
                ✓ Quick hospital calling and navigation support
              </li>

              <li>
                ✓ Secure authentication using JWT-based access control
              </li>

              <li>
                ✓ Emergency admission request system
              </li>

            </ul>

          </div>


          <div className="mt-8 rounded-2xl bg-white p-8 shadow">

            <h2 className="text-2xl font-bold">
              Technology Stack
            </h2>

            <p className="mt-4 text-gray-600">
              Built using the MERN stack with React, Node.js, Express.js,
              MongoDB, JWT authentication, Tailwind CSS, and REST APIs.
              The platform focuses on creating a simple and accessible
              healthcare discovery experience.
            </p>

          </div>


        </div>

      </div>
    </>
  );
}