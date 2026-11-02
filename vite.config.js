import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'

// https://vite.dev/config/
export default defineConfig({
  server: {
    host: "127.0.0.1",
    port: 5173,
    hmr: {
      host: "localhost",
      protocol: "ws"
    }
  },
  
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] })
  ],
})
