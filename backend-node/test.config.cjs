// test.config.cjs
module.exports = {
  apps: [{
    name: "praxis-dev", // New, unique name
    script: "/var/www/praxis-dev/backend-node/server.js",            
    cwd: "/var/www/praxis-dev/backend-node",
    interpreter: "/home/troy/.nvm/versions/node/v22.15.1/bin/node"
  }]
};
