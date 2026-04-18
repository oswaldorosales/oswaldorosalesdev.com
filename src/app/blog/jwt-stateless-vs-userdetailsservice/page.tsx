import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Calendar } from "lucide-react";

export const metadata: Metadata = {
  title: "JWT Stateless Auth vs UserDetailsService in Spring Security",
  description:
    "Most Spring Security JWT tutorials hit the database on every request. Here's when that's unnecessary overhead—and how a stateless AuthPrincipal fixes it.",
  keywords: [
    "Spring Security",
    "JWT",
    "Java",
    "Spring Boot",
    "Authentication",
    "Stateless API",
    "UserDetailsService",
    "Backend",
    "Security",
  ],
  authors: [{ name: "Oswaldo Rosales", url: "https://oswaldorosalesdev.com" }],
  openGraph: {
    type: "article",
    url: "https://oswaldorosalesdev.com/blog/jwt-stateless-vs-userdetailsservice",
    title: "JWT Stateless Auth vs UserDetailsService in Spring Security",
    description:
      "Most Spring Security JWT tutorials hit the database on every request. Here's when that's unnecessary overhead—and how a stateless AuthPrincipal fixes it.",
    publishedTime: "2026-04-18T00:00:00.000Z",
    authors: ["Oswaldo Rosales"],
    images: [
      {
        url: "/og-image.png",
        width: 1536,
        height: 1024,
        alt: "JWT Stateless Auth vs UserDetailsService in Spring Security - Oswaldo Rosales",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "JWT Stateless Auth vs UserDetailsService in Spring Security",
    description:
      "Most Spring Security JWT tutorials hit the database on every request. Here's when that's unnecessary overhead—and how a stateless AuthPrincipal fixes it.",
    creator: "@OswaldoRosalesA",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical:
      "https://oswaldorosalesdev.com/blog/jwt-stateless-vs-userdetailsservice",
  },
};

const blogPostJsonLd = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: "JWT Stateless Auth vs UserDetailsService in Spring Security",
  description:
    "Most Spring Security JWT tutorials hit the database on every request. Here's when that's unnecessary overhead—and how a stateless AuthPrincipal fixes it.",
  image: "https://oswaldorosalesdev.com/og-image.png",
  datePublished: "2026-04-18T00:00:00.000Z",
  dateModified: "2026-04-18T00:00:00.000Z",
  author: {
    "@type": "Person",
    name: "Oswaldo Rosales",
    url: "https://oswaldorosalesdev.com",
    jobTitle: "Backend Software Engineer",
  },
  publisher: {
    "@type": "Person",
    name: "Oswaldo Rosales",
    url: "https://oswaldorosalesdev.com",
  },
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id":
      "https://oswaldorosalesdev.com/blog/jwt-stateless-vs-userdetailsservice",
  },
  keywords: [
    "Spring Security",
    "JWT",
    "Java",
    "Spring Boot",
    "Authentication",
    "Stateless API",
    "UserDetailsService",
  ],
};

export default function BlogPost() {
  return (
    <main className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostJsonLd) }}
      />
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Back Link */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium mb-8 transition-colors group"
        >
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          Back to Blog
        </Link>

        {/* Header */}
        <header className="mb-12">
          <div className="flex items-center gap-2 text-slate-500 text-sm mb-4">
            <Calendar className="h-4 w-4" />
            <time dateTime="2026-04-18">April 18, 2026</time>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">
            JWT Stateless Auth vs UserDetailsService in Spring Security
          </h1>

          <p className="text-xl text-slate-600 leading-relaxed">
            Most Spring Security + JWT tutorials hit the database on every
            authenticated request. Here&apos;s when that&apos;s unnecessary
            overhead—and how building a stateless{" "}
            <code className="text-blue-600 bg-blue-50 px-1 rounded text-lg">
              AuthPrincipal
            </code>{" "}
            from the token payload is the cleaner approach.
          </p>
        </header>

        {/* Content */}
        <div className="prose prose-slate prose-lg max-w-none">
          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-4">
            The Pattern Most Tutorials Teach
          </h2>

          <p className="text-slate-700 leading-relaxed mb-6">
            Pick any Spring Security + JWT tutorial and you&apos;ll find the
            same filter pattern: validate the token signature, then call{" "}
            <code>userDetailsService.loadUserByUsername()</code> to fetch the
            user from the database and build the <code>Authentication</code>{" "}
            object. It&apos;s the default path Spring documentation points to,
            and for session-based applications it makes complete sense.
          </p>

          <p className="text-slate-700 leading-relaxed mb-6">
            The problem is that most APIs using JWT aren&apos;t
            session-based—they&apos;re stateless. Applying a
            session-era pattern to a stateless API introduces a database
            dependency that the architecture was specifically designed to
            eliminate.
          </p>

          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-4">
            What the Classic Filter Actually Does
          </h2>

          <p className="text-slate-700 leading-relaxed mb-6">
            After verifying the JWT signature, the classic filter loads the user
            from the database to populate the security context:
          </p>

          <pre className="bg-slate-100 rounded-lg p-4 overflow-x-auto text-sm font-mono mb-6 text-slate-800">
            {`// JwtAuthenticationFilter.java
String username = jwtService.extractUsername(token);

UserDetails userDetails =
    userDetailsService.loadUserByUsername(username); // DB query here

if (jwtService.isTokenValid(token, userDetails)) {
    UsernamePasswordAuthenticationToken auth =
        new UsernamePasswordAuthenticationToken(
            userDetails, null, userDetails.getAuthorities());
    SecurityContextHolder.getContext().setAuthentication(auth);
}`}
          </pre>

          <p className="text-slate-700 leading-relaxed mb-6">
            This fires a <code>SELECT</code> query on{" "}
            <strong>every authenticated request</strong>. For a typical
            endpoint, that&apos;s two database hits instead of one: the
            authentication query, and then whatever the business logic needs.
            The JWT signature already cryptographically proved the token is
            valid and wasn&apos;t tampered with—the database call is
            re-confirming what cryptography already guaranteed.
          </p>

          <p className="text-slate-700 leading-relaxed mb-6">
            There are legitimate reasons to make this call, which I&apos;ll
            cover shortly. But for the common case of a read-heavy REST API,
            it&apos;s overhead that can be eliminated entirely.
          </p>

          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-4">
            The Stateless Alternative
          </h2>

          <p className="text-slate-700 leading-relaxed mb-6">
            The stateless pattern trusts the JWT payload directly. When you
            issue the token, you embed the data your application needs—user ID,
            roles, or any other claims—inside it. Since those claims are signed
            with your private key, they&apos;re authoritative: if the signature
            is valid and the token hasn&apos;t expired, the claims are
            trustworthy.
          </p>

          <p className="text-slate-700 leading-relaxed mb-6">
            Instead of loading a <code>UserDetails</code> from the database, the
            filter builds a typed principal directly from the token:
          </p>

          <pre className="bg-slate-100 rounded-lg p-4 overflow-x-auto text-sm font-mono mb-6 text-slate-800">
            {`// JwtAuthenticationFilter.java
Claims claims = jwtService.extractAllClaims(token);

// No DB query — everything comes from the signed payload
AuthPrincipal principal = new AuthPrincipal(
    UUID.fromString(claims.getSubject()),           // userId
    UserRole.valueOf(claims.get("role", String.class))
);

List<GrantedAuthority> authorities =
    List.of(new SimpleGrantedAuthority("ROLE_" + principal.role()));

UsernamePasswordAuthenticationToken auth =
    new UsernamePasswordAuthenticationToken(
        principal, null, authorities);
SecurityContextHolder.getContext().setAuthentication(auth);`}
          </pre>

          <p className="text-slate-700 leading-relaxed mb-6">
            The <code>AuthPrincipal</code> is a simple record or class you
            define yourself:
          </p>

          <pre className="bg-slate-100 rounded-lg p-4 overflow-x-auto text-sm font-mono mb-6 text-slate-800">
            {`public record AuthPrincipal(UUID userId, UserRole role) {}`}
          </pre>

          <p className="text-slate-700 leading-relaxed mb-6">
            Controllers and services can now access the authenticated
            user&apos;s data directly from the security context, with no
            additional queries needed:
          </p>

          <pre className="bg-slate-100 rounded-lg p-4 overflow-x-auto text-sm font-mono mb-6 text-slate-800">
            {`@GetMapping("/me")
public ResponseEntity<UserResponse> getProfile(Authentication auth) {
    AuthPrincipal principal = (AuthPrincipal) auth.getPrincipal();
    UUID userId = principal.userId();
    // use userId directly — no DB lookup for authentication
    return ResponseEntity.ok(userService.findById(userId));
}`}
          </pre>

          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-4">
            When to Use Each Pattern
          </h2>

          <p className="text-slate-700 leading-relaxed mb-6">
            <strong>
              Use <code>UserDetailsService</code> in the filter
            </strong>{" "}
            when you need real-time user state on every request: detecting
            disabled accounts immediately, enforcing role changes without
            waiting for token expiration, or checking account lockouts. If your
            security model requires that disabling a user takes effect on their
            very next request, the database call is justified.
          </p>

          <p className="text-slate-700 leading-relaxed mb-6">
            <strong>Use the stateless pattern</strong> when per-request database
            queries aren&apos;t necessary for correctness. This fits most REST
            APIs: the token already encodes who the user is and what they&apos;re
            allowed to do, and the signature guarantees that information
            wasn&apos;t forged. You get simpler code, lower database load, and
            naturally stateless behavior that scales horizontally without shared
            session state.
          </p>

          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-4">
            The Real Tradeoff: Immediate Revocation
          </h2>

          <p className="text-slate-700 leading-relaxed mb-6">
            The strongest argument for <code>UserDetailsService</code> is
            immediate revocation. Disable a user in the database and their next
            request fails—no waiting for the JWT to expire. With purely
            stateless auth and a 24-hour access token, a banned user retains
            access for up to 24 hours.
          </p>

          <p className="text-slate-700 leading-relaxed mb-6">
            The standard stateless answer is{" "}
            <strong>
              refresh token rotation with short-lived access tokens
            </strong>
            . The idea is simple: issue access tokens that expire in 15 minutes,
            and a long-lived refresh token (stored securely, usually in an
            HttpOnly cookie) used to obtain new access tokens.
          </p>

          <p className="text-slate-700 leading-relaxed mb-6">
            The revocation check happens at renewal time, not on every request.
            When the client calls <code>/auth/refresh</code>, the server
            validates the user&apos;s status against the database before issuing
            a new access token. If the account is disabled or the refresh token
            has been revoked, the renewal fails—and the user is effectively
            locked out within 15 minutes. That&apos;s an acceptable window for
            most applications.
          </p>

          <p className="text-slate-700 leading-relaxed mb-6">
            For use cases where even a 15-minute window is too large, a token
            denylist stored in Redis can be checked in the filter alongside the
            stateless principal. You get targeted revocation without the cost of
            a full user lookup on every request.
          </p>

          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-4">
            Going Further: Multi-Tenant APIs
          </h2>

          <p className="text-slate-700 leading-relaxed mb-6">
            If you&apos;re building a <strong>multi-tenant API</strong>—where
            multiple independent organizations (tenants) share the same
            backend but their data is completely isolated from each
            other—the stateless pattern has an additional advantage worth
            mentioning.
          </p>

          <p className="text-slate-700 leading-relaxed mb-6">
            In that context, <code>UserDetailsService</code> runs into a
            structural problem. The{" "}
            <code>loadUserByUsername(String username)</code> signature takes a
            single string, but in a multi-tenant system a username is only
            unique within a tenant—{" "}
            <code>loadUserByUsername(&quot;admin&quot;)</code> is ambiguous.
            Which organization&apos;s admin? The workarounds are a sign
            you&apos;re fighting the abstraction:
          </p>

          <pre className="bg-slate-100 rounded-lg p-4 overflow-x-auto text-sm font-mono mb-6 text-slate-800">
            {`// Encoding tenant context into the username string — a common but ugly fix
userDetailsService.loadUserByUsername(tenantId + ":" + username);`}
          </pre>

          <p className="text-slate-700 leading-relaxed mb-6">
            With the stateless approach, <code>tenantId</code> is just another
            JWT claim. You extend <code>AuthPrincipal</code> with it, and every
            layer of the application gets the tenant context from the security
            principal—no parsing, no encoding hacks, no ambiguity.
          </p>

          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-4">
            Conclusion
          </h2>

          <p className="text-slate-700 leading-relaxed mb-6">
            <code>UserDetailsService</code> inside a JWT filter is a pattern
            borrowed from stateful session-based authentication. Spring
            Security&apos;s default guidance promotes it because it fits the
            broadest case—but the broadest case isn&apos;t always your case.
          </p>

          <p className="text-slate-700 leading-relaxed mb-6">
            For most stateless REST APIs, the tradeoffs fall on the other side:
            short-lived access tokens with refresh rotation handle revocation
            without per-request database queries; a typed{" "}
            <code>AuthPrincipal</code> gives controllers the user&apos;s
            identity cleanly; and the application scales horizontally without
            shared session state.
          </p>

          <p className="text-slate-700 leading-relaxed mb-6">
            The &quot;official&quot; Spring way isn&apos;t wrong—it&apos;s
            designed for a different architecture. Knowing the distinction lets
            you pick the right tool instead of defaulting to what the tutorial
            showed.
          </p>
        </div>

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t border-slate-200">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors group"
          >
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            Back to Blog
          </Link>
        </footer>
      </article>
    </main>
  );
}
