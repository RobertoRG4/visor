const { runServer } = require("verdaccio");
const path = require("path");
const fs = require("fs");
const yaml = require("js-yaml");

// Ensure directories exist
const storageDir = path.join(__dirname, "storage");
const htpasswdPath = path.join(__dirname, "htpasswd");

if (!fs.existsSync(storageDir)) {
  fs.mkdirSync(storageDir, { recursive: true });
}

if (!fs.existsSync(htpasswdPath)) {
  fs.writeFileSync(htpasswdPath, "");
}

// Create config object
const config = {
  storage: storageDir,
  auth: {
    htpasswd: {
      file: htpasswdPath,
      max_users: 0,
    },
  },
  uplinks: {
    npmjs: {
      url: "https://registry.npmjs.org/",
    },
  },
  packages: {
    "@*/*": {
      access: "$all",
      publish: "$authenticated",
      unpublish: "$authenticated",
      proxy: "npmjs",
    },
    "**": {
      access: "$all",
      publish: "$authenticated",
      unpublish: "$authenticated",
      proxy: "npmjs",
    },
  },
  server: {
    keepAliveTimeout: 60,
  },
  middlewares: {
    audit: {
      enabled: true,
    },
  },
  web: {
    enable: true,
    title: "My Private NPM Registry",
  },
  log: {
    type: "stdout",
    format: "pretty",
    level: "http",
  },
  listen: "0.0.0.0:4873",
};

// Save config as YAML
const configPath = path.join(__dirname, "config.yaml");
const yamlStr = yaml.dump(config);
fs.writeFileSync(configPath, yamlStr);

console.log("Starting Verdaccio...");
console.log(`Config file: ${configPath}`);
console.log(`Storage directory: ${storageDir}\n`);

// Run server and keep process alive
runServer(configPath)
  .then((app) => {
    console.log("✅ Verdaccio is running!");
    console.log("📦 Registry: http://localhost:4873");
    console.log("🌐 Web UI: http://localhost:4873");
    console.log("\nTo use this registry:");
    console.log("  npm set registry http://localhost:4873");
    console.log("\nTo create a user:");
    console.log("  npm adduser --registry http://localhost:4873");
    console.log("\nPress Ctrl+C to stop the server\n");

    // Listen for the server to actually start
    if (app && app.listen) {
      app.listen(4873, "0.0.0.0", () => {
        console.log("Server is listening on port 4873");
      });
    }
  })
  .catch((error) => {
    console.error("❌ Failed to start Verdaccio:", error);
    process.exit(1);
  });

// Handle graceful shutdown
process.on("SIGINT", () => {
  console.log("\n\nShutting down Verdaccio...");
  process.exit(0);
});

process.on("SIGTERM", () => {
  console.log("\n\nShutting down Verdaccio...");
  process.exit(0);
});

// Keep process alive
process.stdin.resume();
