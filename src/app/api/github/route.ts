import { NextResponse } from "next/server";
import { fetchGitHubRepos, getGitHubStats } from "@/lib/github";

/**
 * API Route to fetch GitHub data
 * GET /api/github
 * GET /api/github?stats=true
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const fetchStats = searchParams.get("stats") === "true";

  try {
    if (fetchStats) {
      const stats = await getGitHubStats();
      return NextResponse.json(stats);
    }

    const repos = await fetchGitHubRepos();
    return NextResponse.json(repos);
  } catch (error) {
    console.error("GitHub API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch GitHub data" },
      { status: 500 }
    );
  }
}

export const dynamic = "force-dynamic";
export const revalidate = 3600; // Revalidate every hour
