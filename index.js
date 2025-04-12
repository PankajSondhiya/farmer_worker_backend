require("dotenv").config();
const cors = require("cors");
const { DB_URL } = require("./config/db.config");
const { PORT } = require("./config/server.config");

const mongoose = require("mongoose");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
// app.use(bodyParser.json());
app.use(express.json());
app.use(cors());
require("./routes/auth.route")(app);
require("./routes/job.route")(app);
require("./routes/user.route")(app);
mongoose
  .connect(`${DB_URL}`)
  .then(() => console.log("connected to mongoDB"))
  .catch((ex) => console.log(ex));

app.listen(PORT, () => {
  console.log(`listining to port ${PORT}`);
});
