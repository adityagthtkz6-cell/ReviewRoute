import Link from 'next/link';
import {
  Star,
  TrendingUp,
  Shield,
  Zap,
  MessageSquare,
  BarChart2,
  ArrowRight,
  CheckCircle,
} from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-slate-800/60 bg-slate-950/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600">
              <Star className="h-4 w-4 fill-white text-white" />
            </div>
            <span className="text-lg font-bold tracking-tight">ReviewRoute</span>
          </div>
          <div className="hidden items-center gap-8 text-sm text-slate-400 md:flex">
            <a href="#how-it-works" className="hover:text-white transition-colors">How it works</a>
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#metrics" className="hover:text-white transition-colors">Results</a>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/dashboard"
              className="rounded-lg border border-slate-700 px-4 py-2 text-sm font-medium text-slate-300 hover:border-slate-500 hover:text-white transition-all"
            >
              Dashboard
            </Link>
            <Link
              href="/review"
              className="rounded-lg bg-gradient-to-r from-indigo-600 to-violet-600 px-4 py-2 text-sm font-semibold text-white hover:from-indigo-500 hover:to-violet-500 transition-all shadow-lg shadow-indigo-500/25"
            >
              Try Demo
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden pt-32 pb-24 px-6">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 h-[600px] w-[600px] rounded-full bg-indigo-600/10 blur-3xl" />
          <div className="absolute top-1/3 left-1/4 h-[400px] w-[400px] rounded-full bg-violet-600/10 blur-3xl" />
        </div>
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5 text-sm text-indigo-300">
            <Zap className="h-3.5 w-3.5" />
            AI-Powered Review Sentiment Routing
          </div>
          <h1 className="mb-6 text-5xl font-extrabold tracking-tight md:text-7xl">
            Turn Happy Customers
            <br />
            <span className="text-gradient">Into Google Reviews</span>
          </h1>
          <p className="mb-10 text-lg text-slate-400 md:text-xl max-w-2xl mx-auto leading-relaxed">
            ReviewRoute automatically detects review sentiment and routes satisfied customers to
            Google — while privately capturing unhappy ones before they go public.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/review"
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-8 py-4 text-base font-semibold text-white hover:from-indigo-500 hover:to-violet-500 transition-all shadow-xl shadow-indigo-500/30"
            >
              Try the Live Demo
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/dashboard"
              className="flex items-center gap-2 rounded-xl border border-slate-700 px-8 py-4 text-base font-medium text-slate-300 hover:border-slate-500 hover:text-white transition-all"
            >
              <BarChart2 className="h-4 w-4" />
              View Dashboard
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section id="metrics" className="py-16 px-6 border-y border-slate-800/50">
        <div className="mx-auto max-w-6xl grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { value: '5×', label: 'More Google Reviews', color: 'text-indigo-400' },
            { value: '90%', label: 'Negative Review Catch Rate', color: 'text-emerald-400' },
            { value: '4.7★', label: 'Average Client Rating', color: 'text-amber-400' },
            { value: '<2s', label: 'Sentiment Classification', color: 'text-violet-400' },
          ].map((stat) => (
            <div key={stat.label}>
              <div className={`text-4xl font-extrabold ${stat.color}`}>{stat.value}</div>
              <div className="mt-1 text-sm text-slate-500">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 px-6">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold md:text-4xl">How ReviewRoute Works</h2>
            <p className="mt-3 text-slate-400">Three steps, fully automated.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                icon: <Star className="h-6 w-6" />,
                title: 'Customer Rates Their Experience',
                desc: 'A short 1–5 star rating prompt is sent after a transaction, support interaction, or product use — via web widget, email, or SMS.',
                color: 'from-indigo-500/20 to-indigo-500/5',
                border: 'border-indigo-500/20',
                iconColor: 'text-indigo-400',
              },
              {
                step: '02',
                icon: <Zap className="h-6 w-6" />,
                title: 'AI Analyzes Sentiment in Real-Time',
                desc: 'The dual-signal engine combines the star rating and free-text comment to classify sentiment as positive, neutral, or negative — in under 2 seconds.',
                color: 'from-violet-500/20 to-violet-500/5',
                border: 'border-violet-500/20',
                iconColor: 'text-violet-400',
              },
              {
                step: '03',
                icon: <TrendingUp className="h-6 w-6" />,
                title: 'Smart Routing Takes Action',
                desc: 'Happy customers go to Google Reviews. Neutral customers see a private feedback form. Unhappy customers are routed to support — before they post publicly.',
                color: 'from-emerald-500/20 to-emerald-500/5',
                border: 'border-emerald-500/20',
                iconColor: 'text-emerald-400',
              },
            ].map((item) => (
              <div
                key={item.step}
                className={`rounded-2xl border ${item.border} bg-gradient-to-b ${item.color} p-8`}
              >
                <div className="mb-4 flex items-center gap-3">
                  <span className="text-xs font-bold text-slate-600">STEP {item.step}</span>
                </div>
                <div className={`mb-4 ${item.iconColor}`}>{item.icon}</div>
                <h3 className="mb-3 text-lg font-semibold text-white">{item.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Routing Logic Visual */}
      <section className="py-16 px-6">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8">
            <h3 className="mb-6 text-center text-xl font-semibold">Sentiment Routing Logic</h3>
            <div className="grid md:grid-cols-3 gap-4">
              {[
                {
                  range: '4.0 – 5.0 ★',
                  label: 'Positive',
                  action: '→ Google Review Link',
                  bg: 'bg-emerald-500/10 border-emerald-500/30',
                  badge: 'bg-emerald-500/20 text-emerald-300',
                  icon: '🌟',
                },
                {
                  range: '3.0 – 3.9 ★',
                  label: 'Neutral',
                  action: '→ Internal Feedback Form',
                  bg: 'bg-amber-500/10 border-amber-500/30',
                  badge: 'bg-amber-500/20 text-amber-300',
                  icon: '💬',
                },
                {
                  range: '1.0 – 2.9 ★',
                  label: 'Negative',
                  action: '→ Support Escalation',
                  bg: 'bg-rose-500/10 border-rose-500/30',
                  badge: 'bg-rose-500/20 text-rose-300',
                  icon: '🛡️',
                },
              ].map((r) => (
                <div key={r.label} className={`rounded-xl border ${r.bg} p-5`}>
                  <div className="text-2xl mb-2">{r.icon}</div>
                  <div className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${r.badge} mb-3`}>
                    {r.label}
                  </div>
                  <div className="text-lg font-bold text-white mb-1">{r.range}</div>
                  <div className="text-sm text-slate-400">{r.action}</div>
                </div>
              ))}
            </div>
            <p className="mt-4 text-center text-xs text-slate-600">
              Thresholds are fully configurable per business
            </p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 px-6">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold md:text-4xl">Everything You Need</h2>
            <p className="mt-3 text-slate-400">Built for businesses serious about their reputation.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: <Zap className="h-5 w-5 text-indigo-400" />,
                title: 'Real-Time AI Sentiment',
                desc: 'Dual-signal analysis: star rating + NLP text analysis. Conflict detection flags mismatches for human review.',
              },
              {
                icon: <Shield className="h-5 w-5 text-emerald-400" />,
                title: 'Negative Review Interception',
                desc: 'Unhappy customers see a private support path. Business is notified within 5 minutes. Nothing goes public.',
              },
              {
                icon: <Star className="h-5 w-5 text-amber-400" />,
                title: 'Google Review Deep Links',
                desc: 'One-click redirect to your Google Business Profile. Track click-throughs and conversions in real time.',
              },
              {
                icon: <MessageSquare className="h-5 w-5 text-violet-400" />,
                title: 'Embeddable Widget',
                desc: 'One-line script tag for web. Works in email and SMS. Mobile-first, WCAG 2.1 AA compliant.',
              },
              {
                icon: <BarChart2 className="h-5 w-5 text-blue-400" />,
                title: 'Business Dashboard',
                desc: 'Track avg rating, Google conversion rate, negative catch rate, and all review responses with filters.',
              },
              {
                icon: <TrendingUp className="h-5 w-5 text-rose-400" />,
                title: 'Configurable Thresholds',
                desc: 'Set your own positive/neutral/negative bands. A restaurant might need 3.5+; a SaaS might require 4.5+.',
              },
            ].map((f) => (
              <div key={f.title} className="rounded-xl border border-slate-800 bg-slate-900 p-6 hover:border-slate-700 transition-colors">
                <div className="mb-3">{f.icon}</div>
                <h3 className="mb-2 font-semibold text-white">{f.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6">
        <div className="mx-auto max-w-3xl text-center">
          <div className="rounded-2xl border border-indigo-500/20 bg-gradient-to-b from-indigo-500/10 to-transparent p-12">
            <h2 className="mb-4 text-3xl font-bold">Ready to See It in Action?</h2>
            <p className="mb-8 text-slate-400">
              Try the live demo — submit a review and watch the routing logic work in real time.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/review"
                className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-8 py-4 text-base font-semibold text-white hover:from-indigo-500 hover:to-violet-500 transition-all shadow-xl shadow-indigo-500/30"
              >
                Submit a Test Review
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/dashboard"
                className="flex items-center gap-2 rounded-xl border border-slate-700 px-8 py-4 text-base font-medium text-slate-300 hover:border-slate-500 hover:text-white transition-all"
              >
                View Dashboard
              </Link>
            </div>
            <div className="mt-6 flex items-center justify-center gap-2 text-sm text-slate-600">
              <CheckCircle className="h-4 w-4" />
              No account required for demo
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800/50 py-8 px-6 text-center text-sm text-slate-600">
        <div className="flex items-center justify-center gap-2 mb-2">
          <div className="flex h-5 w-5 items-center justify-center rounded bg-gradient-to-br from-indigo-500 to-violet-600">
            <Star className="h-3 w-3 fill-white text-white" />
          </div>
          <span className="font-semibold text-slate-400">ReviewRoute</span>
        </div>
        <p>AI-Powered Review Sentiment Routing — v1.0</p>
      </footer>
    </div>
  );
}
