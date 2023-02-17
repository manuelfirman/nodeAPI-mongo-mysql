require("dotenv").config();
const express = require("express");
const cors = require("cors");
const dbConnectNoSql = require("./config/mongodb");
const {dbConnectMySql} = require("./config/mysql");
// const { IncomingWebhook } = require("@slack/webhook")
// const morganBody = require("morgan-body");
const router = require("./routes");
const ENGINE_DB = process.env.ENGINE_DB;

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("src/storage"));

// const webHook = new IncomingWebhook(process.env.SLACK_WEBHOOK);

// const loggerStream = {
//   write: message => {
//     webHook.send({
//       text: message
//     })
//     console.log("Capturando LOG", message);
//   },
// }

// morganBody(app, {
//   noColors:true,
//   stream: loggerStream
// });

const PORT = process.env.PORT || 3001;

app.use("/api", router);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

(ENGINE_DB === "nosql") ? dbConnectNoSql() : dbConnectMySql();
