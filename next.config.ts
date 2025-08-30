/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // 개발 중 허용할 origin 설정
    allowedDevOrigins: ["http://localhost:3000", "http://192.168.0.15:3000"],
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "todo-appv3.vercel.app/" },
      { protocol: "https", hostname: "bucket.s3.amazonaws.com" },
      { protocol: "https", hostname: "s3.ap-northeast-2.amazonaws.com" },
      // 필요 도메인 추가
    ],
  },
};

module.exports = nextConfig;
