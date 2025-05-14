const fs = require('fs');
const path = require('path');
const https = require('https');
const { execSync } = require('child_process');

// Ensure directories exist
const directories = [
  'public/video',
];

directories.forEach(dir => {
  if (!fs.existsSync(dir)) {
    console.log(`Creating directory: ${dir}`);
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Define placeholder video URL - using a royalty-free tech/cyberpunk style video
// This is a placeholder URL - in a real scenario, you would use an actual video file
const PLACEHOLDER_VIDEO_URL = 'https://assets.mixkit.co/videos/preview/mixkit-computer-code-running-on-a-screen-close-up-shot-4787-large.mp4';

// Files to check/create
const files = [
  {
    path: 'public/video/stream_background.mp4',
    type: 'video',
    url: PLACEHOLDER_VIDEO_URL
  }
];

// Function to download a file
function downloadFile(url, destination) {
  return new Promise((resolve, reject) => {
    console.log(`Downloading ${url} to ${destination}...`);
    
    const file = fs.createWriteStream(destination);
    https.get(url, response => {
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        console.log(`Downloaded ${destination} successfully!`);
        resolve();
      });
    }).on('error', err => {
      fs.unlinkSync(destination); // Delete the file on error
      console.error(`Error downloading ${url}: ${err.message}`);
      reject(err);
    });
  });
}

// Process each file
async function processFiles() {
  for (const file of files) {
    if (!fs.existsSync(file.path)) {
      console.log(`Missing file: ${file.path}`);
      if (file.type === 'video') {
        try {
          await downloadFile(file.url, file.path);
        } catch (error) {
          console.error(`Failed to download video: ${error.message}`);
          console.log('Please manually add a video file at:', file.path);
        }
      }
    } else {
      console.log(`File exists: ${file.path}`);
    }
  }
}

// Run the process
processFiles().then(() => {
  console.log('Asset setup complete!');
}).catch(error => {
  console.error('Error setting up assets:', error);
  process.exit(1);
}); 