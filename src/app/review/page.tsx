'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Star, Send, Loader2 } from 'lucide-react';

const BUSINESS_NAME = 'Coastal Coffee Co.';

const labels: Record<number, string> = {
  1: 'Very Poor',
  2: 'Poor',
  3: 'Okay',
  4: 'Good',
  5: 'Excellent!',
};

export default function ReviewPage() {
  const router = useRouter();
  const [stars, setStars] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const active = hovered || stars;

  async function handleSubmit() {
    if (stars === 0) {
      setError('Please select a star rating to continue.');
      return;
    }
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ stars, comment, businessId: 'demo', channel: 'web' }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Submission failed');
      router.push(data.routingPath);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-950 px-4 py-12">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 h-[500px] w-[500px] rounded-full bg-indigo-600/15 blur-3xl" />
      </div>

      <div className="w-full max-w-md">
        {/* Card */}
        <div className="rounded-2xl border border-slate-700/50 bg-slate-900/90 backdrop-blur-xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-violet-600 px-8 py-6 text-center">
            <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 backdrop-blur">
              <Star className="h-6 w-6 fill-white text-white" />
            </div>
            <h1 className="text-lg font-bold text-white">{BUSINESS_NAME}</h1>
            <p className="text-sm text-indigo-200 mt-0.5">We value your feedback</p>
          </div>

          {/* Body */}
          <div className="px-8 py-8">
            <p className="text-center text-lg font-semibold text-white mb-2">
              How was your experience?
            </p>
            <p className="text-center text-sm text-slate-400 mb-8">
              Your honest feedback helps us improve
            </p>

            {/* Stars */}
            <div className="flex justify-center gap-2 mb-3">
              {[1, 2, 3, 4, 5].map((s) => (
                <button
                  key={s}
                  onClick={() => setStars(s)}
                  onMouseEnter={() => setHovered(s)}
                  onMouseLeave={() => setHovered(0)}
                  className="star-btn transition-transform hover:scale-110 active:scale-95"
                  aria-label={`Rate ${s} stars`}
                >
                  <Star
                    className={`h-10 w-10 transition-all duration-150 ${
                      s <= active
                        ? 'fill-amber-400 text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]'
                        : 'text-slate-600'
                    }`}
                  />
                </button>
              ))}
            </div>

            {/* Label */}
            <div className="text-center h-5 mb-6">
              {active > 0 && (
                <span className="text-sm font-medium text-amber-400">{labels[active]}</span>
              )}
            </div>

            {/* Comment */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Tell us more{' '}
                <span className="text-slate-500 font-normal">(optional)</span>
              </label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                maxLength={500}
                rows={3}
                placeholder="What went well? What could be better?"
                className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-sm text-slate-100 placeholder-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 resize-none transition-colors"
              />
              <div className="mt-1 text-right text-xs text-slate-600">{comment.length}/500</div>
            </div>

            {/* Error */}
            {error && (
              <div className="mb-4 rounded-lg border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-400">
                {error}
              </div>
            )}

            {/* Submit */}
            <button
              onClick={handleSubmit}
              disabled={loading || stars === 0}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-6 py-3.5 text-sm font-semibold text-white hover:from-indigo-500 hover:to-violet-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-indigo-500/25"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Analyzing your feedback…
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  Submit Review
                </>
              )}
            </button>

            <p className="mt-4 text-center text-xs text-slate-600">
              Your response is private and secure
            </p>
          </div>
        </div>

        <p className="mt-4 text-center text-xs text-slate-600">
          Powered by{' '}
          <a href="/" className="text-indigo-400 hover:text-indigo-300 transition-colors">
            ReviewRoute
          </a>
        </p>
      </div>
    </div>
  );
}
