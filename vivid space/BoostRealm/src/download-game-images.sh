#!/bin/bash

mkdir -p public/images/games

# Download game images
curl -o public/images/games/wow.jpg "https://wallpapercave.com/wp/wp7460289.jpg"
curl -o public/images/games/diablo4.jpg "https://wallpapercave.com/wp/wp11833397.jpg"
curl -o public/images/games/runescape.jpg "https://wallpapercave.com/wp/wp6903484.png"
curl -o public/images/games/genshin.jpg "https://wallpapercave.com/wp/wp7464228.jpg"
curl -o public/images/games/dofus.jpg "https://static.ankama.com/dofus/www/game/items/200/108384.png"
curl -o public/images/games/eve.jpg "https://wallpapercave.com/wp/lfoLV1Q.jpg"

echo "Game images downloaded successfully!" 