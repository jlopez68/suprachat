import { Router } from "express";
import {
  renderUsuariosForm,
  createNewUsuarios,
  renderUsuarios,
  renderEditUsuarios,
  updateUsuarios,
  bloquearUsuarios,
  renderRechazarUsuarios,
  rechazarUsuarios,
  renderVisualizarUsuarios,
  imprimirUsuarios
} from "../controllers/usuarios.controllers.js";

import { isAuthenticated } from "../helpers/auth.js";

const router = Router();

// New Usuario
router.get("/usuarios/add", isAuthenticated, renderUsuariosForm);

router.post("/usuarios/new-usuarios", isAuthenticated, createNewUsuarios);

// Get All usuarios
router.get("/usuarios", isAuthenticated, renderUsuarios);

// Edit Usuarios
router.get("/usuarios/edit/:id", isAuthenticated, renderEditUsuarios);

router.put("/usuarios/edit-usuarios/:id", isAuthenticated, updateUsuarios);

// bloquear usuarios

router.get("/usuarios/bloquear/:id", isAuthenticated, bloquearUsuarios);

// rechazar usuarios

router.get("/usuarios/rechazar/:id", isAuthenticated, renderRechazarUsuarios);

router.put("/usuarios/rechazar-usuarios/:id", isAuthenticated, rechazarUsuarios);

//router.get("/usuarios/rechazar/:id", isAuthenticated, rechazarUsuarios);

// visualizar Usuarios
router.get("/usuarios/visualizar/:id", isAuthenticated, renderVisualizarUsuarios);

//router.put("/usuarios/visualizar-usuarios/:id", isAuthenticated, visualizarUsuarios);

// imprimir Usuarios
router.get("/usuarios/imprimir", isAuthenticated, imprimirUsuarios);

export default router;
