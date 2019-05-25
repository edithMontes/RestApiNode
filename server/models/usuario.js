const moongose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

let Schema = moongose.Schema;

let rolesValidos = {
  values: ["ADMIN_ROLE", "USER_ROLE"],
  message: "{VALUE} no es un rol válido" //el value representa lo que se escriba en el cuerpo del post campo role
};

let usuarioSchema = new Schema({
  nombre: {
    type: String,
    required: [true, "El nombre es un campo obligatorio"]
  },
  email: {
    type: String,
    unique: true, //no debe permitir guardar 2 usuarios con mismo correo ;)
    required: [true, "El email es un campo obligatorio"]
  },
  password: {
    type: String,
    required: [true, "Es necesario indicar una contraseña"]
  },
  img: {
    type: String,
    required: false
  },
  role: {
    type: String,
    default: "USER_ROLE",
    enum: rolesValidos
  },
  estado: {
    type: Boolean,
    default: true
  },
  google: {
    type: Boolean,
    default: false
  }
});

//Se altera el esquema para eliminar del jSON el campo del password y que no se vea como respuesta por seguridad
usuarioSchema.methods.toJSON = function() {
  let user = this;
  let userObject = user.toObject();
  delete userObject.password;

  return userObject;
};

usuarioSchema.plugin(uniqueValidator, { message: "{PATH} debe de ser único" });

module.exports = moongose.model("Usuario", usuarioSchema);
