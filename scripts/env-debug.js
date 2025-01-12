const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

// Load .env file
const envPath = path.resolve(process.cwd(), '.env');
const result = dotenv.config({ path: envPath });

console.log('Environment Debug Information:');
console.log('----------------------------');
console.log('Current Working Directory:', process.cwd());
console.log('Env File Path:', envPath);

if (result.error) {
  console.error('Error loading .env file:', result.error);
} else {
  console.log('Loaded .env file successfully');
}

console.log('\nEnvironment Variables:');
console.log('NEXT_PUBLIC_API_URL:', process.env.NEXT_PUBLIC_API_URL);

// Check .env file contents
try {
  const envContents = fs.readFileSync(envPath, 'utf8');
  console.log('\n.env File Contents:');
  console.log(envContents);
} catch (error) {
  console.error('Error reading .env file:', error);
}
