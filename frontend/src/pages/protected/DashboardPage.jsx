import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../../stores/auth/authStore';
import Header from '../../components/layout/Header';
import Button from '../../components/ui/Button';

const DashboardPage = () => {
  const navigate = useNavigate();
  const { user, logout, initializeAuth, isAuthenticated } = useAuthStore();

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="mt-2 text-gray-600">
            Welcome back, {user?.email || 'User'}!
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Practice Mode Card */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <div className="text-4xl mb-4">🎯</div>
            <h2 className="text-xl font-semibold mb-2">Practice Mode</h2>
            <p className="text-gray-600 mb-4">
              Build features at your own pace. Get AI feedback and improve your skills.
            </p>
            <Button
              variant="primary"
              onClick={() => alert('Practice mode coming soon!')}
            >
              Start Practice
            </Button>
          </div>

          {/* Multiplayer Mode Card */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <div className="text-4xl mb-4">⚔️</div>
            <h2 className="text-xl font-semibold mb-2">Multiplayer Mode</h2>
            <p className="text-gray-600 mb-4">
              Compete in real-time 1v1 or 5-player matches. Build features under time pressure.
            </p>
            <Button
              variant="outline"
              onClick={() => alert('Multiplayer mode coming soon!')}
            >
              Join Match
            </Button>
          </div>

          {/* Leaderboard Card */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <div className="text-4xl mb-4">🏆</div>
            <h2 className="text-xl font-semibold mb-2">Leaderboard</h2>
            <p className="text-gray-600 mb-4">
              See how you rank against other developers. Track your progress over time.
            </p>
            <Button
              variant="secondary"
              onClick={() => alert('Leaderboard coming soon!')}
            >
              View Rankings
            </Button>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mt-8 bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
          <div className="text-center py-8 text-gray-500">
            <p>No recent activity yet.</p>
            <p className="text-sm mt-2">Start a challenge to see your submissions here!</p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-8 grid md:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">0</div>
            <div className="text-gray-600">Challenges Completed</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">0</div>
            <div className="text-gray-600">Average Score</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">0</div>
            <div className="text-gray-600">Wins</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 text-center">
            <div className="text-3xl font-bold text-orange-600 mb-2">-</div>
            <div className="text-gray-600">Global Rank</div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
