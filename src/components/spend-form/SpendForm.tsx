'use client';

import React, { useState, useEffect } from 'react';
import { UserSpendState, DEFAULT_SPEND_STATE } from '@/lib/pricing-constants';
import { Code2, Cpu, Sparkles, Layers, DollarSign, Users, Briefcase } from 'lucide-react';

interface SpendFormProps {
  onAuditSubmit: (state: UserSpendState) => void;
  initialState?: UserSpendState | null;
}

const STORAGE_KEY = 'ai_spend_audit_persisted_state';

export default function SpendForm({ onAuditSubmit, initialState }: SpendFormProps) {
  const [state, setState] = useState<UserSpendState>(DEFAULT_SPEND_STATE);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load persistent state from localStorage upon client hydration
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setState(JSON.parse(stored));
      } else if (initialState) {
        setState(initialState);
      }
    } catch (e) {
      console.warn('Failed to parse localStorage stored spend data', e);
    }
    setIsLoaded(true);
  }, [initialState]);

  // Persist state across reloads whenever fields adjust
  const updateField = <K extends keyof UserSpendState>(field: K, value: UserSpendState[K]) => {
    const updated = { ...state, [field]: value };
    setState(updated);
    if (isLoaded) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch (e) {
        console.warn('LocalStorage write fault', e);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAuditSubmit(state);
  };

  const handleReset = () => {
    setState(DEFAULT_SPEND_STATE);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {}
  };

  if (!isLoaded) {
    return (
      <div className="w-full max-w-4xl mx-auto glass-panel p-8 rounded-2xl animate-pulse text-center">
        <div className="h-8 bg-slate-800 rounded w-1/3 mx-auto mb-6"></div>
        <div className="h-32 bg-slate-800 rounded mb-4"></div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-4xl mx-auto glass-panel rounded-2xl overflow-hidden text-left border border-white/10 shadow-2xl">
      <div className="p-6 sm:p-8 border-b border-white/5 bg-slate-900/50">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2.5 bg-emerald-500/10 rounded-xl border border-emerald-500/20 text-emerald-400">
            <Cpu className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">AI Stack Infrastructure Input</h2>
            <p className="text-xs sm:text-sm text-slate-400">Configure your active engineer seats and inference pipelines to map savings opportunities.</p>
          </div>
        </div>
      </div>

      <div className="p-6 sm:p-8 space-y-8">
        {/* Company & Organization baseline */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pb-6 border-b border-white/5">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2 flex items-center gap-1.5">
              <Briefcase className="w-3.5 h-3.5 text-emerald-400" /> Startup Name
            </label>
            <input
              type="text"
              value={state.companyName}
              onChange={(e) => updateField('companyName', e.target.value)}
              placeholder="e.g. Acme AI Corp"
              className="w-full px-4 py-2.5 bg-slate-950/80 border border-white/10 rounded-xl text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500/50 transition-colors text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2 flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-emerald-400" /> Active Headcount
            </label>
            <input
              type="number"
              min="1"
              max="5000"
              value={state.headcount || ''}
              onChange={(e) => updateField('headcount', parseInt(e.target.value) || 0)}
              className="w-full px-4 py-2.5 bg-slate-950/80 border border-white/10 rounded-xl text-white focus:outline-none focus:border-emerald-500/50 transition-colors text-sm"
            />
          </div>
        </div>

        {/* Core Coding Assistants */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-4 flex items-center gap-2">
            <Code2 className="w-4 h-4" /> IDE Assistant Licensing (Seats)
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-slate-950/40 border border-white/5">
              <label className="block text-xs font-medium text-slate-300 mb-1">Cursor AI (Pro/Biz)</label>
              <input
                type="number"
                min="0"
                value={state.cursorSeats || ''}
                onChange={(e) => updateField('cursorSeats', parseInt(e.target.value) || 0)}
                placeholder="0 seats"
                className="w-full px-3 py-2 bg-slate-900 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-emerald-500/50"
              />
              <span className="text-[10px] text-slate-500 mt-1 block">Retail: $20/mo per seat</span>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/40 border border-white/5">
              <label className="block text-xs font-medium text-slate-300 mb-1">GitHub Copilot</label>
              <input
                type="number"
                min="0"
                value={state.copilotSeats || ''}
                onChange={(e) => updateField('copilotSeats', parseInt(e.target.value) || 0)}
                placeholder="0 seats"
                className="w-full px-3 py-2 bg-slate-900 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-emerald-500/50"
              />
              <span className="text-[10px] text-slate-500 mt-1 block">Retail: $10-$19/mo</span>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/40 border border-white/5">
              <label className="block text-xs font-medium text-slate-300 mb-1">Windsurf IDE</label>
              <input
                type="number"
                min="0"
                value={state.windsurfSeats || ''}
                onChange={(e) => updateField('windsurfSeats', parseInt(e.target.value) || 0)}
                placeholder="0 seats"
                className="w-full px-3 py-2 bg-slate-900 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-emerald-500/50"
              />
              <span className="text-[10px] text-slate-500 mt-1 block">Retail: $15/mo per seat</span>
            </div>
          </div>
        </div>

        {/* Consumer Web Interfaces & UI assistants */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-4 flex items-center gap-2">
            <Sparkles className="w-4 h-4" /> Conversational Web UI & Generation (Seats)
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-slate-950/40 border border-white/5">
              <label className="block text-xs font-medium text-slate-300 mb-1">Claude Pro (Anthropic)</label>
              <input
                type="number"
                min="0"
                value={state.claudeSeats || ''}
                onChange={(e) => updateField('claudeSeats', parseInt(e.target.value) || 0)}
                placeholder="0 seats"
                className="w-full px-3 py-2 bg-slate-900 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-emerald-500/50"
              />
              <span className="text-[10px] text-slate-500 mt-1 block">Retail: $20/mo (Team requires 5+)</span>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/40 border border-white/5">
              <label className="block text-xs font-medium text-slate-300 mb-1">ChatGPT Plus/Team</label>
              <input
                type="number"
                min="0"
                value={state.chatgptSeats || ''}
                onChange={(e) => updateField('chatgptSeats', parseInt(e.target.value) || 0)}
                placeholder="0 seats"
                className="w-full px-3 py-2 bg-slate-900 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-emerald-500/50"
              />
              <span className="text-[10px] text-slate-500 mt-1 block">Retail: $20-$35/mo</span>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/40 border border-white/5">
              <label className="block text-xs font-medium text-slate-300 mb-1">v0 Premium (Vercel)</label>
              <input
                type="number"
                min="0"
                value={state.v0Seats || ''}
                onChange={(e) => updateField('v0Seats', parseInt(e.target.value) || 0)}
                placeholder="0 seats"
                className="w-full px-3 py-2 bg-slate-900 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-emerald-500/50"
              />
              <span className="text-[10px] text-slate-500 mt-1 block">Retail: $20/mo per seat</span>
            </div>
          </div>
        </div>

        {/* Foundation API Inference Usage */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-4 flex items-center gap-2">
            <Layers className="w-4 h-4" /> Foundation API Core Inference Layer
          </h3>
          <div className="p-5 rounded-xl bg-slate-950/40 border border-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1 max-w-md">
              <label className="text-xs font-semibold text-white block flex items-center gap-1">
                <DollarSign className="w-3.5 h-3.5 text-emerald-400" /> Raw API Spend (Anthropic / OpenAI / Gemini)
              </label>
              <p className="text-[11px] text-slate-400">Total continuous production context routing overhead billed directly per month.</p>
            </div>
            <div className="w-full sm:w-48 relative">
              <span className="absolute left-3 top-2.5 text-xs text-slate-500">$</span>
              <input
                type="number"
                min="0"
                step="50"
                value={state.rawApiSpend || ''}
                onChange={(e) => updateField('rawApiSpend', parseFloat(e.target.value) || 0)}
                placeholder="0.00"
                className="w-full pl-7 pr-3 py-2 bg-slate-900 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-emerald-500/50 font-mono"
              />
              <span className="absolute right-3 top-2.5 text-xs text-slate-500">/mo</span>
            </div>
          </div>
        </div>

        {/* Additional Optimization attributes */}
        <div className="pt-2">
          <label className="flex items-center gap-3 cursor-pointer group">
            <input
              type="checkbox"
              checked={state.isVCBacked}
              onChange={(e) => updateField('isVCBacked', e.target.checked)}
              className="w-4 h-4 rounded bg-slate-900 border-white/10 text-emerald-500 focus:ring-emerald-500 focus:ring-offset-slate-950"
            />
            <span className="text-xs text-slate-300 group-hover:text-white transition-colors">
              VC-Backed or Accelerate Stage Startup (Unlocks tier-1 matching cloud credit program filters)
            </span>
          </label>
        </div>
      </div>

      <div className="p-6 sm:p-8 border-t border-white/5 bg-slate-950/60 flex flex-col sm:flex-row items-center justify-between gap-4">
        <button
          type="button"
          onClick={handleReset}
          className="text-xs text-slate-400 hover:text-white transition-colors underline py-2"
        >
          Reset values & flush cache
        </button>
        <button
          type="submit"
          className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-bold rounded-xl shadow-lg shadow-emerald-500/20 transition-all duration-200 transform hover:-translate-y-0.5 text-sm flex items-center justify-center gap-2"
        >
          <Sparkles className="w-4 h-4" /> Calculate Defensible Audit Blueprint
        </button>
      </div>
    </form>
  );
}
