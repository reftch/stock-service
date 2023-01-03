import { defineConfig } from 'vite';
import { readFileSync } from 'fs';

export default defineConfig(({ command, mode, ssrBuild }) => {
  return {
    base: "/stock-service",
    publicDir: "src/assets",
    build: {
      minify: "terser",
      target: 'esnext',
      outDir: "public",
    },
    server: {
      host: '0.0.0.0',
      port: 3000,
      https: {
        key: readFileSync('./config/ssl/key.pem'),
        cert: readFileSync('./config/ssl/cert.pem'),
      },
      proxy: {
        '/stock-service/api/v1': {
          // Changes the origin of the host header to the target URL
          changeOrigin: true,
          // Don't verify SSL certificate
          secure: false,
          target: 'https://localhost:8443'
        }
      }
    },
  }
})
