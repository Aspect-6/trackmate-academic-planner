import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
    root: path.resolve(__dirname),
    cacheDir: path.resolve(__dirname, '../../node_modules/.vite/academic'),
    base: '/academic/',
    build: {
        outDir: path.resolve(__dirname, '../../dist/academic'),
        emptyOutDir: true
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname),
            '@shared': path.resolve(__dirname, '../shared')
        }
    },
    plugins: [react()],
})
