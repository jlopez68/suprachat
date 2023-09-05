import User from "../models/User.js";
import { Transporter } from "../config/mailer.js";
import passport from "passport";

export const renderSignUpForm = (req, res) => res.render("auth/signup");

export const signup = async (req, res) => {
  let errors = [];

  const { name, apellido, email, password, celular, usuario, tipo_usuario} = req.body;
  const newUser = new User({ name, apellido, email, celular ,usuario, tipo_usuario, password}); 
  newUser.tipo_usuario = "Visitador";
  newUser.user_status = "Pendiente";
  const us  = name.substring(0,1)+apellido;
  newUser.usuario = us.toLowerCase();
  newUser.password = "FAPASA"+celular;
 // newUser.password = await newUser.encryptPassword("FAPASA"+registro);
  newUser.cambio_password = "0";
  await newUser.save();

  req.flash("success_msg", "Registro Completado");
  //envio del email a administrador para aprobar

  const contentHtml = `
  <h1> Datos del Visitador Medico a Aprobar </h1>
  <ul> 
      <li> Se acaba de registrar el Visitador: ${name} ${apellido}, favor proceder a aprobarlo</li>
      </ul>
  `;


   
  await Transporter.sendMail({
  from: 'admsupracha@gmail.com', // sender address administrador
  to: 'lilymorenoledezma@gmail.com' ,
  subject: "Registro por Autorizar", // Subject line
  html: contentHtml, // html body
});


  res.redirect("/auth/signin");
};

export const renderSigninForm = (req, res) => res.render("auth/signin");

export const signin = passport.authenticate("local", {
  successRedirect: "/notes",
  failureRedirect: "/auth/signin",
  failureFlash: true,
});

export const logout = async (req, res, next) => {
  await req.logout((err) => {
    if (err) return next(err);
    req.flash("success_msg", "Cerrando Sesion");

      res.redirect("/");
  });
};

//export const renderChangePassw = (req, res) => res.render("auth/changepassw");
export const renderChangePassw = async (req, res) => 
{
  const usuarios = await User.findById(req.params.id).lean();

  console.log(usuarios);
  res.render("auth/changepassw", { usuarios });
};


  export const change = async (req, res) => {
  let errors = [];
    const { password,  usuario ,confirm_password, cambio_password } = req.body;
    const cambio = User({password});

    if (password !== confirm_password) {
      errors.push({ text: "Passwords no coinciden." });
    }
  
    if (password.length < 8) {
      errors.push({ text: "Passwords debe tener al menos 8 caracteres." });
    }
    //User.password = await cambio.encryptPassword(password);

    await User.findByIdAndUpdate(req.user.id, { password,  usuario ,cambio_password });
 
    req.flash("success_msg", "Password Actualizado Satisfactoriamente, Favor Ingresar ");
    res.redirect("/auth/signin");


};


  