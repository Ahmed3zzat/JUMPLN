import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images:{
    remotePatterns:[
      // https://linked-posts.routemisr.com/uploads/default-profile.png
      {
          protocol:"https",
          hostname:"linked-posts.routemisr.com",
          pathname:"/uploads/**"
      }
    ]
  }
};

export default nextConfig;
