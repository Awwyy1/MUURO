import type { NextConfig } from "next";

/**
 * Baseline security headers. A full CSP is deliberately deferred until the
 * Stripe surface is final (their js/frames need explicit allowances);
 * these four are safe with everything the site does today.
 * Permissions-Policy intentionally leaves `payment` alone so the Stripe
 * Payment Request API (Apple Pay / Google Pay) keeps working.
 */
const securityHeaders = [
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
