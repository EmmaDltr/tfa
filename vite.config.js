import { defineConfig } from 'vite';

export default defineConfig({
    base: '/', 
    server: {
        port: 3000, // Change this to your desired port
        host: true,
    },
});