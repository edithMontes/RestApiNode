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
  urlDB =
    "mongodb+srv://powergirl:q5c45McZyBRQCpkl@cluster0-xcara.mongodb.net/cafe";
}

process.env.URLDB = urlDB;
