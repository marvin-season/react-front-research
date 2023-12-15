import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        proxy: {
            '/doc': {
                target: 'https://file-examples.com/wp-content/storage/2017/02/file-sample_100kB.doc',
                changeOrigin: true,
                secure: false,
                rewrite: (path) => path.replace(/^\/doc/, '')
            }
        }
    }
})
