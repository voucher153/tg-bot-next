const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
})

/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        optimizePackageImports: [
            "@tanstack/react-query"
        ]
    },
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'res.cloudinary.com',
                port: '',
                pathname: '**',
            },
        ],
    },
    env: {
        SERVER_URL: process.env.SERVER_URL,
        DOMAIN: process.env.DOMAIN
    }
}

module.exports = withBundleAnalyzer(nextConfig)