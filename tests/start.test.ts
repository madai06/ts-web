/** @format */
import Server from "../packages/server";
test("check", () => {
    console.log("OK");
    const server = new Server()
    const response_header = server.build_response_header(
      "/",
      "<html><body><h1>GOOD</h1></body></html>"
    );
    console.log(response_header)
});
