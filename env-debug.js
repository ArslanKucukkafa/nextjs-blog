const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');

// Explicitly load .env file
const envPath = path.resolve(process.cwd(), '.env');
console.log('Attempting to load .env from:', envPath);

// Check if .env file exists
if (fs.existsSync(envPath)) {
  console.log('.env file found');
  const result = dotenv.config({ path: envPath });
  
  if (result.error) {
    console.error('Error loading .env:', result.error);
  } else {
    console.log('Successfully loaded .env');
  }
} else {
  console.error('.env file not found at:', envPath);
}

// Log environment variables
console.log('\nEnvironment Variables:');
console.log('NEXT_PUBLIC_API_URL:', process.env.NEXT_PUBLIC_API_URL);
console.log('Current Working Directory:', process.cwd());
