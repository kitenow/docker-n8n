import { useState } from 'react';
import api from '../api/client';
import { useAuth } from '../context/AuthContext';
import { LogOut, Zap, Terminal, Activity } from 'lucide-react';

export const DashboardPage = () => {
  const { user, logout } = useAuth();
  const [taskPayload, setTaskPayload] = useState('{"prompt": "Generate a summary..."}');
  const [response, setResponse] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const triggerTask = async () => {
    try {
      setLoading(true);
      setError('');
      setResponse(null);
      
      const payload = JSON.parse(taskPayload);
      const { data } = await api.post('/ai/task', payload);
      setResponse(data);
    } catch (err: any) {
      if (err instanceof SyntaxError) {
        setError('Invalid JSON payload');
      } else {
        setError(err.response?.data?.message || 'Failed to trigger task');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <nav className="border-b border-gray-800 bg-black/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Zap className="h-6 w-6 text-yellow-500" />
            <span className="font-bold text-xl tracking-tight">AI Orchestrator</span>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="text-sm text-gray-400">
              Logged in as <span className="text-white font-medium">{user?.email}</span>
            </div>
            <button
              onClick={logout}
              className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
              title="Logout"
            >
              <LogOut className="h-5 w-5" />
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 h-[calc(100vh-4rem)] flex gap-6">
        {/* Left Column - Controls */}
        <div className="w-1/3 flex flex-col gap-6">
          <div className="bg-gray-800/50 border border-gray-700/50 rounded-2xl p-6 shadow-xl backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-4">
              <Terminal className="h-5 w-5 text-blue-400" />
              <h2 className="text-lg font-semibold">Trigger Payload</h2>
            </div>
            
            <p className="text-sm text-gray-400 mb-4">
              Enter the JSON payload to send to the n8n webhook.
            </p>

            <textarea
              value={taskPayload}
              onChange={(e) => setTaskPayload(e.target.value)}
              className="w-full h-48 bg-black/50 border border-gray-700 rounded-lg p-4 font-mono text-sm text-emerald-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 resize-none"
              spellCheck={false}
            />

            {error && (
              <div className="mt-4 text-red-400 text-sm bg-red-400/10 border border-red-400/20 rounded-lg p-3">
                {error}
              </div>
            )}

            <button
              onClick={triggerTask}
              disabled={loading}
              className="mt-6 w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-medium py-3 rounded-lg transition-all shadow-lg shadow-blue-500/25 disabled:opacity-50"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <Activity className="h-5 w-5 animate-pulse" /> Processing...
                </div>
              ) : (
                <><Zap className="h-5 w-5" /> Execute Task</>
              )}
            </button>
          </div>
        </div>

        {/* Right Column - Results */}
        <div className="w-2/3 bg-black flex flex-col rounded-2xl border border-gray-800 overflow-hidden shadow-2xl">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800 bg-gray-900/50">
            <h2 className="text-sm font-medium text-gray-400 uppercase tracking-wider">Execution Result</h2>
            {loading && <span className="text-xs text-blue-400 flex items-center gap-1"><span className="animate-ping h-2 w-2 rounded-full bg-blue-400"></span> Running</span>}
          </div>
          
          <div className="flex-1 p-6 overflow-auto">
            {response ? (
              <pre className="text-emerald-400 font-mono text-sm whitespace-pre-wrap">
                {JSON.stringify(response, null, 2)}
              </pre>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-gray-600 space-y-4">
                <Terminal className="h-12 w-12 opacity-50" />
                <p>Waiting for task execution...</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};
