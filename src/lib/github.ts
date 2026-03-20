/**
 * GitHub API Integration
 * Fetch repositories and user data from GitHub
 */

export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  topics: string[];
  created_at: string;
  updated_at: string;
  pushed_at: string;
}

export interface GitHubUser {
  login: string;
  name: string;
  bio: string | null;
  location: string | null;
  email: string | null;
  avatar_url: string;
  html_url: string;
  public_repos: number;
  followers: number;
  following: number;
}

const GITHUB_USERNAME = "oswaldorosales";
const GITHUB_API_BASE = "https://api.github.com";

/**
 * Fetch user profile from GitHub
 */
export async function fetchGitHubUser(): Promise<GitHubUser | null> {
  try {
    const response = await fetch(`${GITHUB_API_BASE}/users/${GITHUB_USERNAME}`, {
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Failed to fetch GitHub user:", error);
    return null;
  }
}

/**
 * Fetch public repositories from GitHub
 */
export async function fetchGitHubRepos(
  options: {
    sort?: "created" | "updated" | "pushed" | "full_name";
    direction?: "asc" | "desc";
    per_page?: number;
  } = {}
): Promise<GitHubRepo[]> {
  const { sort = "updated", direction = "desc", per_page = 100 } = options;

  try {
    const params = new URLSearchParams({
      sort,
      direction,
      per_page: per_page.toString(),
    });

    const response = await fetch(
      `${GITHUB_API_BASE}/users/${GITHUB_USERNAME}/repos?${params}`,
      {
        next: { revalidate: 3600 }, // Cache for 1 hour
      }
    );

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Failed to fetch GitHub repos:", error);
    return [];
  }
}

/**
 * Get featured repositories (by stars or manual selection)
 */
export async function getFeaturedRepos(limit = 6): Promise<GitHubRepo[]> {
  const repos = await fetchGitHubRepos();

  // Filter out forks and sort by stars
  const featuredRepos = repos
    .filter((repo) => !repo.name.includes("fork"))
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, limit);

  return featuredRepos;
}

/**
 * Get repository details by name
 */
export async function getRepoDetails(repoName: string): Promise<GitHubRepo | null> {
  try {
    const response = await fetch(
      `${GITHUB_API_BASE}/repos/${GITHUB_USERNAME}/${repoName}`,
      {
        next: { revalidate: 3600 },
      }
    );

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Failed to fetch repo ${repoName}:`, error);
    return null;
  }
}

/**
 * Get total GitHub stats
 */
export async function getGitHubStats() {
  const [user, repos] = await Promise.all([fetchGitHubUser(), fetchGitHubRepos()]);

  if (!user) {
    return null;
  }

  const totalStars = repos.reduce((acc, repo) => acc + repo.stargazers_count, 0);
  const totalForks = repos.reduce((acc, repo) => acc + repo.forks_count, 0);
  const languages = repos
    .map((repo) => repo.language)
    .filter((lang): lang is string => lang !== null);

  const languageCount = languages.reduce((acc, lang) => {
    acc[lang] = (acc[lang] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const topLanguages = Object.entries(languageCount)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
    .map(([lang]) => lang);

  return {
    publicRepos: user.public_repos,
    followers: user.followers,
    totalStars,
    totalForks,
    topLanguages,
  };
}
