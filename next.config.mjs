/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
            {
                source: "/",
                destination: "/ai",
                permanent: true,
            },
        ];
    },
};

export default nextConfig;
