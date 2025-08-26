import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
 
 
export default defineConfig({
  plugins: [react()],
  server: {
    //host: '13.53.182.102',  
    host: '0.0.0.0'    
  },
  preview: { 
    allowedHosts: ['dashboard.machmakers.co.uk', '16.16.183.92', "www.dashboard.machmakers.co.uk"],  
  },
})