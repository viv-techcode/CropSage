import Navbar from "../components/Navbar";
import Card from "../components/Card";
import Footer from "../components/Footer";

function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900 dark:bg-gray-950 dark:text-gray-100 transition-colors duration-300">
      <Navbar />

      <main className="flex-1">

        {/* Hero Section */}
        <section className="bg-gradient-to-br from-green-50 via-white to-emerald-100 dark:from-gray-950 dark:via-gray-900 dark:to-green-950 border-b dark:border-gray-800">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
            <div className="grid lg:grid-cols-2 gap-14 items-center">

              {/* Left Content */}
              <div>

                <div className="inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-100 dark:border-green-800 dark:bg-green-900/30 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-green-700 dark:text-green-300">
                  <span className="h-2 w-2 rounded-full bg-green-600"></span>
                  AI-Powered Agriculture Platform
                </div>

                <h1 className="mt-6 text-5xl lg:text-6xl font-extrabold leading-tight text-gray-900 dark:text-white">
                  Smarter Farming with
                  <span className="block text-green-700 dark:text-green-400">
                    CropSage
                  </span>
                </h1>

                <p className="mt-6 max-w-xl text-lg leading-8 text-gray-600 dark:text-gray-300">
                  Intelligent crop recommendations, real-time market prices,
                  weather alerts, profit estimation and AI-powered farming
                  guidance—all from one simple platform.
                </p>

                <div className="mt-10 flex flex-wrap gap-4">

                  <button className="rounded-lg bg-green-700 px-6 py-3 font-semibold text-white shadow-lg transition hover:bg-green-800 dark:bg-green-600 dark:hover:bg-green-500">
                    View Dashboard
                  </button>

                  <button className="rounded-lg border border-gray-300 bg-white px-6 py-3 font-semibold text-gray-800 transition hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:hover:bg-gray-800">
                    Sign Up Free
                  </button>

                </div>

              </div>

              {/* Right Image */}
              <div className="relative">

                <div className="overflow-hidden rounded-3xl shadow-2xl">

                  <img
                    src="/images/hero-farm.jpg"
                    alt="CropSage Agriculture"
                    className="h-[450px] w-full object-cover"
                  />

                </div>

                {/* Floating Card */}
                <div className="absolute -bottom-6 left-6 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-5 shadow-xl">
                  <p className="text-sm text-gray-500 dark:text-gray-400">AI Recommendation</p>
                  <h3 className="mt-1 text-lg font-bold text-green-700 dark:text-green-400">
                    Best Crop: Wheat 🌾
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Estimated Profit +18%
                  </p>
                </div>

              </div>

            </div>
          </div>
        </section>

        {/* Features */}
        <section className="max-w-6xl mx-auto px-4 py-14">
          <div className="mb-10">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Core Features</h2>
            <div className="w-16 h-1 bg-green-600 mt-2"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card
              title="Smart Crop Planner"
              description="Suggests suitable crops based on location, season, land size, and weather conditions."
            />

            <Card
              title="Market Price Intelligence"
              description="Tracks mandi prices and market trends to help farmers find better selling opportunities."
            />

            <Card
              title="Harvest Profit Calculator"
              description="Estimates profits using cultivation costs, expected yields, and market prices."
            />

            <Card
              title="AI Farm Assistant"
              description="Provides simple answers and personalized guidance on farming decisions."
            />

            <Card
              title="Weather Risk Alerts"
              description="Sends alerts about weather risks such as heavy rain, heatwaves, and storms."
            />

            {/* CTA Card */}
            <div className="bg-green-700 dark:bg-green-800 text-white rounded-xl p-6 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-semibold mb-3">
                  Get Started Today
                </h3>

                <p className="text-green-100">
                  Join thousands of farmers already using CropSage to maximize
                  productivity and profits.
                </p>
              </div>

              <button className="mt-6 bg-white dark:bg-gray-900 text-green-700 dark:text-green-400 px-5 py-2 rounded-lg font-semibold hover:bg-gray-100 dark:hover:bg-gray-800">
                Create Free Account →
              </button>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="bg-white dark:bg-gray-950 border-y dark:border-gray-800 py-16">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-10">
              How It Works
            </h2>

            <div className="grid md:grid-cols-3 gap-6">

              <div className="border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm hover:shadow-lg transition">
                <span className="text-4xl font-bold text-green-700 dark:text-green-400">01</span>

                <h3 className="font-semibold mt-4 text-gray-900 dark:text-white">
                  Enter your farm details
                </h3>

                <p className="mt-2 text-gray-600 dark:text-gray-300">
                  Provide your location, land size, soil type and available
                  resources.
                </p>
              </div>

              <div className="border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm hover:shadow-lg transition">
                <span className="text-4xl font-bold text-green-700 dark:text-green-400">02</span>

                <h3 className="font-semibold mt-4 text-gray-900 dark:text-white">
                  Get AI Recommendations
                </h3>

                <p className="mt-2 text-gray-600 dark:text-gray-300">
                  Receive personalized crop suggestions based on AI analysis.
                </p>
              </div>

              <div className="border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm hover:shadow-lg transition">
                <span className="text-4xl font-bold text-green-700 dark:text-green-400">03</span>

                <h3 className="font-semibold mt-4 text-gray-900 dark:text-white">
                  Track & Optimize
                </h3>

                <p className="mt-2 text-gray-600 dark:text-gray-300">
                  Monitor prices, weather alerts and improve your farming
                  strategy.
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="max-w-6xl mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
            Farmer Stories
          </h2>

          <div className="grid md:grid-cols-2 gap-6">

            <div className="rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow p-6">
              <p className="italic text-gray-700 dark:text-gray-300">
                "CropSage recommended switching from cotton to groundnut.
                My profits increased by 34%."
              </p>

              <div className="mt-4">
                <h4 className="font-semibold text-gray-900 dark:text-white">Ramesh Patel</h4>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Anand, Gujarat
                </span>
              </div>
            </div>

            <div className="rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow p-6">
              <p className="italic text-gray-700 dark:text-gray-300">
                "Market price alerts helped me sell my lychee at the perfect
                time instead of accepting a low offer."
              </p>

              <div className="mt-4">
                <h4 className="font-semibold text-gray-900 dark:text-white">Sunita Devi</h4>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Muzaffarpur, Bihar
                </span>
              </div>
            </div>

          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}

export default Home;