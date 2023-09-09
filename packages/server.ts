/** @format */

import * as net from "net";

const lf: string = "\r\n";
const PORT: number = 8080;

export default class Server {
  serve() {
    const server: net.Server = net.createServer((socket: net.Socket) => {
      socket.on("data", (data: Buffer) => {
        const receivedData: String = data.toString().trim();
        console.log(">>> [start] receivedData");
        console.log(receivedData);
        console.log(">>> [end] receivedData");

        const request_line: string = receivedData.split(lf)[0];
        let [method, uri, protocol] = request_line.split(" ");

        let response_line = `HTTP/1.1 200 OK${lf}`;

        const fs = require("fs");
        let response_body: string = "";

        try {
          if (uri == "/") {
            response_body = fs.readFileSync(`./static/index.html`);
          } else {
            response_body = fs.readFileSync(`./static/${uri}`);
          }
        } catch (error) {
          console.log(error);
          response_line = `HTTP/1.1 404 Not Found${lf}`;
          response_body = "<html><body><h1>404 Not Found</h1></body></html>";
        }

        var response_header: string = this.build_response_header(
          uri,
          response_body
        );

        const response = response_line + response_header + lf + response_body;
        console.log(">>> [start] response");
        console.log(response);
        socket.write(response);
        console.log(">>> [end] response");

        socket.end();
      });

      socket.on("error", () => {
        console.log("error occured");
      });

      socket.on("end", () => {
        console.log("end");
      });
    });

    server.listen(PORT, () => {
      console.log("listen");
    });
  }

  build_response_header(uri: string, response_body: string) {
    var response_header: string = "";
    let file_path = "";
    if (uri == "/") {
      file_path = "index.html";
    } else {
      file_path = `${uri}`;
    }
    console.log(`file_path ${file_path}`);

    let extension = "";
    let content_type = "application/octet-stream";

    if (file_path.indexOf(".") > -1) {
      extension = file_path.split(".")[file_path.split(".").length - 1];
    }
    console.log(`extension ${extension}`);
    console.log(file_path.split("."));

    if (extension == "css") {
      content_type = "text/css";
    } else if (extension == "html") {
      content_type = "text/html";
    }

    response_header += `Date: ` + new Date().toUTCString() + lf;

    response_header += `Server: Apache/2.4.41 (Unix)${lf}`;
    response_header += `Content-Location: index.html.en${lf}`;
    response_header += `Vary: negotiate${lf}`;
    response_header += `TCN: choice${lf}`;
    response_header += `Last-Modified: Thu, 29 Aug 2019 05:05:59 GMT${lf}`;
    response_header += `ETag: "2d-5913a76187bc0"${lf}`;
    response_header += `Accept-Ranges: bytes${lf}`;
    response_header += `Keep-Alive: timeout=5, max=100${lf}`;
    response_header += `Connection: Keep-Alive${lf}`;
    response_header += `Content-Type: ${content_type}${lf}`;
    response_header += `Content-Length: ${response_body.length}${lf}`;

    return response_header;
  }
}
