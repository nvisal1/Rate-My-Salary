const dev = {
    API_ROUTE: 'http://localhost:5000',
  };
  
  const prod = {
    API_ROUTE: '/api',
  };
  
  const config = process.env.NODE_ENV === 'production'
    ? prod
    : dev;
  
  export default {
    // Add common config values here
    MAX_ATTACHMENT_SIZE: 5000000,
    ...config
  };