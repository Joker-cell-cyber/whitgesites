#!/bin/bash

# Create the destination directory if it doesn't exist
mkdir -p public/images/plushies

# Make sure product image folder exists
if [ ! -d "product image" ]; then
  echo "Warning: 'product image' directory not found, creating empty directory"
  mkdir -p "product image"
  # Copy some placeholder images to ensure the build doesn't fail
  echo "Creating placeholder images..."
  touch "product image/placeholder.jpg"
fi

# Ensure Lapino Blue Snow image exists with a web-safe name
cp "product image/Lapin géant - LAPIN DOUDOU 42 cm 1.jpg" "public/images/plushies/lapino-blue-snow-1.jpg"
echo "Copied Lapin géant - LAPIN DOUDOU 42 cm 1.jpg to public/images/plushies/lapino-blue-snow-1.jpg"

# Rename and copy all images with basic name normalization
for file in "product image"/*; do
  # Extract filename
  filename=$(basename "$file")
  
  # Skip the Lapino image as we've already handled it specially
  if [[ "$filename" == "Lapin géant - LAPIN DOUDOU 42 cm 1.jpg" ]]; then
    continue
  fi
  
  # Create a normalized filename (replace spaces with hyphens)
  normalized=$(echo "$filename" | tr ' ' '-')
  
  # Copy the file with the normalized name
  cp "$file" "public/images/plushies/$normalized"
  
  echo "Copied $filename to public/images/plushies/$normalized"
done

# Create additional required directories
mkdir -p public/images/categories
mkdir -p public/images/blog
mkdir -p public/images/about
mkdir -p public/images/products
mkdir -p public/images/card-logos

# Create placeholder files for potentially missing images
touch public/images/teddy-bears-hero.png
touch public/images/categories/category-teddy1.png
touch public/images/newsletter-teddy.png
touch public/images/cta-background.png
touch public/images/hero-pattern.svg

echo "All images have been renamed and copied to public/images/plushies/" 