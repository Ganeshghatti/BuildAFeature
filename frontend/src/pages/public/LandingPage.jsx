import { Link } from 'react-router-dom';
import Header from '../../components/layout/Header';
import Button from '../../components/ui/Button';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Build Real Features.
              <span className="block text-blue-600">Compete. Get Judged.</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              A competitive platform where web developers build real product features using any tools (including AI) 
              and get judged on code quality, UX, and engineering maturity.
            </p>
            <div className="flex gap-4 justify-center">
              <Link to="/signup">
                <Button variant="primary" className="text-lg px-8 py-4">
                  Get Started
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="outline" className="text-lg px-8 py-4">
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Why Buildafeature?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="text-4xl mb-4">🤖</div>
              <h3 className="text-xl font-semibold mb-2">AI-Friendly</h3>
              <p className="text-gray-600">
                AI is allowed and encouraged. Focus on quality over speed, not algorithm puzzles.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-semibold mb-2">Real Challenges</h3>
              <p className="text-gray-600">
                Build real product features in 15-30 minutes. Practice mode or compete in real-time.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="text-4xl mb-4">🏆</div>
              <h3 className="text-xl font-semibold mb-2">Quality Judging</h3>
              <p className="text-gray-600">
                Get judged on code quality, UX, and engineering maturity, not just correctness.
              </p>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="bg-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              How It Works
            </h2>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                      1
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Choose Your Mode</h3>
                      <p className="text-gray-600">
                        Practice mode for async challenges or multiplayer mode for real-time competition.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                      2
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Build in Monaco Editor</h3>
                      <p className="text-gray-600">
                        Code in a full-featured editor with virtual file system and preloaded boilerplate.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                      3
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Submit & Get Judged</h3>
                      <p className="text-gray-600">
                        Get AI feedback on code quality, UX, and engineering maturity. See your score and rank.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl p-8">
                <h3 className="text-2xl font-bold mb-4">Scoring System</h3>
                <ul className="space-y-3">
                  <li className="flex justify-between">
                    <span>Functional Tests</span>
                    <span className="font-semibold">30%</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Code Quality (AI)</span>
                    <span className="font-semibold">20%</span>
                  </li>
                  <li className="flex justify-between">
                    <span>UI/UX Quality</span>
                    <span className="font-semibold">20%</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Engineering Maturity</span>
                    <span className="font-semibold">15%</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Extra Features</span>
                    <span className="font-semibold">15%</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Start Building?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join developers competing to build the best features.
          </p>
          <Link to="/signup">
            <Button variant="primary" className="text-lg px-8 py-4">
              Create Your Account
            </Button>
          </Link>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>&copy; 2024 Buildafeature. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
