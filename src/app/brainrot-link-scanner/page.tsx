'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

type RiskLevel = 'safe' | 'caution' | 'risky';
type SignalStatus = 'pass' | 'warn' | 'fail';

interface Signal {
  label: string;
  status: SignalStatus;
  detail: string;
}

interface ScanResult {
  normalizedUrl: string;
  host: string;
  riskScore: number;
  verdict: string;
  riskLevel: RiskLevel;
  signals: Signal[];
  suggestions: string[];
}

const SITE_URL = 'https://stealabrainrot.games';

const suspiciousTerms = [
  'login',
  'verify',
  'auth',
  'bonus',
  'gift',
  'reward',
  'free',
  'free-robux',
  'token',
  'airdrop',
  'wallet',
  'secure-',
  'update-password',
  'brainrot-giveaway'
];

const knownTlds = new Set([
  'com',
  'net',
  'org',
  'io',
  'gg',
  'games',
  'app',
  'dev',
  'tech',
  'live',
  'xyz',
  'play',
  'co'
]);

const shortenerHosts = new Set([
  'bit.ly',
  'bitly.com',
  'tinyurl.com',
  't.co',
  'ow.ly',
  'goo.gl',
  'cutt.ly'
]);

const safeDomains = ['stealabrainrot.games', 'stealabrainrot.com'];

const riskTextColors: Record<RiskLevel, string> = {
  safe: 'text-green-400',
  caution: 'text-amber-400',
  risky: 'text-red-400'
};

const riskBarColors: Record<RiskLevel, string> = {
  safe: 'bg-green-500',
  caution: 'bg-amber-500',
  risky: 'bg-red-500'
};

const signalBadge: Record<SignalStatus, string> = {
  pass: 'bg-green-500/15 text-green-300 border border-green-500/40',
  warn: 'bg-amber-500/15 text-amber-300 border border-amber-500/40',
  fail: 'bg-red-500/15 text-red-300 border border-red-500/40'
};

const signalIcon: Record<SignalStatus, string> = {
  pass: '✅',
  warn: '⚠️',
  fail: '⛔'
};

function normalizeUrl(input: string): URL | null {
  const trimmed = input.trim();
  if (!trimmed) {
    return null;
  }

  try {
    return trimmed.startsWith('http') ? new URL(trimmed) : new URL(`https://${trimmed}`);
  } catch (error) {
    console.error('Invalid URL:', error);
    return null;
  }
}

function analyzeUrl(url: URL): ScanResult {
  let score = 100;
  const signals: Signal[] = [];
  const suggestions: string[] = [];

  const host = url.hostname.toLowerCase();
  const path = url.pathname.toLowerCase();
  const urlString = `${host}${path}${url.search}`.toLowerCase();

  const isHttps = url.protocol === 'https:';
  signals.push({
    label: 'HTTPS enabled',
    status: isHttps ? 'pass' : 'warn',
    detail: isHttps ? 'Connection is secured with HTTPS.' : 'Uses HTTP; traffic could be intercepted.'
  });
  if (!isHttps) {
    score -= 20;
    suggestions.push('Prefer links that start with https://, especially before entering credentials.');
  }

  const suspiciousHits = suspiciousTerms.filter((term) => urlString.includes(term));
  if (suspiciousHits.length > 0) {
    signals.push({
      label: 'Suspicious keywords',
      status: 'fail',
      detail: `Found potential bait terms: ${suspiciousHits.join(', ')}.`
    });
    score -= 25;
    suggestions.push('Be careful with links offering gifts, rewards, or asking for verification.');
  } else {
    signals.push({
      label: 'No phishing words detected',
      status: 'pass',
      detail: 'URL does not contain common bait language.'
    });
  }

  const ipPattern = /^(?:\d{1,3}\.){3}\d{1,3}$/;
  const isIpHost = ipPattern.test(host);
  if (isIpHost) {
    signals.push({
      label: 'Raw IP address',
      status: 'fail',
      detail: 'Domains replaced with IP addresses often try to hide ownership.'
    });
    score -= 25;
    suggestions.push('Open links that use recognizable domains instead of raw IP addresses.');
  }

  const hasPunycode = host.includes('xn--');
  if (hasPunycode) {
    signals.push({
      label: 'Punycode detected',
      status: 'warn',
      detail: 'Encoded characters can mimic trusted brands (homograph attacks).'
    });
    score -= 15;
    suggestions.push('Check the domain spelling carefully and avoid lookalike characters.');
  }

  const tld = host.split('.').pop() ?? '';
  const isKnownTld = knownTlds.has(tld);
  signals.push({
    label: 'Top-level domain check',
    status: isKnownTld ? 'pass' : 'warn',
    detail: isKnownTld
      ? `.${tld} is a common TLD for games and web apps.`
      : `Uncommon TLD (.${tld}) detected; research the sender before trusting.`
  });
  if (!isKnownTld) {
    score -= 10;
    suggestions.push('Confirm the site owner when the TLD is uncommon for gaming.');
  }

  const pathLength = url.pathname.length;
  if (pathLength > 64) {
    signals.push({
      label: 'Long or complex path',
      status: 'warn',
      detail: 'Very long paths can hide redirects or tracking.'
    });
    score -= 10;
    suggestions.push('Hover and preview long paths before clicking through.');
  } else {
    signals.push({
      label: 'Clean path length',
      status: 'pass',
      detail: 'Path length looks normal.'
    });
  }

  const params = Array.from(new URLSearchParams(url.search).keys());
  if (params.length > 5) {
    signals.push({
      label: 'Many query parameters',
      status: 'warn',
      detail: `Contains ${params.length} parameters which may include tracking or redirects.`
    });
    score -= 10;
    suggestions.push('Be wary of links with heavy tracking parameters.');
  } else if (params.length > 0) {
    signals.push({
      label: 'Query parameters present',
      status: 'warn',
      detail: `Parameters detected: ${params.join(', ')}.`
    });
    score -= 5;
  } else {
    signals.push({
      label: 'No query parameters',
      status: 'pass',
      detail: 'Fewer parameters reduce the chance of hidden redirects.'
    });
  }

  if (shortenerHosts.has(host)) {
    signals.push({
      label: 'Shortened link',
      status: 'warn',
      detail: 'URL shorteners can conceal the final destination.'
    });
    score -= 15;
    suggestions.push('Expand shortened links or ask the sender for the full URL.');
  }

  if (safeDomains.some((domain) => host.endsWith(domain))) {
    signals.push({
      label: 'Official StealABrainrot domain',
      status: 'pass',
      detail: 'Matches our trusted domain list.'
    });
    score = Math.min(100, score + 5);
  }

  const riskLevel: RiskLevel = score >= 80 ? 'safe' : score >= 55 ? 'caution' : 'risky';
  const verdict =
    riskLevel === 'safe'
      ? 'Likely safe'
      : riskLevel === 'caution'
        ? 'Review carefully'
        : 'Potentially risky';

  return {
    normalizedUrl: url.toString(),
    host,
    riskScore: Math.max(5, Math.min(score, 100)),
    verdict,
    riskLevel,
    signals,
    suggestions: Array.from(new Set(suggestions)).slice(0, 6)
  };
}

export default function BrainrotLinkScannerPage() {
  const [urlInput, setUrlInput] = useState('');
  const [result, setResult] = useState<ScanResult | null>(null);
  const [error, setError] = useState('');

  const quickLinks = useMemo(
    () => [
      {
        label: 'Official StealABrainrot home',
        url: 'https://stealabrainrot.games/'
      },
      {
        label: 'Suspicious login spoof',
        url: 'http://stealabrainrot.games-login.info/auth'
      },
      {
        label: 'Generic invite link',
        url: 'https://discord.gg/example'
      }
    ],
    []
  );

  const seoSchema = useMemo(
    () => ({
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'Brainrot Link Scanner',
      url: `${SITE_URL}/brainrot-link-scanner`,
      description:
        'Free Brainrot link scanner that checks game links for HTTPS, phishing keywords, URL shorteners, and risky redirects.',
      publisher: {
        '@type': 'Organization',
        name: 'StealABrainrot Games',
        url: SITE_URL
      },
      mainEntity: {
        '@type': 'SoftwareApplication',
        name: 'Brainrot Link Scanner',
        operatingSystem: 'Web',
        applicationCategory: 'SecurityApplication',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD'
        }
      }
    }),
    []
  );

  const handleScan = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');

    const parsedUrl = normalizeUrl(urlInput);
    if (!parsedUrl) {
      setResult(null);
      setError('Please enter a valid link (example: https://stealabrainrot.games/game/shell-shockers).');
      return;
    }

    setResult(analyzeUrl(parsedUrl));
  };

  const useQuickLink = (link: string) => {
    setUrlInput(link);
    const parsedUrl = normalizeUrl(link);
    if (parsedUrl) {
      setResult(analyzeUrl(parsedUrl));
      setError('');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        <section className="hero-gradient border-b border-border">
          <div className="container-custom py-16 md:py-20">
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div className="space-y-6">
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/30 text-sm">
                  <span className="mr-2">🛡️</span>
                  Real-time Brainrot link safety
                </div>
                <h1 className="text-4xl md:text-5xl font-extrabold text-foreground leading-tight">
                  Brainrot Link Scanner
                </h1>
                <p className="text-lg text-muted-foreground">
                  Paste any Brainrot or Roblox-style game link and get an instant risk score. We check HTTPS, keywords, shorteners,
                  and suspicious redirects so you can protect your session and stay focused on playing.
                </p>
                <div className="grid sm:grid-cols-3 gap-3 text-sm text-muted-foreground">
                  <div className="bg-card border border-border rounded-lg p-3">
                    <div className="font-semibold text-foreground mb-1">Privacy-first</div>
                    On-page heuristics only. We do not store the link you scan.
                  </div>
                  <div className="bg-card border border-border rounded-lg p-3">
                    <div className="font-semibold text-foreground mb-1">Clear verdicts</div>
                    See a color-coded score with human-readable guidance.
                  </div>
                  <div className="bg-card border border-border rounded-lg p-3">
                    <div className="font-semibold text-foreground mb-1">Game-focused</div>
                    Optimized checks for Brainrot and game-sharing links.
                  </div>
                </div>
              </div>

              <div className="bg-card border border-border rounded-xl p-6 shadow-lg">
                <form onSubmit={handleScan} className="space-y-4">
                  <div>
                    <label htmlFor="link" className="block text-sm font-semibold text-foreground mb-2">
                      Paste a link to scan
                    </label>
                    <div className="flex flex-col space-y-3">
                      <input
                        id="link"
                        type="url"
                        value={urlInput}
                        onChange={(event) => setUrlInput(event.target.value)}
                        placeholder="https://example.com/brainrot-link"
                        className="w-full rounded-lg border border-border bg-background px-3 py-3 text-foreground focus-visible"
                        required
                        aria-describedby="link-helper"
                      />
                      <button
                        type="submit"
                        className="btn-primary flex items-center justify-center space-x-2"
                      >
                        <span>Scan now</span>
                        <span>→</span>
                      </button>
                    </div>
                    <p id="link-helper" className="text-xs text-muted-foreground mt-2">
                      Checks stay on this page. Ideal for Discord invites, Roblox-style links, game landing pages, and promo pages.
                    </p>
                  </div>

                  {error && (
                    <p className="text-sm text-red-400" role="alert">
                      {error}
                    </p>
                  )}

                  <div className="flex flex-wrap gap-2">
                    {quickLinks.map((item) => (
                      <button
                        key={item.url}
                        type="button"
                        onClick={() => useQuickLink(item.url)}
                        className="px-3 py-2 rounded-md text-sm bg-muted/40 border border-border hover:border-primary/60 transition-all duration-200"
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>

                  {result && (
                    <div className="border border-border rounded-lg p-4 bg-muted/20 space-y-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs uppercase text-muted-foreground mb-1">Last scan</p>
                          <p className="font-semibold text-foreground truncate">{result.normalizedUrl}</p>
                        </div>
                        <span className={`font-semibold ${riskTextColors[result.riskLevel]}`}>
                          {result.verdict}
                        </span>
                      </div>
                      <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                        <div
                          className={`h-full ${riskBarColors[result.riskLevel]}`}
                          style={{ width: `${result.riskScore}%` }}
                          aria-label={`Risk score ${result.riskScore}%`}
                        />
                      </div>
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </section>

        {result && (
          <section className="py-14 bg-background">
            <div className="container-custom">
              <div className="bg-card border border-border rounded-xl p-6 md:p-8 shadow-lg space-y-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Analysis for</p>
                    <p className="text-xl font-semibold text-foreground break-all">{result.normalizedUrl}</p>
                    <p className="text-sm text-muted-foreground">Host: {result.host}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Risk score</p>
                    <p className={`text-4xl font-bold ${riskTextColors[result.riskLevel]}`}>
                      {result.riskScore}%
                    </p>
                    <p className="text-muted-foreground">{result.verdict}</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {result.signals.map((signal) => (
                    <div
                      key={`${signal.label}-${signal.status}-${signal.detail}`}
                      className="border border-border rounded-lg p-4 bg-background/60"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <span>{signalIcon[signal.status]}</span>
                          <span className="font-semibold text-foreground">{signal.label}</span>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${signalBadge[signal.status]}`}>
                          {signal.status === 'pass' ? 'Pass' : signal.status === 'warn' ? 'Warning' : 'Fail'}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">{signal.detail}</p>
                    </div>
                  ))}
                </div>

                {result.suggestions.length > 0 && (
                  <div className="bg-muted/10 border border-border rounded-lg p-4">
                    <p className="text-sm font-semibold text-foreground mb-2">Next steps</p>
                    <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                      {result.suggestions.map((tip) => (
                        <li key={tip}>{tip}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="flex flex-wrap gap-3 text-sm">
                  <span className="px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/30">
                    HTTPS
                  </span>
                  <span className="px-3 py-1 rounded-full bg-secondary/10 text-secondary border border-secondary/30">
                    Phishing terms
                  </span>
                  <span className="px-3 py-1 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/30">
                    Redirects
                  </span>
                  <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
                    Safe domains
                  </span>
                </div>
              </div>
            </div>
          </section>
        )}

        <section className="py-14 bg-card border-y border-border">
          <div className="container-custom space-y-10">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-background border border-border rounded-xl p-6">
                <div className="text-3xl mb-3">🚀</div>
                <h3 className="text-xl font-bold text-foreground mb-2">Built for fast checks</h3>
                <p className="text-muted-foreground text-sm">
                  No downloads or sign-ups. Get an on-page verdict in seconds before you click a link in chat, email, or a game lobby.
                </p>
              </div>
              <div className="bg-background border border-border rounded-xl p-6">
                <div className="text-3xl mb-3">🔎</div>
                <h3 className="text-xl font-bold text-foreground mb-2">Actionable signals</h3>
                <p className="text-muted-foreground text-sm">
                  HTTPS, TLD reputation, bait language, and redirect noise presented with simple icons you can explain to friends.
                </p>
              </div>
              <div className="bg-background border border-border rounded-xl p-6">
                <div className="text-3xl mb-3">🤝</div>
                <h3 className="text-xl font-bold text-foreground mb-2">Made for Brainrot players</h3>
                <p className="text-muted-foreground text-sm">
                  Focused on the way players share hubs, private servers, and promo events so you avoid fake login walls.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-foreground">When to run the Brainrot Link Scanner</h2>
                <ul className="space-y-3 text-muted-foreground text-sm">
                  <li>• Someone DMs you a Brainrot base invite and asks for your Roblox login.</li>
                  <li>• You see a shortened link promising free skins or tokens.</li>
                  <li>• A Discord announcement shares a tournament page with extra query strings.</li>
                  <li>• You want to double-check a new clan site before sharing it with friends.</li>
                </ul>
                <p className="text-sm text-muted-foreground">
                  If anything feels off, copy the link here first. Pair this with in-game reporting and two-factor authentication for full coverage.
                </p>
              </div>
              <div className="bg-background border border-border rounded-xl p-6">
                <div className="text-sm uppercase text-muted-foreground mb-3">What we scan</div>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <span>🔒</span>
                    <div>
                      <p className="font-semibold text-foreground">Transport security</p>
                      <p className="text-muted-foreground text-sm">HTTPS enforcement and certificate-friendly domains.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span>🧭</span>
                    <div>
                      <p className="font-semibold text-foreground">Redirect hints</p>
                      <p className="text-muted-foreground text-sm">Query strings, shorteners, and unusual path lengths.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span>🧠</span>
                    <div>
                      <p className="font-semibold text-foreground">Social engineering cues</p>
                      <p className="text-muted-foreground text-sm">Phishing-friendly phrases like verify, gift, or free rewards.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span>🌐</span>
                    <div>
                      <p className="font-semibold text-foreground">Domain reputation</p>
                      <p className="text-muted-foreground text-sm">TLD context plus recognition of official StealABrainrot domains.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-14 bg-background">
          <div className="container-custom grid md:grid-cols-3 gap-6">
            <div className="bg-card border border-border rounded-xl p-6">
              <div className="text-2xl mb-2">📚</div>
              <h3 className="font-bold text-foreground mb-2">Best practices</h3>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>Use unique passwords and enable two-factor authentication on game accounts.</li>
                <li>Never enter credentials on domains you do not fully trust.</li>
                <li>Hover over links in chat to preview the true destination before clicking.</li>
                <li>Share official links directly from <Link href="/" className="text-primary hover:underline">stealabrainrot.games</Link>.</li>
              </ul>
            </div>
            <div className="bg-card border border-border rounded-xl p-6">
              <div className="text-2xl mb-2">❓</div>
              <h3 className="font-bold text-foreground mb-2">FAQ</h3>
              <div className="text-sm text-muted-foreground space-y-3">
                <div>
                  <p className="font-semibold text-foreground">Do you store my links?</p>
                  <p>Scan logic runs in your browser only. We do not log or transmit what you paste.</p>
                </div>
                <div>
                  <p className="font-semibold text-foreground">Is this a replacement for antivirus?</p>
                  <p>No. Use this as a quick pre-check and keep your device security up to date.</p>
                </div>
                <div>
                  <p className="font-semibold text-foreground">Can it guarantee safety?</p>
                  <p>No scanner can promise that. We surface red flags so you can decide confidently.</p>
                </div>
              </div>
            </div>
            <div className="bg-card border border-border rounded-xl p-6">
              <div className="text-2xl mb-2">🎮</div>
              <h3 className="font-bold text-foreground mb-2">Keep playing safely</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Explore verified games on StealABrainrot. Every title links back to our official domains with clean URLs and clear CTAs.
              </p>
              <div className="flex gap-3">
                <Link href="/most-played" className="btn-primary flex-1 text-center">
                  View most played
                </Link>
                <Link href="/trending" className="btn-secondary flex-1 text-center">
                  Trending now
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 bg-card border-t border-border">
          <div className="container-custom flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <p className="text-sm text-primary font-semibold mb-1">Stay sharp</p>
              <h2 className="text-2xl font-bold text-foreground">Check before you click.</h2>
              <p className="text-muted-foreground">
                Keep your Brainrot sessions secure with quick, no-login link scans.
              </p>
            </div>
            <button
              onClick={() => useQuickLink('https://stealabrainrot.games/')}
              className="btn-primary"
            >
              Scan the official site
            </button>
          </div>
        </section>
      </main>

      <Footer />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(seoSchema) }}
      />
    </div>
  );
}
