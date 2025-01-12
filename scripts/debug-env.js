// Debug environment variables
console.log('Node Environment:', process.env.NODE_ENV);
console.log('NEXT_PUBLIC_API_URL from process.env:', process.env.NEXT_PUBLIC_API_URL);

// Add more detailed logging for all environment variables
Object.keys(process.env).forEach(key => {
  if (key.startsWith('NEXT_PUBLIC_')) {
    console.log(`${key}:`, process.env[key]);
  }
});
