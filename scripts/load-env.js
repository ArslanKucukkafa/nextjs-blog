const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

// Function to load environment variables
function loadEnvironmentVariables() {
  const envPath = path.resolve(process.cwd(), '.env');
  
  try {
    // Check if .env file exists
    if (fs.existsSync(envPath)) {
      const result = dotenv.config({ path: envPath });
      
      if (result.error) {
        console.error('Error loading .env file:', result.error);
        return false;
      }
      
      console.log('Environment variables loaded successfully');
      return true;
    } else {
      console.error('.env file not found');
      return false;
    }
  } catch (error) {
    console.error('Error processing .env file:', error);
    return false;
  }
}

// Run the loader
loadEnvironmentVariables();
