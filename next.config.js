/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@mui/material', '@mui/icons-material', '@emotion/react', '@emotion/styled'],
  compiler: {
    emotion: true,
  },
}

module.exports = nextConfig
