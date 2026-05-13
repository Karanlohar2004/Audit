'use client';

import React, { useState } from 'react';
import SpendForm from '@/components/spend-form/SpendForm';
import AuditResults from '@/components/audit-results/AuditResults';
import { UserSpendState } from '@/lib/pricing-constants';
import { runSpendAudit, AuditReport } from '@/lib/audit-engine';
import { ShieldAlert, Sparkles, TrendingUp, CheckCircle, ArrowUpRight } from 'lucide-react';

export default function AuditAppHome() {
  const [activeReport, setActiveReport] = useState<AuditReport | null>(null);
  const [lastState, setLastState] = useState<UserSpendState | null>(null);

  const handleAuditCalculate = (state: UserSpendState) => {
    const report = runSpendAudit(state);
    setLastState(state);
    setActiveReport(report);
    // Smooth auto-scroll or view translation
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleResetView = () => {
    setActiveReport(null);
  };

  return (
    <div className="min-h-screen text-slate-100 flex flex-col justify-between selection:bg-emerald-500 selection:text-slate-950">
      {/* Premium glowing absolute ambient accent header nodes */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-emerald-500/10 via-transparent to-transparent pointer-events-none -z-10"></div>

      {/* Main navigation / brand identity header */}
      <header className="border-b border-white/5 bg-slate-950/40 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-600 flex items-center justify-center text-slate-950 font-black text-xs shadow-md shadow-emerald-500/20">
              ⚡
            </div>
            <span className="font-bold text-white tracking-tight text-sm sm:text-base">
              SaaS<span className="text-emerald-400">Audit</span>
            </span>
            {/* <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-white/5 text-slate-400 hidden sm:inline">
              Engine v2.4
            </span> */}
          </div>

          <div className="flex items-center gap-4 text-xs text-slate-400">
            {/* <span className="hidden md:flex items-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-400" /> Free Startup Assessment
            </span> */}
            <a 
              href="#form-section" 
              className="px-3.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white font-medium transition-colors border border-white/5"
            >
              Configure Stack
            </a>
          </div>
        </div>
      </header>

      {/* Core Body Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
        {/* Top Premium Value Proposition Hero block */}
        {!activeReport && (
          <div className="text-center space-y-4 max-w-3xl mx-auto pt-4 sm:pt-8 animate-fadeIn">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 animate-pulse" /> Mathematically Defensible Cost Modeling
            </div>
            
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Stop bleeding run-rate on <br className="hidden sm:inline"/>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-300">
                unoptimized AI developer tiers.
              </span>
            </h1>

            <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Startups overspend up to 45% on individual coding assistants, premature &ldquo;Team&rdquo; seat minimums, and uncached inference reads. Enter your setup below to unlock instant pure-cash routing recommendations.
            </p>

            <div className="pt-2 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400">
              <span className="flex items-center gap-1"><TrendingUp className="w-3.5 h-3.5 text-teal-400" /> Zero AI Math Hallucinations</span>
              <span className="flex items-center gap-1"><ShieldAlert className="w-3.5 h-3.5 text-teal-400" /> Secure Token Arbitrage</span>
            </div>
          </div>
        )}

        {/* Dynamic Display Router: Show Active Results Board OR Input Form */}
        <div id="form-section">
          {activeReport && lastState ? (
            <AuditResults 
              report={activeReport} 
              spendState={lastState} 
              onReset={handleResetView} 
            />
          ) : (
            <SpendForm 
              onAuditSubmit={handleAuditCalculate} 
              initialState={lastState} 
            />
          )}
        </div>
      </main>

      {/* Premium Professional Footer */}
      <footer className="border-t border-white/5 bg-slate-950/80 py-8 text-xs text-slate-500 text-center space-y-3">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-400">SaaS AI Spend Auditor</span>
            <span>•</span>
            <span>Built for High-Growth Startups</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="hover:text-slate-400 transition-colors flex items-center gap-0.5 cursor-pointer">
              Deterministic Pricing Rules <ArrowUpRight className="w-3 h-3" />
            </span>
            <span>•</span>
            <span className="hover:text-slate-400 transition-colors cursor-pointer">
              Privacy / PII Standards
            </span>
          </div>
        </div>
        <p className="text-[10px] text-slate-600">
          Disclaimer: Audit estimations derive from public software license cost parameters. Infrastructure routing options interface with independent gateway modules.
        </p>
      </footer>
    </div>
  );
}
