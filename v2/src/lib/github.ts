import { useEffect, useState } from 'react';
import config from '../data/github-config.json';

export interface Metric { val: string; lbl: string }
export interface CaseSection { title: string; text: string }

// One entry in github-config.json `repos`. Only `visible` is required to show a repo;
// every other field is your own copy, and falls back to GitHub data when missing.
export interface RepoConfig {
  visible?: boolean;
  name?: string;
  oneLiner?: string;
  text?: string;
  glyph?: string;
  theme?: 'accent' | 'green' | 'gold';
  status?: string;
  period?: string;
  link?: string;
  cta?: string;
  flow?: string[];
  flowHighlight?: number;
  metrics?: Metric[];
  stack?: string[];
  log?: string;
  logSub?: string;
  sections?: CaseSection[];
}

interface GitHubRepo {
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  created_at: string;
}

export interface Build {
  key: string;
  name: string;
  oneLiner: string;
  text: string;
  glyph: string;
  theme: 'accent' | 'green' | 'gold';
  status: string;
  period: string;
  href: string;
  cta: string;
  flow: string[];
  flowHighlight: number;
  metrics: Metric[];
  stack: string[];
  log: string;
  logSub: string;
  sections: CaseSection[];
}

const CACHE_KEY = `gh-repos-${config.username}`;
const CACHE_TTL = 60 * 60 * 1000;

async function fetchRepos(): Promise<GitHubRepo[]> {
  let cached: { data: GitHubRepo[]; t: number } | null = null;
  try {
    cached = JSON.parse(localStorage.getItem(CACHE_KEY) || 'null');
    if (cached && Date.now() - cached.t < CACHE_TTL) return cached.data;
  } catch { /* storage unavailable */ }
  try {
    const res = await fetch(`https://api.github.com/users/${config.username}/repos?per_page=100&type=owner`);
    if (!res.ok) throw new Error(`GitHub ${res.status}`);
    const data: GitHubRepo[] = await res.json();
    try { localStorage.setItem(CACHE_KEY, JSON.stringify({ data, t: Date.now() })); } catch { /* quota */ }
    return data;
  } catch {
    return cached?.data ?? []; // offline / rate-limited: config copy still renders
  }
}

// Config order = display order. Repos not in config, or without visible:true, never show.
export function toBuilds(repos: GitHubRepo[]): Build[] {
  const byName = new Map(repos.map((r) => [r.name.toLowerCase(), r]));
  return Object.entries(config.repos as Record<string, RepoConfig>)
    .filter(([, c]) => c.visible === true)
    .map(([key, c]) => {
      const gh = byName.get(key.toLowerCase());
      const name = c.name || key;
      const href = c.link || gh?.homepage || gh?.html_url || `https://github.com/${config.username}/${key}`;
      const desc = gh?.description || '';
      return {
        key,
        name,
        oneLiner: c.oneLiner || desc,
        text: c.text || (c.oneLiner ? desc : ''),
        glyph: c.glyph || name.slice(0, 2),
        theme: c.theme || 'accent',
        status: c.status || 'Open source',
        period: c.period || (gh ? String(new Date(gh.created_at).getFullYear()) : ''),
        href,
        cta: c.cta || (href.includes('github.com') ? 'View on GitHub' : href.replace(/^https?:\/\//, '')),
        flow: c.flow || [],
        flowHighlight: c.flowHighlight ?? 0,
        metrics: c.metrics || [],
        stack: c.stack || (gh?.language ? [gh.language] : []),
        log: c.log || `Launched ${name}`,
        logSub: c.logSub || c.oneLiner || desc,
        sections: c.sections || [],
      };
    });
}

export function useBuilds(): Build[] {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  useEffect(() => { fetchRepos().then(setRepos); }, []);
  return toBuilds(repos);
}
