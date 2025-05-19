// ecosystem.config.cjs (or ecosystem.config.js)
module.exports = {
  apps: [
    {
      // Your Node.js Backend Application
      name: "praxis-backend-dev",
      script: "/var/www/praxis-dev/backend-node/server.js", // Use absolute path
      cwd: "/var/www/praxis-dev/backend-node/",          // Set current working directory
      interpreter: "/home/troy/.nvm/versions/node/v22.15.1/bin/node", // Specify the Node version that works
      // watch: true, // Optional: if you want PM2 to restart on file changes
      // ignore_watch: ["node_modules", "logs", ".git"], // Optional
      env: {
        "NODE_ENV": "development", // Or "production"
        // You can define other environment variables here if needed,
        // but your .env file loaded by server.js should be the primary source.
      },
      out_file: "/home/troy/.pm2/logs/praxis-backend-out.log", // Separate log files
      error_file: "/home/troy/.pm2/logs/praxis-backend-error.log",
      combine_logs: true, // Optional: combine out and error logs
      log_date_format: "YYYY-MM-DD HH:mm:ss Z" // Optional
    },
    {
      // Your Cloudflare Tunnel Script
      name: "praxis-dev-tunnel",
      script: "/var/www/praxis-dev/backend-node/praxis-dev-tunnel.sh", // Path to your tunnel script
      cwd: "/var/www/praxis-dev/backend-node/", // CWD for the script
      interpreter: "bash", // Tell PM2 to use bash to execute this .sh file
      autorestart: true,   // Important: restart the tunnel if it crashes
      restart_delay: 5000, // Optional: delay in ms before restarting (e.g., 5 seconds)
      out_file: "/home/troy/.pm2/logs/praxis-tunnel-out.log",
      error_file: "/home/troy/.pm2/logs/praxis-tunnel-error.log",
      // No specific env vars needed for the tunnel script itself usually
    }
  ]
};
