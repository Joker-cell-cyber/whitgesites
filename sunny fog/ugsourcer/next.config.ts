import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: [
      'images.unsplash.com',
      'img.youtube.com',
      'i.vimeocdn.com',
      'cloudinary.com',
      'res.cloudinary.com',
      'media.giphy.com',
      'placehold.co',
      'picsum.photos',
      'source.unsplash.com',
      'placekitten.com',
      'i.imgur.com',
      'imgur.com',
      'cdn.pixabay.com',
      'pixabay.com'
    ],
  },
  async headers() {
    return [{
      source: '/:path*',
      headers: [
        {
          key: 'X-Robots-Tag',
          value: 'noindex, nofollow',
        },
      ],
    }];
  },
};

export default nextConfig;
