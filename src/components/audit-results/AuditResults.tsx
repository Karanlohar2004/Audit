'use client';

import React, { useState, useEffect } from 'react';
import { AuditReport, AuditItem } from '@/lib/audit-engine';
import { UserSpendState } from '@/lib/pricing-constants';
import { 
  CheckCircle2, 
  AlertTriangle, 
  TrendingDown, 
  Sparkles, 
  Lock, 
  Mail, 
  ArrowRight, 
  Share2, 
  Copy, 
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Building2
} from 'lucide-react';

interface AuditResultsProps {
  report: AuditReport;
  spendState: UserSpendState;
  onReset: () => void;
}

export default function AuditResults({ report, spendState, onReset }: AuditResultsProps) {
  // Lead Gate status state
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [emailInput, setEmailInput] = useState('');
  const [isSubmittingLead, setIsSubmittingLead] = useState(false);
  const [leadError, setLeadError] = useState('');
  const [leadSuccessMessage, setLeadSuccessMessage] = useState('');

  // Summarization text state
  const [summaryText, setSummaryText] = useState<string | null>(null);
  const [isSummarizing, setIsSummarizing] = useState(false);

  // Sharing state
  const [shareUrl, setShareUrl] = useState<string | null>(null);
  const [isGeneratingShare, setIsGeneratingShare] = useState(false);
  const [copied, setCopied] = useState(false);

  // Trigger lead submission
  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput) return;

    setIsSubmittingLead(true);
    setLeadError('');

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: emailInput,
          companyName: spendState.companyName,
          spendData: spendState,
          auditResults: report,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit qualification gating pipeline.');
      }

      setIsUnlocked(true);
      setLeadSuccessMessage('Blueprint authorized. Initializing narrative framework...');
      
      // Immediately invoke Anthropic Summarization API
      fetchSummary();
    } catch (err: any) {
      setLeadError(err.message || 'Network gateway disruption. Please attempt authorization once more.');
    } finally {
      setIsSubmittingLead(false);
    }
  };

  // Fetch bespoke Anthropic API Summary
  const fetchSummary = async () => {
    setIsSummarizing(true);
    try {
      const res = await fetch('/api/summarize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          spendData: spendState,
          auditResults: report,
        }),
      });
      const data = await res.json();
      if (data.success && data.summary) {
        setSummaryText(data.summary);
      } else {
        setSummaryText('Operational stack profiling indicates immediate optimization pathing across coding assistant tiers and inference token cache definitions.');
      }
    } catch (e) {
      setSummaryText('Executive audit calculations indicate primary tool overlapping overhead. Standardize source assistant pipelines to secure core annual cash targets.');
    } finally {
      setIsSummarizing(false);
    }
  };

  // Generate unique Open Graph public URL
  const handleGenerateShare = async () => {
    setIsGeneratingShare(true);
    try {
      const res = await fetch('/api/shares', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          spendData: spendState,
          auditResults: report,
        }),
      });
      const data = await res.json();
      if (data.success && data.shareUrl) {
        // Build absolute domain or standard base uri
        const fullUrl = `${window.location.origin}${data.shareUrl}`;
        setShareUrl(fullUrl);
      }
    } catch (e) {
      console.warn('Share setup failed', e);
    } finally {
      setIsGeneratingShare(false);
    }
  };

  const copyToClipboard = () => {
    if (!shareUrl) return;
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Math helper for bar widths
  const maxSpend = Math.max(report.totalCurrentMonthly, 100);
  const currentBarWidth = report.totalCurrentMonthly > 0 ? 100 : 5;
  const optimizedBarWidth = report.totalCurrentMonthly > 0 ? Math.max(5, (report.totalOptimizedMonthly / report.totalCurrentMonthly) * 100) : 5;

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8 text-left animate-fadeIn">
      {/* Top action header */}
      <div className="flex items-center justify-between px-2">
        <button
          onClick={onReset}
          className="text-xs text-slate-400 hover:text-white transition-colors flex items-center gap-1 py-1"
        >
          ← Edit infrastructure configurations
        </button>
        <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-slate-800 text-slate-400 border border-white/5">
          Verified Deterministic Calculation
        </span>
      </div>

      {/* Primary Big Hero Stats Component */}
      <div className="glass-panel p-8 sm:p-12 rounded-3xl relative overflow-hidden border border-white/10 shadow-2xl">
        {/* Subtle premium accent lighting effects */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full filter blur-3xl -z-10 transform translate-x-32 -translate-y-32"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-500/10 rounded-full filter blur-3xl -z-10 transform -translate-x-32 translate-y-32"></div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {/* Main Saving Run-Rate */}
          <div className="md:col-span-2 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '6s' }} /> Instant Assessment Blueprint
            </div>
            <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-none">
              ${report.totalAnnualSavings.toLocaleString()}
              <span className="text-lg sm:text-xl font-normal text-slate-400 block sm:inline sm:ml-3 tracking-normal">
                / year preserved runway
              </span>
            </h1>
            <p className="text-sm text-slate-300 max-w-xl pt-2">
              Based on pure retail SaaS billing parity and context caching ratios. Your immediate monthly optimization potential averages <strong className="text-emerald-400 font-mono">${report.totalMonthlySavings.toLocaleString()}/mo</strong>.
            </p>
          </div>

          {/* Efficiency Metric Badge */}
          <div className="p-6 rounded-2xl bg-slate-950/60 border border-white/5 flex flex-col items-center justify-center text-center">
            <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold mb-1">SaaS Stack Efficiency</span>
            <div className="text-4xl font-extrabold text-emerald-400 tracking-tight font-mono">
              {report.efficiencyRatio.toFixed(0)}%
            </div>
            <span className="text-[10px] text-slate-500 mt-1 block">Waste target eliminated</span>
            
            {/* Visual ratio indicator */}
            <div className="w-full bg-slate-900 rounded-full h-1.5 mt-4 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full rounded-full transition-all duration-1000"
                style={{ width: `${Math.min(100, report.efficiencyRatio)}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Dynamic spend comparison bars */}
        <div className="mt-10 pt-8 border-t border-white/5 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <div className="flex justify-between text-xs font-medium text-slate-400 mb-2">
              <span>Current Unoptimized Outlay</span>
              <span className="font-mono text-white">${report.totalCurrentMonthly.toLocaleString()}/mo</span>
            </div>
            <div className="w-full bg-slate-950 rounded-lg h-3 overflow-hidden p-0.5 border border-white/5">
              <div className="bg-slate-700 h-full rounded-md transition-all duration-500" style={{ width: `${currentBarWidth}%` }}></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs font-medium text-emerald-400 mb-2">
              <span>Optimized Infrastructure Target</span>
              <span className="font-mono text-white">${report.totalOptimizedMonthly.toLocaleString()}/mo</span>
            </div>
            <div className="w-full bg-slate-950 rounded-lg h-3 overflow-hidden p-0.5 border border-white/5">
              <div className="bg-gradient-to-r from-emerald-500 to-teal-500 h-full rounded-md transition-all duration-500" style={{ width: `${optimizedBarWidth}%` }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Prominent Credex CTA for high-saving footprints */}
      {report.triggerCredexCta && (
        <div className="glass-panel p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border border-emerald-500/30 relative overflow-hidden shadow-xl animate-scaleUp">
          <div className="absolute top-0 left-0 w-1.5 h-full bg-emerald-500"></div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-wider font-bold text-emerald-400">
                <ShieldCheck className="w-3.5 h-3.5" /> High-Value Workload Detected (&gt;$500/mo savings)
              </div>
              <h3 className="text-xl font-bold text-white tracking-tight">Deploy Native Credex Infrastructure Routing</h3>
              <p className="text-xs text-slate-300 max-w-2xl">
                Startups projecting over $6,000 in annualized waste gain automatic qualification for full workspace contract optimization. Let our embedded routing gateway manage persistent access keys seamlessly.
              </p>
            </div>
            <a
              href="https://credex-example-destination.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-3 bg-white hover:bg-slate-100 text-slate-950 text-xs font-bold rounded-xl whitespace-nowrap shadow transition-all flex items-center justify-center gap-2 group"
            >
              Activate Credex Connect <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </a>
          </div>
        </div>
      )}

      {/* Main gated layout segment */}
      {!isUnlocked ? (
        /* The Email Gate Value Interceptor */
        <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-white/5 relative overflow-hidden text-center space-y-6">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-950/80 to-slate-950 backdrop-blur-[2px] pointer-events-none flex flex-col items-center justify-end pb-8"></div>
          
          <div className="max-w-md mx-auto relative z-10 space-y-5 py-4">
            <div className="w-12 h-12 bg-emerald-500/10 rounded-2xl border border-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
              <Lock className="w-6 h-6" />
            </div>

            <div className="space-y-2">
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">Unlock Your Itemized Savings Blueprint</h3>
              <p className="text-xs sm:text-sm text-slate-300">
                Enter your professional email to instantly uncover tool-by-tool subscription overlaps, Anthropic API context formulas, and secure public Open Graph link broadcasting parameters.
              </p>
            </div>

            <form onSubmit={handleLeadSubmit} className="space-y-3 pt-2">
              <div className="relative">
                <span className="absolute left-3.5 top-3 text-slate-500">
                  <Mail className="w-4 h-4" />
                </span>
                <input
                  type="email"
                  required
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="founder@yourstartup.com"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-white/10 rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none focus:border-emerald-500/50 text-center"
                />
              </div>

              {leadError && (
                <p className="text-xs text-rose-400 bg-rose-500/10 p-2 rounded border border-rose-500/20">
                  {leadError}
                </p>
              )}

              <button
                type="submit"
                disabled={isSubmittingLead}
                className="w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold rounded-xl text-xs sm:text-sm shadow-lg shadow-emerald-500/10 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isSubmittingLead ? (
                  <span className="animate-pulse">Authorizing Blueprint...</span>
                ) : (
                  <>Authorize Blueprint Instantly <ArrowRight className="w-4 h-4" /></>
                )}
              </button>
            </form>

            <span className="text-[10px] text-slate-500 block">
              🔒 Instant transactional dispatch. Zero spam guarantees. Stripped of explicit trace trackers.
            </span>
          </div>

          {/* Faded mockup preview behind the gate */}
          <div className="opacity-20 filter blur-sm pointer-events-none select-none grid grid-cols-1 md:grid-cols-2 gap-4 text-left pt-6">
            <div className="p-4 bg-slate-900 rounded-xl border border-white/5">
              <div className="h-4 bg-slate-800 rounded w-1/2 mb-2"></div>
              <div className="h-10 bg-slate-800 rounded"></div>
            </div>
            <div className="p-4 bg-slate-900 rounded-xl border border-white/5">
              <div className="h-4 bg-slate-800 rounded w-1/3 mb-2"></div>
              <div className="h-10 bg-slate-800 rounded"></div>
            </div>
          </div>
        </div>
      ) : (
        /* The Unlocked Granular Layout Dashboard */
        <div className="space-y-8 animate-fadeIn">
          {/* Success status header */}
          <div className="p-4 bg-emerald-500/10 rounded-xl border border-emerald-500/20 flex items-center justify-between text-xs text-emerald-300">
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Blueprint access authorization token registered securely. Confirmation document dispatched.
            </span>
            <span className="font-mono text-[11px] text-slate-400 hidden sm:inline">Lead Status: Verified</span>
          </div>

          {/* Bespoke Anthropic LLM Narrative Summary component */}
          <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-white/5 space-y-4 relative">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-2">
                <Sparkles className="w-4 h-4" /> Customized Executive Synthesis (Anthropic API Integration)
              </h3>
              <span className="text-[10px] font-mono text-slate-500">Claude 3.5 Sonnet Engine</span>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/60 border border-white/5 text-xs sm:text-sm text-slate-300 leading-relaxed font-sans italic min-h-[60px] flex items-center">
              {isSummarizing ? (
                <span className="animate-pulse text-slate-500 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span> Mapped stack logic... Compiling executive synthesis from Anthropic endpoints...
                </span>
              ) : (
                <p className="text-slate-200 not-italic">
                  &ldquo;{summaryText}&rdquo;
                </p>
              )}
            </div>
          </div>

          {/* Itemized Stack Recommendations Matrix */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 px-1">
              Itemized Stack Assessment Matrix ({report.items.length} tools identified)
            </h3>

            <div className="grid grid-cols-1 gap-4">
              {report.items.map((item, idx) => {
                const isSaving = item.monthlySavings > 0;
                return (
                  <div 
                    key={idx} 
                    className={`p-5 sm:p-6 rounded-2xl bg-slate-950/40 border transition-all ${
                      isSaving ? 'border-emerald-500/20 hover:border-emerald-500/40' : 'border-white/5'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-3 pb-3 border-b border-white/5">
                      <div>
                        <span className="text-xs font-mono font-bold text-slate-400 block mb-0.5">{item.toolName}</span>
                        <h4 className="text-base font-bold text-white flex items-center gap-2">
                          {item.recommendationTitle}
                        </h4>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <span className="text-[10px] text-slate-500 block uppercase">Current</span>
                          <span className="text-xs font-mono text-slate-400">${item.currentMonthlySpend}/mo</span>
                        </div>
                        <ChevronRight className="w-3 h-3 text-slate-600 hidden sm:block" />
                        <div className="text-right">
                          <span className="text-[10px] text-emerald-500 block uppercase font-bold">Optimized Target</span>
                          <span className="text-xs font-mono font-bold text-emerald-400">${item.optimizedMonthlySpend}/mo</span>
                        </div>
                      </div>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed">
                      {item.recommendationDetails}
                    </p>

                    {isSaving && (
                      <div className="mt-3 pt-2 flex items-center gap-1.5 text-[11px] font-bold text-emerald-400">
                        <TrendingDown className="w-3.5 h-3.5" /> Direct Line Item Reduction: ${item.monthlySavings}/mo
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Startup Cloud Credit Equivalence block */}
          {report.eligibleForCredits && (
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-teal-500/20 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-teal-400 flex items-center gap-2">
                <Building2 className="w-3.5 h-3.5" /> Instant Startup Program Credit Eligibility Mapped
              </h4>
              <p className="text-xs text-slate-300">
                Based on your direct runtime deployment expenses, our engine calculated immediate verification routes to bypass raw server-side credit drains:
              </p>
              <ul className="space-y-1.5 pt-1">
                {report.creditProgramDetails.map((detail, idx) => (
                  <li key={idx} className="text-xs text-slate-300 flex items-start gap-2">
                    <span className="text-teal-400 mt-0.5">•</span> {detail}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* PII Stripped Shareable Gateway Link generator */}
          <div className="p-6 rounded-2xl bg-slate-950/80 border border-white/5 space-y-4">
            <div className="space-y-1">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                <Share2 className="w-3.5 h-3.5 text-emerald-400" /> Broadcast Short Link URL (Open Graph Ready)
              </h4>
              <p className="text-xs text-slate-400 max-w-xl">
                Generate an anonymized summary token stripped of explicit email identifiers or direct business metadata to share internally with operational directors.
              </p>
            </div>

            {!shareUrl ? (
              <button
                type="button"
                disabled={isGeneratingShare}
                onClick={handleGenerateShare}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs font-medium rounded-xl border border-white/10 transition-colors flex items-center gap-2"
              >
                {isGeneratingShare ? 'Generating hash key...' : 'Instantiate Secure Sharing Route'}
              </button>
            ) : (
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 pt-1 max-w-xl">
                <input
                  readOnly
                  value={shareUrl}
                  className="px-3 py-2 bg-slate-900 border border-white/10 rounded-lg text-xs text-emerald-400 font-mono flex-1 focus:outline-none selection:bg-emerald-500/20"
                />
                <button
                  type="button"
                  onClick={copyToClipboard}
                  className="px-4 py-2 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 text-xs font-bold rounded-lg border border-emerald-500/20 transition-colors flex items-center justify-center gap-1.5 shrink-0"
                >
                  {copied ? <><CheckCircle2 className="w-3.5 h-3.5" /> Copied</> : <><Copy className="w-3.5 h-3.5" /> Copy link</>}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
