import User from "../models/User.js";

export const createAdminUser = async () => {
  const userFound = await User.findOne({ email: "admin@localhost" });

  if (userFound) return;

  const newUser = new User({
    username: "admin",
    name: 'Administrador',
    email: "admin@localhost",
    usuario: "admin",
    password: "adminpassword",
    tipo_usuario: "Administrador",
    user_status: "aprobado"
  });

  //newUser.password = await newUser.encryptPassword("adminpassword");

  const admin = await newUser.save();

  const newUser1 = new User({
    username: "farmacia",
    name: "Farmacia",
    email: "farma@localhost",
    usuario: "farmacia",
    password: "farmaciapassword",
    tipo_usuario: "Farmacia",
    user_status: "aprobado"
  });

 // newUser1.password = await newUser1.encryptPassword("farmaciapassword");

  const farmacia = await newUser1.save();

  console.log("Admin user created", admin);
};
