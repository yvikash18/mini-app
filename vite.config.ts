import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import react from '@vitejs/plugin-react-swc';
import mkcert from 'vite-plugin-mkcert';
import { readFileSync } from 'fs';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/mini-app/',
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern',
      },
    },
  },
  plugins: [
    // Allows using React dev server along with building a React application with Vite.
    // https://npmjs.com/package/@vitejs/plugin-react-swc
    react(),
    // Allows using the compilerOptions.paths property in tsconfig.json.
    // https://www.npmjs.com/package/vite-tsconfig-paths
    tsconfigPaths(),
    // Creates a custom SSL certificate valid for the local machine.
    // Using this plugin requires admin rights on the first dev-mode launch.
    // https://www.npmjs.com/package/vite-plugin-mkcert
    process.env.HTTPS && mkcert(),
    // Custom plugin to serve manifest at root level
    {
      name: 'ton-connect-manifest',
      configureServer(server) {
        server.middlewares.use('/tonconnect-manifest.json', (req, res) => {
          try {
            // Get the host from the request to make it domain-independent
            const protocol = req.headers['x-forwarded-proto'] || 'https';
            const host = req.headers.host;
            const baseUrl = `${protocol}://${host}`;
            
            // Create dynamic manifest based on current domain
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
          } catch (error) {
            console.error('Error serving manifest:', error);
            res.statusCode = 500;
            res.end('Internal server error');
          }
        });
      },
    },
  ],
  build: {
    target: 'esnext',
  },
  publicDir: './public',
  server: {
    // Exposes your dev server and makes it accessible for the devices in the same network.
    host: true,
    allowedHosts: [
      'eabd2fd6f885.ngrok-free.app'
    ],
    headers: {
      'ngrok-skip-browser-warning': 'true',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    },
  },
});

