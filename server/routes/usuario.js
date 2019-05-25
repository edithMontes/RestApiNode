const express = require("express");
const bcrypt = require("bcrypt");
const _ = require("underscore");
const app = express();
const Usuario = require("../models/usuario");

app.get("/usuario", function(req, res) {
  let desde = req.query.desde || 0; //se manda en la url el parámetro: {{url}}/usuario?desde=10
  desde = Number(desde);

  let porpagina = req.query.porpagina || 5;
  porpagina = Number(porpagina); //especifica cuantos se verán por pagina: {{url}}/usuario?porpagina=10&desde=10

  Usuario.find({ estado: true }, "nombre email role estado google img") //se pasan los campos a mostrar al hacer el get
    .skip(desde)
    .limit(porpagina)
    .exec((err, usuarios) => {
      if (err) {
        return res.status(400).json({
          ok: false,
          err
        });
      }
      Usuario.count({ estado: true }, (err, conteo) => {
        res.json({
          ok: true,
          usuarios,
          cuantos: conteo
        });
      });
    });
  //res.json("get usuario");
});

app.post("/usuario", function(req, res) {
  let body = req.body;

  let usuario = new Usuario({
    nombre: body.nombre,
    email: body.email,
    password: bcrypt.hashSync(body.password, 10),
    role: body.role
  });
  //se intenta guardar el usuario en la bd, retornará error o el usuario guardado
  usuario.save((err, usuarioDB) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        err
      });
    }
    res.json({
      ok: true,
      usuario: usuarioDB
    });
  });
  //   res.json({
  //     persona: body //retorna lo que se manda en el body del post en formato json, el nombre de persona es opcional
  //   });
});

app.put("/usuario/:id", function(req, res) {
  let id = req.params.id; //el :id de la url es el params.id pero al nombre de la variable se le puede poner otro
  let body = _.pick(req.body, ["nombre", "email", "img", "role", "estado"]);

  Usuario.findByIdAndUpdate(
    id,
    body,
    { new: true, runValidators: true },
    (err, usuarioDB) => {
      if (err) {
        return res.status(400).json({
          ok: false,
          err
        });
      }
      res.json({
        ok: true,
        usuario: usuarioDB
        // valor_de_la_url: id //esta mostrando lo que se guarda en la variable let id
      }); //lo que retorna es todo lo que pongas en la url después de usuario en formato json id:34553  x ejemplo
    }
  );
});

app.delete("/usuario/:id", function(req, res) {
  //se obtiene el id a borrar a través de la url para borrarlo físicamente de la bd
  let id = req.params.id;
  let cambiaEstado = {
    estado: false
  };
  Usuario.findByIdAndUpdate(id, cambiaEstado, (err, usuarioActualizado) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        err
      });
    }
    res.json({
      ok: true,
      estadoUsuario: usuarioActualizado
    });
  });
  // Usuario.findByIdAndRemove(id, (err, usuarioBorrado) => {
  //   if (err) {
  //     return res.status(400).json({ ok: false, err });
  //   }
  //   if (!usuarioBorrado) {
  //     //es igual a decir usuarioBorrado === null
  //     return res
  //       .status(400)
  //       .json({ ok: false, err: { message: "usuario no encontrado" } });
  //   }
  //   res.json({ ok: false, usuario: usuarioBorrado });
  // });
});

module.exports = app;
