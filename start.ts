import * as net from "net";

function start() {
  const PORT = 8080;

  const server = net.createServer((socket) => {
    socket.on("data", (data: Buffer) => {
        const receivedData = data.toString().trim();
        console.log("------------------------------");
        console.log(receivedData);
        console.log("------------------------------");

        const response = `
HTTP/1.1 200 OK
Date: Wed, 28 Oct 2020 07:57:45 GMT
Server: Apache/2.4.41 (Unix)
Content-Location: index.html.en
Vary: negotiate
TCN: choice
Last-Modified: Thu, 29 Aug 2019 05:05:59 GMT
ETag: "2d-5913a76187bc0"
Accept-Ranges: bytes
Content-Length: 45
Keep-Alive: timeout=5, max=100
Connection: Keep-Alive
Content-Type: text/html

<html><body><h1>It works!</h1></body></html>
        `;

    console.log("------------------------------");
    socket.write(response);
    console.log("------------------------------");

      socket.end();
    });

    socket.on("end", () => {
      console.log("end");
    });
  });

  server.listen(PORT, () => {
    console.log("listen");
  });
}

start();
