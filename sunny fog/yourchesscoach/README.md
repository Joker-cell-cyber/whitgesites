# YourChessCoach - An Immersive Chess Universe

A fully immersive chess-themed coaching website with interactive elements, chess metaphors, and strategic design.

## Chess-Themed Transformation

This project has been completely transformed into a chess-themed universe with:

### Visual Elements
- Chess-themed background with subtle chessboard pattern
- Floating chess piece animations in the background
- Custom chess piece cursors (pawn, knight, bishop, king)
- Chess piece icons for all navigation and sections
- Section dividers with chess king motif
- Chess-themed buttons with wood appearance

### Chess Content
- Rich chess metaphors throughout all text
- Chess terminology integrated into all descriptions
- Focus on ELO rating improvement and chess skills
- Renamed sections with chess terminology ("The Opening" instead of "Introduction")

### Interactive Elements
- Interactive mini chess puzzles
- Chess-themed pricing section styled like an interactive chessboard
- Chess Library section with classic games and resources
- Custom chess piece cursor that changes based on element type

### Color Scheme
- Enhanced black/white/gold contrast
- Wood-toned gradients evoking premium chess boards
- Deep blue backgrounds for strategic sections

## Project Structure

```
/src
├─ app/                    # Next.js app directory
│  ├─ globals.css          # Global styles including chess theme
│  ├─ layout.tsx           # Root layout with chess theme
│  ├─ page.tsx             # Home page
│  └─ library/             # Chess library section
├─ components/             # React components
│  ├─ home/                # Homepage components
│  │  ├─ HeroSection.tsx   # Hero with chess metaphors
│  │  ├─ ServicesSection.tsx # Chess training sections
│  │  └─ PricingSection.tsx # Chess-themed pricing grid
│  ├─ layout/              # Layout components
│  │  ├─ FloatingChessPieces.tsx # Background chess animations
│  │  ├─ Navbar.tsx        # Chess-themed navigation
│  │  └─ Footer.tsx        # Chess-themed footer
│  └─ ui/                  # Reusable UI components
│     ├─ ChessIcons.tsx    # Chess piece SVG icons
│     └─ ChessPuzzle.tsx   # Interactive chess puzzles
└─ public/                 # Static assets
   ├─ cursors/             # Custom chess piece cursors
   └─ images/              # Chess-themed images
```

## Chess Icon System

The site uses a custom chess icon system with:
- King: Primary navigation and main headings
- Queen: Power and strategic training sections
- Knight: Tactics and training sections
- Bishop: Diagonal movement for cross-section links
- Rook: Defensive content and security sections
- Pawn: Basic sections and foundational content

## Chess Terminology Integration

All content has been rewritten using chess metaphors and terminology:
- "Opening" instead of "Introduction"
- "Training Camp" instead of "Services"
- "Grandmaster Strategy" instead of "Pricing"
- "Checkmate your limits" instead of generic improvements

## Development

```bash
npm install
npm run dev
```

## Chess Puzzle System

The site includes an interactive chess puzzle system that allows users to:
- Solve tactical puzzles with progressive difficulty
- Drag and drop chess pieces to solve positions
- Get immediate feedback on solutions
- Track progress through different puzzle categories

Experience the royal game of chess in a completely immersive digital environment!

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
