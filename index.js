const io = require("socket.io");
const http = require("http");
const fs = require("fs");
const path = require("path");
const shortid = require("shortid");

const app = http.createServer((request, response) => {
  if (request.method === "GET") {
    const filePath = path.join(__dirname, "index.html");
    readStream = fs.createReadStream(filePath);
    readStream.pipe(response);
  } else if (request.method === "POST") {
    let data = "";
    request.on("data", (chunk) => {
      data += chunk;
    });
    request.on("end", () => {
      const parseData = JSON.parse(data);
      console.log(parseData);
      response.writeHead(200, { "Conte-Type": "json" });
    });
  } else {
    response.statusCode = 405;
    response.end();
  }
});

let numberOfClients = 0;

const socket = io(app);
socket.on("connection", (client) => {
  console.log("New connection");
  let clientId = shortid.generate();
  client.broadcast.emit("NEW_CONN/DISC_EVENT", {
    msg: `The new client connected, id: ${clientId}`,
    newClient: `Clients: ${++numberOfClients}`,
  });
  client.on("CLIENT_MSG", (data) => {
    client.emit("SERVER_MSG", { msg: `${clientId}: ${data.msg}` });
    client.broadcast.emit("SERVER_MSG", { msg: `${clientId}: ${data.msg}` });
  });
  client.on("disconnecting", () => {
    client.broadcast.emit("NEW_CONN/DISC_EVENT", {
      msg: `Client disconnected, id: ${clientId}`,
      newClient: `Clients: ${--numberOfClients}`,
    });
  });
});

app.listen(3000, "localhost");
