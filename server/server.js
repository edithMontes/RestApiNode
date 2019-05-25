require("./config/config");
const express = require("express");
const app = express();
const mongoose = require("mongoose");

const bodyParser = require("body-parser");

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false })); //el .use significa que es un middleware

// parse application/json
app.use(bodyParser.json()); //cada petición que se haga debe pasar por estas líneas de .use

app.use(require("./routes/usuario"));

mongoose.connect(
  process.env.URLDB, //esta variable contiene la cadena de conexión sea local o la alojada en atlas
  { useNewUrlParser: true, useCreateIndex: true },
  (err, res) => {
    if (err) throw err;

    console.log("Base de datos ONLINE!!");
  }
);

app.listen(process.env.PORT, () => {
  console.log("Escuchando el puerto: ", process.env.PORT);
});
