import express from 'express';
import morgan from "morgan";
import { createProxyMiddleware } from 'http-proxy-middleware';

// Create Express Server
const app = express();

// Configuration
const PORT = 3000;
const HOST = "localhost";
const API_SERVICE_URL = "http://192.168.10.179:8080";

// function logResponseBody(req, res, next) {
//   var oldWrite = res.write,
//       oldEnd = res.end;

//   var chunks = [];

//   res.write = function (chunk) {
//     chunks.push(chunk);

//     return oldWrite.apply(res, arguments);
//   };

//   res.end = function (chunk) {
//     if (chunk)
//       chunks.push(chunk);

//     var body = Buffer.concat(chunks).toString();
//     console.log(req.path, body);

//     oldEnd.apply(res, arguments);
//   };

//   next();
// }

// Logging
app.use(morgan("dev"));
// app.use(logResponseBody);

// Info GET endpoint
app.get('/info', (req, res, next) => {
  res.send('This is a proxy service which proxies to Billing and Account APIs.');
});

// Proxy endpoints
app.use('/proxy', createProxyMiddleware({
  target: API_SERVICE_URL,
  changeOrigin: true,
  pathRewrite: {
      [`^/proxy`]: '',
  },
}));

// Start the Proxy
app.listen(PORT, HOST, () => {
  console.log(`Starting Proxy at ${HOST}:${PORT}`);
});