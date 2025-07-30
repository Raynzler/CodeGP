/** @type {import('next').NextConfig} */
const nextConfig = {
  // Next.js using ONLY app directory
  experimental: {
    appDir: true,
    // Disable pages directory
    pagesDir: false
  }
}

module.exports = nextConfig