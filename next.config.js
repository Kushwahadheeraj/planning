/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    poweredByHeader: false,
    images: {
        domains: ["surpriseplanner.in", "images.unsplash.com", "media-api.xogrp.com", "www.balichwonderstudio.com", "fourwaves.com", "previews.123rf.com", "c4.wallpaperflare.com", "festafiestaa.com", "cdnb.artstation.com", "assets.vogue.in", "www.brides.com", "www.parents.com", "images.yourstory.com", "img.freepik.com", "www.oddsfarm.co.uk", "navi.com", "www.travelandleisure.com", "lh3.googleusercontent.com", "os.alipayobjects.com"],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**',
            },
        ],
    },
    experimental: {
        serverActions: {
            allowedOrigins: ['localhost:3000', 'your-domain.com'],
        },
        optimizeCss: true,
        webVitalsAttribution: ['CLS', 'LCP'],
    },
    headers: async () => [
        {
            source: '/:path*',
            headers: [
                {
                    key: 'X-DNS-Prefetch-Control',
                    value: 'on',
                },
                {
                    key: 'Strict-Transport-Security',
                    value: 'max-age=63072000; includeSubDomains; preload',
                },
                {
                    key: 'X-XSS-Protection',
                    value: '1; mode=block',
                },
                {
                    key: 'X-Frame-Options',
                    value: 'SAMEORIGIN',
                },
                {
                    key: 'X-Content-Type-Options',
                    value: 'nosniff',
                },
            ],
        },
    ],
};

module.exports = nextConfig