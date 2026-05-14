'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Star,
  TrendingUp,
  Shield,
  BarChart2,
  AlertTriangle,
  RefreshCw,
  ExternalLink,
  Filter,
  Download,
} from 'lucide-react';
import { ReviewResponse, DashboardStats } from '@/types';
import {
  formatRelativeTime,
  getSentimentColor,
  getRoutingLabel,
  getRoutingColor,
} from '@/lib/utils';

const SENTIMENT_FILTERS = ['all', 'positive', 'neutral', 'negative'] as const;
const CHANNEL_FILTERS = ['all', 'web', 'email', 'sms'] as const;

function StarDisplay({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          className={`h-3.5 w-3.5 ${s <= count ? 'fill-amber-400 text-amber-400' : 'text-slate-700'}`}
        />
      ))}
    </div>
  );
}

function StatCard({
  label,
  value,
  sub,
  icon,
  color,
}: {
  label: string;
  value: string | number;
  sub?: string;
  icon: React.ReactNode;
  color: string;
}) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">
      <div className="flex items-start justify-between mb-3">
        <p className="text-sm text-slate-500">{label}</p>
        <div className={`rounded-lg p-2 ${color}`}>{icon}</div>
      </div>
      <p className="text-2xl font-bold text-white mb-1">{value}</p>
      {sub && <p className="text-xs text-slate-500">{sub}</p>}
    </div>
  );
}

export default function DashboardPage() {
  const [responses, setResponses] = useState<ReviewResponse[]>([]);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [sentiment, setSentiment] = useState<(typeof SENTIMENT_FILTERS)[number]>('all');
  const [channel, setChannel] = useState<(typeof CHANNEL_FILTERS)[number]>('all');
  const [loading, setLoading] = useState(true);
  const [lastRefreshed, setLastRefreshed] = useState<Date>(new Date());

  async function fetchData() {
    setLoading(true);
    try {
      const params = new URLSearchParams({ businessId: 'demo' });
      if (sentiment !== 'all') params.set('sentiment', sentiment);
      if (channel !== 'all') params.set('channel', channel);

      const res = await fetch(`/api/responses?${params}`);
      const data = await res.json();
      setResponses(data.responses || []);
      setStats(data.stats || null);
      setLastRefreshed(new Date());
    } catch {
      /* silently ignore */
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, [sentiment, channel]);

  function exportCSV() {
    const headers = ['ID', 'Stars', 'Sentiment', 'Confidence', 'Routing', 'Channel', 'Flagged', 'Comment', 'Date'];
    const rows = responses.map((r) => [
      r.id,
      r.stars,
      r.sentiment,
      r.confidence,
      r.routingOutcome,
      r.channel,
      r.flagged ? 'Yes' : 'No',
      `"${(r.comment || '').replace(/"/g, '""')}"`,
      r.createdAt,
    ]);
    const csv = [headers, ...rows].map((r) => r.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `reviewroute-export-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  const avgRatingDisplay = stats ? `${stats.avgRating.toFixed(1)} ★` : '—';
  const googleConvDisplay = stats ? `${stats.googleConversionRate}%` : '—';

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Top bar */}
      <header className="sticky top-0 z-40 border-b border-slate-800 bg-slate-950/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600">
                <Star className="h-3.5 w-3.5 fill-white text-white" />
              </div>
              <span className="font-bold tracking-tight">ReviewRoute</span>
            </Link>
            <span className="text-slate-700">/</span>
            <span className="text-sm text-slate-400">Dashboard</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-600">
              Refreshed {formatRelativeTime(lastRefreshed.toISOString())}
            </span>
            <button
              onClick={fetchData}
              disabled={loading}
              className="flex items-center gap-1.5 rounded-lg border border-slate-700 px-3 py-1.5 text-xs text-slate-400 hover:border-slate-600 hover:text-white transition-all"
            >
              <RefreshCw className={`h-3.5 w-3.5 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </button>
            <Link
              href="/review"
              className="flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-indigo-600 to-violet-600 px-3 py-1.5 text-xs font-semibold text-white hover:from-indigo-500 hover:to-violet-500 transition-all"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              Test Widget
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-8">
        {/* Business header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">Coastal Coffee Co.</h1>
            <p className="text-sm text-slate-500">
              {stats ? `${stats.totalReviews} total reviews` : 'Loading…'}
            </p>
          </div>
          <button
            onClick={exportCSV}
            className="flex items-center gap-2 rounded-lg border border-slate-700 px-4 py-2 text-sm text-slate-400 hover:border-slate-600 hover:text-white transition-all"
          >
            <Download className="h-4 w-4" />
            Export CSV
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <StatCard
            label="Average Rating"
            value={avgRatingDisplay}
            sub="Across all reviews"
            icon={<Star className="h-4 w-4" />}
            color="bg-amber-500/10 text-amber-400"
          />
          <StatCard
            label="Google Conversions"
            value={googleConvDisplay}
            sub={`${stats?.positiveCount ?? 0} positive reviews`}
            icon={<TrendingUp className="h-4 w-4" />}
            color="bg-emerald-500/10 text-emerald-400"
          />
          <StatCard
            label="Negative Intercepted"
            value={stats?.negativeIntercepted ?? '—'}
            sub="Routed to support"
            icon={<Shield className="h-4 w-4" />}
            color="bg-rose-500/10 text-rose-400"
          />
          <StatCard
            label="Flagged for Review"
            value={stats?.flaggedCount ?? '—'}
            sub="Needs manual check"
            icon={<AlertTriangle className="h-4 w-4" />}
            color="bg-amber-500/10 text-amber-400"
          />
        </div>

        {/* Sentiment Distribution */}
        {stats && (
          <div className="mb-8 rounded-xl border border-slate-800 bg-slate-900 p-6">
            <div className="flex items-center gap-2 mb-4">
              <BarChart2 className="h-4 w-4 text-slate-500" />
              <h2 className="text-sm font-semibold text-slate-300">Sentiment Distribution</h2>
            </div>
            <div className="flex gap-3 mb-3">
              {[
                { label: 'Positive', count: stats.positiveCount, color: 'bg-emerald-500', text: 'text-emerald-400' },
                { label: 'Neutral', count: stats.neutralCount, color: 'bg-amber-500', text: 'text-amber-400' },
                { label: 'Negative', count: stats.negativeCount, color: 'bg-rose-500', text: 'text-rose-400' },
              ].map((s) => (
                <div key={s.label} className="flex-1">
                  <div className="flex justify-between mb-1">
                    <span className={`text-xs font-medium ${s.text}`}>{s.label}</span>
                    <span className="text-xs text-slate-500">
                      {stats.totalReviews > 0
                        ? Math.round((s.count / stats.totalReviews) * 100)
                        : 0}
                      %
                    </span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-800">
                    <div
                      className={`h-2 rounded-full ${s.color} transition-all`}
                      style={{
                        width: stats.totalReviews > 0
                          ? `${(s.count / stats.totalReviews) * 100}%`
                          : '0%',
                      }}
                    />
                  </div>
                  <p className="mt-1 text-xs text-slate-600">{s.count} reviews</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Review Feed */}
        <div className="rounded-xl border border-slate-800 bg-slate-900">
          {/* Filters */}
          <div className="flex flex-wrap items-center gap-3 border-b border-slate-800 px-6 py-4">
            <Filter className="h-4 w-4 text-slate-600" />
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500">Sentiment:</span>
              {SENTIMENT_FILTERS.map((f) => (
                <button
                  key={f}
                  onClick={() => setSentiment(f)}
                  className={`rounded-full px-3 py-1 text-xs font-medium transition-all capitalize ${
                    sentiment === f
                      ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                      : 'text-slate-500 hover:text-slate-300'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
            <div className="ml-4 flex items-center gap-2">
              <span className="text-xs text-slate-500">Channel:</span>
              {CHANNEL_FILTERS.map((f) => (
                <button
                  key={f}
                  onClick={() => setChannel(f)}
                  className={`rounded-full px-3 py-1 text-xs font-medium transition-all capitalize ${
                    channel === f
                      ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                      : 'text-slate-500 hover:text-slate-300'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
            <span className="ml-auto text-xs text-slate-600">
              {responses.length} review{responses.length !== 1 ? 's' : ''}
            </span>
          </div>

          {/* Table header */}
          <div className="hidden md:grid grid-cols-12 gap-4 border-b border-slate-800/50 px-6 py-3 text-xs font-medium uppercase tracking-wider text-slate-600">
            <div className="col-span-1">Stars</div>
            <div className="col-span-4">Comment</div>
            <div className="col-span-2">Sentiment</div>
            <div className="col-span-2">Routing</div>
            <div className="col-span-1">Channel</div>
            <div className="col-span-1">Conf.</div>
            <div className="col-span-1">Time</div>
          </div>

          {/* Rows */}
          {loading ? (
            <div className="flex items-center justify-center py-16 text-slate-600">
              <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
              Loading reviews…
            </div>
          ) : responses.length === 0 ? (
            <div className="py-16 text-center text-slate-600">
              <BarChart2 className="mx-auto mb-2 h-8 w-8 opacity-30" />
              <p>No reviews match the current filters</p>
            </div>
          ) : (
            <div className="divide-y divide-slate-800/50">
              {responses.map((r) => (
                <div
                  key={r.id}
                  className={`grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-4 px-6 py-4 hover:bg-slate-800/30 transition-colors ${
                    r.flagged ? 'border-l-2 border-amber-500/50' : ''
                  }`}
                >
                  {/* Stars */}
                  <div className="col-span-1 flex items-center">
                    <StarDisplay count={r.stars} />
                  </div>

                  {/* Comment */}
                  <div className="col-span-4 flex items-center">
                    <div>
                      <p className="text-sm text-slate-300 line-clamp-2">
                        {r.comment || (
                          <span className="italic text-slate-600">No comment provided</span>
                        )}
                      </p>
                      {r.flagged && (
                        <div className="mt-1 flex items-center gap-1 text-xs text-amber-500">
                          <AlertTriangle className="h-3 w-3" />
                          <span>{r.flagReason || 'Flagged for review'}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Sentiment */}
                  <div className="col-span-2 flex items-center">
                    <span
                      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium capitalize ${getSentimentColor(r.sentiment)}`}
                    >
                      {r.sentiment}
                    </span>
                  </div>

                  {/* Routing */}
                  <div className="col-span-2 flex items-center">
                    <div>
                      <span
                        className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${getRoutingColor(r.routingOutcome)}`}
                      >
                        {getRoutingLabel(r.routingOutcome)}
                      </span>
                      {r.routingOutcome === 'google_review' && (
                        <p className="mt-0.5 text-xs text-slate-600">
                          {r.googleClicked ? '✓ Clicked' : '○ Not clicked'}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Channel */}
                  <div className="col-span-1 flex items-center">
                    <span className="text-xs capitalize text-slate-500">{r.channel}</span>
                  </div>

                  {/* Confidence */}
                  <div className="col-span-1 flex items-center">
                    <span
                      className={`text-xs font-mono ${
                        r.confidence >= 0.7
                          ? 'text-emerald-500'
                          : r.confidence >= 0.5
                          ? 'text-amber-500'
                          : 'text-rose-500'
                      }`}
                    >
                      {Math.round(r.confidence * 100)}%
                    </span>
                  </div>

                  {/* Time */}
                  <div className="col-span-1 flex items-center">
                    <span className="text-xs text-slate-600">
                      {formatRelativeTime(r.createdAt)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer note */}
        <p className="mt-6 text-center text-xs text-slate-700">
          Data shown is for the demo business (Coastal Coffee Co.) — stored in-memory for this MVP
        </p>
      </main>
    </div>
  );
}
