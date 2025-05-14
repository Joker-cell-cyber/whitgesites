# Sunny Fog Stream Packer

A professional platform providing premium streaming overlays, alerts, and packages for content creators.

## Features

- Premium stream graphics and overlays
- Animated alerts, transitions, and effects
- Compatible with Twitch, Kick, YouTube, and other platforms
- Cyberpunk-inspired neon aesthetic
- Interactive UI elements

## Getting Started

### Prerequisites

- Node.js 18.0.0 or higher
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Set up required assets:

```bash
npm run setup-assets
# or
yarn setup-assets
```

This script will download or create placeholder assets needed for the application to run properly, including:
- Background videos
- Animation assets
- Default overlays

### Development

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Project Structure

```
/src
├─ app/             # Next.js app directory
├─ components/      # Reusable components
│  ├─ home/         # Home page components
│  ├─ pricing/      # Pricing section components
│  ├─ layout/       # Layout components
│  ├─ ui/           # UI elements and effects
│  └─ contact/      # Contact form components
├─ lib/             # Utility functions
└─ styles/          # Global styles
```

## Technical Stack

- Next.js 15
- React 19
- Tailwind CSS 4
- Framer Motion for animations
- TypeScript

## Asset Credits

The application uses placeholder assets for development purposes only. In production, these should be replaced with licensed content or custom-created assets.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
