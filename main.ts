/** @format */

const { Worker } = require("worker_threads");
const worker = new Worker("./worker.ts");
// ワーカーからの結果を受ける
worker.on("message", (msg) => {
  console.log(msg);
});
// ワーカーに仕事を依頼
worker.postMessage({ action: "mul", args: [2, 3] });
