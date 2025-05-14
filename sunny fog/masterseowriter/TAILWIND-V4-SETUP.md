# Tailwind CSS v4 Setup Instructions

This project now uses Tailwind CSS v4 with the standalone CLI approach, which is different from the previous PostCSS integration method used in v3.

## Key Changes Made

1. **Updated Configuration Files**:
   - Created a `tailwind.config.mjs` file with modern configuration
   - Modified `postcss.config.mjs` to use the new plugin format
   - Updated `globals.css` to use the v4 syntax with `@tailwind` directives

2. **Colors System**:
   - Now using RGB values in CSS variables for colors
   - Colors are defined in the `:root` section of globals.css
   - Colors are referenced in the config with the modern format: `'rgb(var(--turquoise-500) / <alpha-value>)'`

3. **Component Structure**:
   - Split homepage sections into separate component files
   - Split legal content into separate files for better organization

## How to Run the Project

1. **Start the Tailwind CSS watcher**:
   ```
   npm run tailwind
   ```

2. **In a separate terminal, start the Next.js dev server**:
   ```
   npm run dev
   ```

## Key Files

- `src/app/globals.css` - Contains color variables and base styles
- `tailwind.config.mjs` - Tailwind configuration
- `src/content/legal/` - Split legal content
- `src/components/home/` - Modular home page components

## Additional Resources

- [Tailwind CSS v4 Documentation](https://tailwindcss.com/docs/installation/tailwind-cli)
- [Next.js with Tailwind CSS](https://nextjs.org/docs/app/building-your-application/styling/tailwind-css) 