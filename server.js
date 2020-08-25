//loading required modules
const express = require("express");
const app = express();

const path = require("path");

let map = 5;
//localhost port
let PORT = 2000;

// app.use(express.static(path.join(__dirname, './static')))

app.get("/", (request, response) => {
  response.send("HI");
});

app.listen(PORT, () => {
  console.log(`Express is listening at port ${PORT}`);
});
