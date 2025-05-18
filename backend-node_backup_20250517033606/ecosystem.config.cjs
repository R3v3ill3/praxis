module.exports = {
  apps: [{
    name: "praxis-backend-dev",
    script: "server.js",
    cwd: "/var/www/praxis-dev/backend-node",
    watch: false,
    interpreter: "/home/troy/.nvm/versions/node/v22.15.1/bin/node", // Ensure this is your correct NVM Node path
    env: {
      NODE_ENV: "development",
      PORT: 4100, // Good to be explicit
      // ---- ADD THIS LINE ----
      GOOGLE_APPLICATION_CREDENTIALS: "/var/www/praxis-dev/backend-node/config/digital-coop-a3083-firebase-adminsdk-fbsvc-556d91f197.json" // <--- USE THE ACTUAL FULL PATH TO YOUR JSON KEY FILE
    }
  }]
};
