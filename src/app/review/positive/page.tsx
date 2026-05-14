'use client';

import { useSearchParams } from 'next/navigation';
import { useState, Suspense } from 'react';
import Link from 'next/link';
import { Star, ExternalLink, CheckCircle } from 'lucide-react';

const GOOGLE_REVIEW_URL =
  process.env.NEXT_PUBLIC_GOOGLE_REVIEW_URL ||
  'https://search.google.com/local/writereview?placeid=ChIJN1t_tDeuEmsRUsoyG83frY4';

function PositiveContent() {
  const params = useSearchParams();
  const id = params.get('id') || '';
  const [clicked, setClicked] = useState(false);

  async function handleGoogleClick() {
    setClicked(true);
    if (id) {
      await fetch('/api/google-click', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      }).catch(() => {});
    }
    window.open(GOOGLE_REVIEW_URL, '_blank', 'noopener,noreferrer');
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-emerald-950 to-slate-950 px-4 py-12">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 h-[500px] w-[500px] rounded-full bg-emerald-600/15 blur-3xl" />
      </div>

      <div className="w-full max-w-md text-center">
        <div className="rounded-2xl border border-emerald-700/30 bg-slate-900/90 backdrop-blur-xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-emerald-600 to-teal-600 px-8 py-6">
            <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-white/20 backdrop-blur">
              <span className="text-3xl">🎉</span>
            </div>
            <h1 className="text-xl font-bold text-white">You made our day!</h1>
            <p className="text-sm text-emerald-100 mt-1">Thank you for the wonderful feedback</p>
          </div>

          {/* Body */}
          <div className="px-8 py-8">
            <div className="flex justify-center gap-1 mb-4">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} className="h-6 w-6 fill-amber-400 text-amber-400" />
              ))}
            </div>

            <p className="text-slate-300 mb-2 font-medium">
              Would you mind sharing your experience on Google?
            </p>
            <p className="text-sm text-slate-500 mb-8">
              It takes less than 60 seconds and helps others discover us.
            </p>

            {clicked ? (
              <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4 mb-4">
                <div className="flex items-center justify-center gap-2 text-emerald-400">
                  <CheckCircle className="h-5 w-5" />
                  <span className="font-medium">Google Review page opened!</span>
                </div>
                <p className="text-sm text-slate-500 mt-1">Thank you so much for your support.</p>
              </div>
            ) : (
              <button
                onClick={handleGoogleClick}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-3.5 text-sm font-semibold text-white hover:from-emerald-500 hover:to-teal-500 transition-all shadow-lg shadow-emerald-500/25 mb-4"
              >
                <ExternalLink className="h-4 w-4" />
                Leave a Google Review
              </button>
            )}

            <Link
              href="/review"
              className="block text-sm text-slate-600 hover:text-slate-400 transition-colors"
            >
              Maybe later
            </Link>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-center gap-4 text-xs text-slate-700">
          <span>Powered by</span>
          <Link href="/" className="text-indigo-400 hover:text-indigo-300 transition-colors">
            ReviewRoute
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function PositivePage() {
  return (
    <Suspense>
      <PositiveContent />
    </Suspense>
  );
}
