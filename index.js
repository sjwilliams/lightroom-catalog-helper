const express = require("express");
const app = express();
const nocache = require("nocache");
const slashes = require("connect-slashes");

app.use(nocache());
app.use(express.static(__dirname + "/public"));
app.use(slashes(true));

require("./lib/routes")(app);

const getRuntimeOption = require("./lib/get-runtime-option");
const PORT = getRuntimeOption("--port", "-p") || process.env.PORT || 0;
const open = require("open");
const server = app.listen(PORT, () => {
  const url = `http://localhost:${server.address().port}`;
  console.log(`server listening on ${url}`);
  if (process.argv.indexOf("-ns") === -1) {
    open(url);
  }
});
