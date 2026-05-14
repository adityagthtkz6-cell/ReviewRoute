'use client';

import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { MessageSquare, Send, CheckCircle, Loader2 } from 'lucide-react';

const IMPROVEMENTS = [
  'Speed of service',
  'Product quality',
  'Staff friendliness',
  'Pricing / value',
  'Cleanliness',
  'Menu variety',
];

function NeutralContent() {
  const params = useSearchParams();
  const id = params.get('id') || '';
  const [selected, setSelected] = useState<string[]>([]);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  void id;

  function toggleItem(item: string) {
    setSelected((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  }

  async function handleSubmit() {
    if (selected.length === 0 && !comment.trim()) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setSubmitted(true);
    setLoading(false);
  }

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 px-4">
        <div className="w-full max-w-md text-center">
          <div className="rounded-2xl border border-blue-700/30 bg-slate-900/90 backdrop-blur-xl shadow-2xl p-10">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-500/20">
              <CheckCircle className="h-8 w-8 text-blue-400" />
            </div>
            <h2 className="text-xl font-bold text-white mb-2">Feedback Received!</h2>
            <p className="text-slate-400 text-sm mb-6">
              Your insights go directly to our team and help us get better every day.
            </p>
            <Link
              href="/"
              className="inline-block rounded-xl border border-slate-700 px-6 py-3 text-sm text-slate-300 hover:border-slate-500 hover:text-white transition-all"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 px-4 py-12">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 h-[500px] w-[500px] rounded-full bg-blue-600/15 blur-3xl" />
      </div>

      <div className="w-full max-w-md">
        <div className="rounded-2xl border border-blue-700/30 bg-slate-900/90 backdrop-blur-xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6 text-center">
            <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-white/20 backdrop-blur">
              <MessageSquare className="h-7 w-7 text-white" />
            </div>
            <h1 className="text-xl font-bold text-white">Thanks for your feedback</h1>
            <p className="text-sm text-blue-100 mt-1">Help us understand how we can do better</p>
          </div>

          {/* Body */}
          <div className="px-8 py-8">
            <p className="text-sm font-medium text-slate-300 mb-4">
              What areas could we improve?{' '}
              <span className="text-slate-500 font-normal">(select all that apply)</span>
            </p>

            <div className="grid grid-cols-2 gap-2 mb-6">
              {IMPROVEMENTS.map((item) => (
                <button
                  key={item}
                  onClick={() => toggleItem(item)}
                  className={`rounded-lg border px-3 py-2 text-left text-sm transition-all ${
                    selected.includes(item)
                      ? 'border-blue-500 bg-blue-500/20 text-blue-300'
                      : 'border-slate-700 bg-slate-800 text-slate-400 hover:border-slate-600 hover:text-slate-200'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Anything else to share?{' '}
                <span className="text-slate-500 font-normal">(optional)</span>
              </label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={3}
                placeholder="Share any specific details…"
                className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-sm text-slate-100 placeholder-slate-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none transition-colors"
              />
            </div>

            <button
              onClick={handleSubmit}
              disabled={loading || (selected.length === 0 && !comment.trim())}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3.5 text-sm font-semibold text-white hover:from-blue-500 hover:to-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-blue-500/25 mb-4"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Sending…
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  Send Feedback
                </>
              )}
            </button>

            <p className="text-center text-xs text-slate-600">
              Your feedback is private and never posted publicly
            </p>
          </div>
        </div>

        <p className="mt-4 text-center text-xs text-slate-600">
          Powered by{' '}
          <Link href="/" className="text-indigo-400 hover:text-indigo-300 transition-colors">
            ReviewRoute
          </Link>
        </p>
      </div>
    </div>
  );
}

export default function NeutralPage() {
  return (
    <Suspense>
      <NeutralContent />
    </Suspense>
  );
}
