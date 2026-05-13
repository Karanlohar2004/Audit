import React from 'react';
import { Metadata } from 'next';
import { ShieldCheck, Sparkles, Building, Layers } from 'lucide-react';

interface SharePageProps {
  params: {
    shareId: string;
  };
}

// Generate Custom Open Graph metadata tags dynamically mapping to the specified share token
export async function generateMetadata({ params }: SharePageProps): Promise<Metadata> {
  const { shareId } = params;
  
  return {
    title: `SaaS Spend Audit Blueprint — Token ${shareId}`,
    description: 'Anonymized financial analysis mapping potential instant run-rate reduction across AI IDE developer tiers and inference model caching layers.',
    openGraph: {
      title: `Verified SaaS Savings Index — Token ${shareId}`,
      description: 'Anonymized engineering footprint analysis revealing optimized cash runway retention targets.',
      type: 'website',
      siteName: 'Lead-Generation AI Spend Audit Tool',
    },
    twitter: {
      card: 'summary_large_image',
      title: `Verified SaaS Savings Index — Token ${shareId}`,
      description: 'Anonymized engineering footprint analysis revealing optimized cash runway retention targets.',
    },
  };
}

export default function ShareableAuditView({ params }: SharePageProps) {
  const { shareId } = params;

  return (
    <div className="min-h-screen bg-[#0B0F17] text-slate-100 flex flex-col justify-between selection:bg-emerald-500 selection:text-slate-950 p-4 sm:p-8">
      {/* Background radial accent nodes */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-80 bg-emerald-500/5 rounded-full filter blur-3xl pointer-events-none"></div>

      <div className="max-w-4xl w-full mx-auto space-y-8 animate-fadeIn pt-4">
        {/* Verification top ribbon */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/5">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-slate-900 border border-white/10 flex items-center justify-center text-emerald-400">
              ⚡
            </div>
            <div>
              <span className="text-xs font-mono font-bold text-slate-400 block">ANONYMIZED REPORT HASH</span>
              <span className="text-sm font-bold text-white tracking-tight">{shareId}</span>
            </div>
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold self-start sm:self-auto">
            <ShieldCheck className="w-3.5 h-3.5" /> PII Stripped Secure Link
          </div>
        </div>

        {/* Core Broadcast Read-only Hero card */}
        <div className="p-8 sm:p-12 rounded-3xl bg-slate-900/50 border border-white/10 relative overflow-hidden shadow-2xl space-y-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400">
              <Sparkles className="w-3.5 h-3.5" /> Verified External Output Token
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              SaaS AI Tool Infrastructure Audit Blueprint
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
              This operational stack assessment targets direct tier-level overlaps, seat allocation efficiency parameters, and inference context API instruction caching ratios.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-white/5">
            <div className="p-4 rounded-2xl bg-slate-950/60 border border-white/5">
              <span className="text-[10px] text-slate-500 uppercase block font-medium">Mapped Headcount</span>
              <span className="text-lg font-bold text-white font-mono flex items-center gap-1.5 mt-0.5">
                <Building className="w-4 h-4 text-emerald-400" /> Active Profile
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/60 border border-white/5">
              <span className="text-[10px] text-slate-500 uppercase block font-medium">IDE / UI Agent Seats</span>
              <span className="text-lg font-bold text-white font-mono flex items-center gap-1.5 mt-0.5">
                <Layers className="w-4 h-4 text-emerald-400" /> Standard Stack
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/60 border border-white/5">
              <span className="text-[10px] text-slate-500 uppercase block font-medium">Optimization Potential</span>
              <span className="text-lg font-bold text-emerald-400 font-mono flex items-center gap-1.5 mt-0.5">
                ⚡ Highly Actionable
              </span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/40 border border-white/5 text-xs text-slate-400 leading-relaxed italic">
            &ldquo;Infrastructure configuration records indicate substantial direct line-item recovery targets across overlapping IDE assistance tiers and raw foundation inference calls. Transitioning active contributor seats to centralized token routing extends baseline pure cash runways.&rdquo;
          </div>
        </div>

        {/* Bottom actionable CTA to create their own audit */}
        <div className="text-center py-6 border-t border-white/5 space-y-3">
          <p className="text-xs text-slate-400">Are you building an engineering team? Map your own AI software spend securely.</p>
          <a
            href="/"
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-white hover:bg-slate-100 text-slate-950 text-xs font-bold rounded-xl transition-all shadow"
          >
            Calculate Your Free Audit Blueprint
          </a>
        </div>
      </div>

      <footer className="text-center py-4 text-[10px] text-slate-600 border-t border-white/5 mt-auto">
        Lead-Generation AI Spend Audit Tool • Enterprise Infrastructure Security Systems
      </footer>
    </div>
  );
}
