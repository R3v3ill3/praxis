// test.config.cjs
module.exports = {
  apps: [{
    name: "praxis-test", // New, unique name
    script: "/var/www/praxis-dev/backend-node/server.js",            
    cwd: "/var/www/praxis-dev/backend-node",
    interpreter: "/home/troy/.nvm/versions/node/v20.19.2/bin/node"
  }]
};
