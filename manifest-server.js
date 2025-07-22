// Simple Node.js script to generate domain-independent manifest
const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  
  if (parsedUrl.pathname === '/tonconnect-manifest.json') {
    // Get the host from the request
    const protocol = req.headers['x-forwarded-proto'] || 'https';
    const host = req.headers.host;
    const baseUrl = `${protocol}://${host}`;
    
    const manifest = {
      url: baseUrl,
      name: "Mini App - TON Trading",
      iconUrl: `${baseUrl}/mini-app/assets/application.png`,
      termsOfUseUrl: baseUrl,
      privacyPolicyUrl: baseUrl
    };
    
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.end(JSON.stringify(manifest, null, 2));
  } else {
    res.statusCode = 404;
    res.end('Not found');
  }
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Manifest server running on port ${PORT}`);
});
