import React, { useState } from 'react';
import { ShieldAlert, Lock } from 'lucide-react';
import AdminDash from '../Pages/AdminDash';
import { useNavigate } from 'react-router-dom';

const AdminLogin = ({ onLoginSuccess }) => {
     const naviigate=useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');

    // Hardcoded credentials for instant local development
    if (username === 'admin' && password === 'petify123') {
      onLoginSuccess();
    } else {
      setError('Invalid local administrator credentials. Try admin / petify123');
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4 font-sans text-slate-100">
      <div className="card w-full max-w-md bg-slate-800 shadow-xl border border-slate-700">
        <div className="card-body p-8">
          <div className="flex flex-col items-center gap-2 mb-6">
            <div className="p-3 bg-teal-500 rounded-2xl text-slate-900 shadow-md">
              <ShieldAlert size={32} />
            </div>
            <h2 className="text-2xl font-bold tracking-tight mt-2 text-white">Petify Admin Center</h2>
            <p className="text-xs text-slate-400 uppercase tracking-widest font-mono">Manual Access Gateway</p>
          </div>

          {error && (
            <div className="alert alert-error bg-red-900/40 border-red-500 text-red-200 text-sm py-2 px-3 rounded-lg mb-4">
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="form-control">
              <label className="label py-1">
                <span className="label-text text-xs font-semibold text-slate-300">Admin Username</span>
              </label>
              <input 
                type="text" 
                placeholder="admin" 
                className="input input-bordered w-full bg-slate-900 border-slate-700 focus:border-teal-500 focus:outline-none text-white h-11"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div className="form-control">
              <label className="label py-1">
                <span className="label-text text-xs font-semibold text-slate-300">Security Password</span>
              </label>
              <input 
                type="password" 
                placeholder="petify123" 
                className="input input-bordered w-full bg-slate-900 border-slate-700 focus:border-teal-500 focus:outline-none text-white h-11"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button 
              type="submit" 
              className="btn bg-teal-500 hover:bg-teal-600 border-none text-slate-900 w-full font-bold mt-4 h-11"
             onClick={()=>(naviigate('/Admindash'))}
            >
              <Lock size={16} className="mr-1" /> Authenticate Session
            </button>
          </form>
          
          <div className="text-center mt-4 text-xs text-slate-500 font-mono">
            Dev Login: admin | petify123
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;