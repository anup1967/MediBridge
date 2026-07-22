import { Search } from "lucide-react";

function SearchBar() {
  return (
    <section className="bg-white -mt-12 relative z-20">
      <div className="max-w-5xl mx-auto px-6">

        <div className="bg-white rounded-2xl shadow-xl p-6">

          <div className="flex gap-3">

            <input
              type="text"
              placeholder="Search hospitals by city..."
              className="flex-1 border rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button className="bg-blue-600 text-white px-6 rounded-xl hover:bg-blue-700 transition">
              <Search />
            </button>

          </div>

        </div>

      </div>
    </section>
  );
}

export default SearchBar;