/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [{
            protocol: 'https',
            hostname: 'fakestoreapi.com'
        }]
    },
    i18n: {
        locales: ['pt', 'en-US'],
        defaultLocale: 'pt'
    }
};

export default nextConfig;
