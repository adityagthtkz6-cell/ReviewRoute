'use client';

import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Heart, Send, CheckCircle, Loader2, Mail, Phone } from 'lucide-react';

function NegativeContent() {
  const params = useSearchParams();
  const id = params.get('id') || '';
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  void id;

  function validate() {
    const e: Record<string, string> = {};
    if (!name.trim()) e.name = 'Please enter your name';
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) e.email = 'Please enter a valid email';
    if (!message.trim()) e.message = 'Please describe what went wrong';
    return e;
  }

  async function handleSubmit() {
    const e = validate();
    if (Object.keys(e).length > 0) {
      setErrors(e);
      return;
    }
    setErrors({});
    setLoading(true);
    await new Promise((r) => setTimeout(r, 900));
    setSubmitted(true);
    setLoading(false);
  }

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-rose-950 to-slate-950 px-4">
        <div className="w-full max-w-md text-center">
          <div className="rounded-2xl border border-rose-700/30 bg-slate-900/90 backdrop-blur-xl shadow-2xl p-10">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-rose-500/20">
              <CheckCircle className="h-8 w-8 text-rose-400" />
            </div>
            <h2 className="text-xl font-bold text-white mb-2">We&apos;re on it.</h2>
            <p className="text-slate-400 text-sm mb-2">
              A member of our team will reach out to you within 24 hours.
            </p>
            <p className="text-slate-500 text-xs mb-6">
              We&apos;re committed to making this right.
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-rose-950 to-slate-950 px-4 py-12">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 h-[500px] w-[500px] rounded-full bg-rose-600/10 blur-3xl" />
      </div>

      <div className="w-full max-w-md">
        <div className="rounded-2xl border border-rose-700/30 bg-slate-900/90 backdrop-blur-xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-rose-700 to-pink-700 px-8 py-6 text-center">
            <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-white/20 backdrop-blur">
              <Heart className="h-7 w-7 text-white" />
            </div>
            <h1 className="text-xl font-bold text-white">We&apos;re truly sorry</h1>
            <p className="text-sm text-rose-100 mt-1">
              Your experience matters deeply to us
            </p>
          </div>

          {/* Body */}
          <div className="px-8 py-8">
            <div className="rounded-xl border border-amber-500/20 bg-amber-500/10 px-4 py-3 mb-6">
              <p className="text-sm text-amber-200">
                We&apos;d love the chance to make this right. Please share what happened and
                we&apos;ll personally follow up with you.
              </p>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1.5">
                  Your name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Jane Smith"
                  className={`w-full rounded-xl border px-4 py-3 text-sm text-slate-100 placeholder-slate-500 bg-slate-800 focus:outline-none focus:ring-1 transition-colors ${
                    errors.name
                      ? 'border-rose-500 focus:border-rose-500 focus:ring-rose-500'
                      : 'border-slate-700 focus:border-rose-500 focus:ring-rose-500'
                  }`}
                />
                {errors.name && (
                  <p className="mt-1 text-xs text-rose-400">{errors.name}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1.5">
                  Email address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="jane@example.com"
                  className={`w-full rounded-xl border px-4 py-3 text-sm text-slate-100 placeholder-slate-500 bg-slate-800 focus:outline-none focus:ring-1 transition-colors ${
                    errors.email
                      ? 'border-rose-500 focus:border-rose-500 focus:ring-rose-500'
                      : 'border-slate-700 focus:border-rose-500 focus:ring-rose-500'
                  }`}
                />
                {errors.email && (
                  <p className="mt-1 text-xs text-rose-400">{errors.email}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1.5">
                  What went wrong?
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={4}
                  placeholder="Please describe your experience so we can investigate and make it right…"
                  className={`w-full rounded-xl border px-4 py-3 text-sm text-slate-100 placeholder-slate-500 bg-slate-800 focus:outline-none focus:ring-1 resize-none transition-colors ${
                    errors.message
                      ? 'border-rose-500 focus:border-rose-500 focus:ring-rose-500'
                      : 'border-slate-700 focus:border-rose-500 focus:ring-rose-500'
                  }`}
                />
                {errors.message && (
                  <p className="mt-1 text-xs text-rose-400">{errors.message}</p>
                )}
              </div>
            </div>

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-rose-700 to-pink-700 px-6 py-3.5 text-sm font-semibold text-white hover:from-rose-600 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-rose-500/25 mb-4"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Sending to our team…
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  Contact Support Team
                </>
              )}
            </button>

            {/* Alternative contacts */}
            <div className="border-t border-slate-800 pt-4">
              <p className="text-center text-xs text-slate-500 mb-3">Or reach us directly</p>
              <div className="flex justify-center gap-6">
                <a
                  href="mailto:support@coastalcoffee.com"
                  className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-300 transition-colors"
                >
                  <Mail className="h-3.5 w-3.5" />
                  Email Support
                </a>
                <a
                  href="tel:+15551234567"
                  className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-300 transition-colors"
                >
                  <Phone className="h-3.5 w-3.5" />
                  Call Us
                </a>
              </div>
            </div>

            <p className="mt-4 text-center text-xs text-slate-600">
              Your response is private and goes directly to our team — never posted publicly
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

export default function NegativePage() {
  return (
    <Suspense>
      <NegativeContent />
    </Suspense>
  );
}
