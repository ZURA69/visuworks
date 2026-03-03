import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEditor } from '../../contexts/EditorContext';
import { Lock, LogOut, Eye, RotateCcw } from 'lucide-react';

export default function AdminPage() {
  const { isLoggedIn, login, logout, activate, resetAll } = useEditor();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(password);
      setPassword('');
    } catch {
      setError('Ungültiges Passwort');
    } finally {
      setLoading(false);
    }
  };

  const handleActivate = () => {
    activate();
    navigate('/');
  };

  const handleResetAll = async () => {
    if (window.confirm('Alle Änderungen zurücksetzen? Die Seite wird auf den Standardinhalt zurückgesetzt.')) {
      await resetAll();
      alert('Alle Overrides gelöscht.');
    }
  };

  if (!isLoggedIn) {
    return (
      <div data-testid="admin-login" className="min-h-screen bg-[#070910] flex items-center justify-center px-6">
        <form onSubmit={handleLogin} className="w-full max-w-sm space-y-6">
          <div className="text-center">
            <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
              <Lock className="w-6 h-6 text-white/50" />
            </div>
            <h1 className="text-2xl font-bold text-white">Admin</h1>
            <p className="text-sm text-white/40 mt-1">Content Editor Zugang</p>
          </div>
          <div>
            <input
              data-testid="admin-password-input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Passwort"
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-indigo-500/50 transition-colors"
              autoFocus
            />
            {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
          </div>
          <button
            data-testid="admin-login-button"
            type="submit"
            disabled={loading || !password}
            className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium transition-colors disabled:opacity-40"
          >
            {loading ? 'Prüfe...' : 'Anmelden'}
          </button>
        </form>
      </div>
    );
  }

  return (
    <div data-testid="admin-dashboard" className="min-h-screen bg-[#070910] flex items-center justify-center px-6">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white">Content Editor</h1>
          <p className="text-sm text-white/40 mt-1">Texte und Bilder live bearbeiten</p>
        </div>
        <div className="space-y-3">
          <button
            data-testid="activate-editor-button"
            onClick={handleActivate}
            className="w-full flex items-center justify-center gap-3 py-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium transition-colors"
          >
            <Eye className="w-5 h-5" />
            Editor aktivieren
          </button>
          <button
            onClick={handleResetAll}
            className="w-full flex items-center justify-center gap-3 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white/60 hover:text-white border border-white/10 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            Alle Overrides zurücksetzen
          </button>
          <button
            onClick={() => { logout(); navigate('/admin'); }}
            className="w-full flex items-center justify-center gap-3 py-3 rounded-xl text-white/40 hover:text-white/60 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Abmelden
          </button>
        </div>
      </div>
    </div>
  );
}
