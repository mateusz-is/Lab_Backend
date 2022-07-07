require("dotenv").config();
const express = require("express");
const cors = require("cors");

const swaggerUi = require('swagger-ui-express'),
swaggerDocument = require('./swagger.json');

const app = express();



var corsOptions = {
  origin: "http://54.37.138.253:8020"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");

console.log(db.url); 

db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });


require("./app/routes/app.routes")(app);

// set port, listen for requests
const PORT = process.env.NODE_DOCKER_PORT || 8020;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});


app.use(
  '/api-docs',
  swaggerUi.serve, 
  swaggerUi.setup(swaggerDocument)
);