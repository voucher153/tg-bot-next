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
        domains: ['res.cloudinary.com', 'picsum.photos', 'loremflickr.com'],
    }
}

module.exports = withBundleAnalyzer(nextConfig)