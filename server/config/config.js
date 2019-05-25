//=======================
// PORT
//=======================
process.env.PORT = process.env.PORT || 3000;
//=======================
// ENTORNO
//=======================
process.env.NODE_ENV = process.env.NODE_ENV || "dev";
//=======================
// BD
//=======================
let urlDB;

if (process.env.NODE_ENV === "dev") {
  urlDB = "mongodb://localhost:27017/cafe";
} else {
  urlDB = process.env.MONGO_URI; //se configuró variable de entorno a través del comando
  //heroku config:set MONGO_URI="la cadena de conexion a la bd de atlas"
}

process.env.URLDB = urlDB;
