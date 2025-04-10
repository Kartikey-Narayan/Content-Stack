// Import necessary modules from Vite and plugins
import { defineConfig } from 'vite'; // Import the defineConfig function from Vite for configuration
import react from '@vitejs/plugin-react'; // Import the React plugin for Vite

// Export a default configuration for Vite
// For more details on Vite config options, visit: https://vitejs.dev/config/
export default defineConfig({
  // Array of plugins to be used by Vite
  plugins: [
    react(), // Utilize the React plugin for seamless React integration
  ],
});
