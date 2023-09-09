/** @format */

import * as net from "net";
import Server from "./packages/server";

var cluster = require("cluster");
var numCPUs = require("os").cpus().length;

cluster.on("exit", function (worker: any, code: any, signal: any) {
  console.log(
    "Worker %d died with code/signal %s. Restarting worker...",
    worker.process.pid,
    signal || code
  );
  cluster.fork();
});

if (cluster.isMaster) {
  for (var i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
} else {
  const server = new Server();
  server.serve();
}
