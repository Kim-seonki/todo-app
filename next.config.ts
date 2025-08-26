/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // 개발 중 허용할 origin 설정
    allowedDevOrigins: ["http://localhost:3000", "http://192.168.0.15:3000"],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "sprint-fe-project.s3.ap-northeast-2.amazonaws.com",
        pathname: "/**", // S3 안의 모든 경로 허용
      },
    ],
  },
};

module.exports = nextConfig;
