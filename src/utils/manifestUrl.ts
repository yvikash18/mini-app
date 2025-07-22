// Helper to get the correct manifest URL based on environment
export const getManifestUrl = () => {
  const isDevelopment = import.meta.env.DEV;
  const baseUrl = isDevelopment 
    ? 'http://localhost:5173' 
    : 'https://eabd2fd6f885.ngrok-free.app/mini-app';
  
  return `${baseUrl}/tonconnect-manifest.json${isDevelopment ? '' : '?ngrok-skip-browser-warning=true'}`;
};
