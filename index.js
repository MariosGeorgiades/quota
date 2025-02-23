const http = require("http");
const fs = require("fs");
const path = require("path");

const publicFolder = path.join(__dirname, "public");

// Function to parse cookies
const parseCookies = (cookieString) => {
  if (!cookieString) return {};
  return Object.fromEntries(cookieString.split("; ").map(c => c.split("=")));
};

const server = http.createServer((req, res) => {
  console.log(`Request for: ${req.url}`);

  // Parse cookies from request
  const cookies = parseCookies(req.headers.cookie);

  if (req.method === "POST" && req.url === "/login") {
    let body = "";
    req.on("data", chunk => body += chunk);
    req.on("end", () => {
      let { password } = JSON.parse(body);
      if (password === "12345") { // Change to your actual admin password
        res.writeHead(200, {
          "Content-Type": "application/json",
          "Set-Cookie": "auth_token=uwuev$#!VF$Vkdsigiroids; Path=/; HttpOnly;"
        });
        return res.end(JSON.stringify({ success: true, token: "uwuev$#!VF$Vkdsigiroids" }));
      } else {
        res.writeHead(401, { "Content-Type": "application/json" });
        return res.end(JSON.stringify({ success: false }));
      }
    });
    return;
  }

  // Check if the user is admin
  if (req.url === "/admin") {
    if (cookies.auth_token === "uwuev$#!VF$Vkdsigiroids") {
      const adminFile = path.join(publicFolder, "admin.html");
      fs.readFile(adminFile, (err, data) => {
        if (err) {
          res.writeHead(500, { "Content-Type": "text/plain" });
          return res.end("Error loading admin page.");
        }
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(data);
      });
      return;
    } else {
      res.writeHead(403, { "Content-Type": "text/plain" });
      return res.end("Access Denied!");
    }
  }

  // Default to serving index.html for "/"
  let filePath =
    req.url === "/"
      ? path.join(publicFolder, "index.html")
      : path.join(publicFolder, req.url);

  // Get file extension
  let ext = path.extname(filePath);
  let contentType = "text/html";

  // Set correct content type
  const mimeTypes = {
    ".html": "text/html",
    ".css": "text/css",
    ".js": "text/javascript",
    ".json": "application/json",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".gif": "image/gif",
    ".ico": "image/x-icon",
  };

  if (mimeTypes[ext]) {
    contentType = mimeTypes[ext];
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { "Content-Type": "text/plain" });
      return res.end("404 Not Found");
    }

    // Ensure images and binary files are sent correctly
    if (ext.match(/\.(png|jpg|jpeg|gif|ico)$/)) {
      res.writeHead(200, { "Content-Type": contentType });
      return res.end(data);
    }

    res.writeHead(200, { "Content-Type": contentType });
    res.end(data, "utf8");
  });
});

server.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
