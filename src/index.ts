import dotenv from "dotenv";
dotenv.config();

import express from "express";
import RegistrarUsuario from "./core/usuario/service/RegistrarUsuario";
import RepositorioUsuarioPostgres from "./external/database/RepositorioUsuarioPostgres";
import SenhaCripto from "./external/auth/SenhaCripto";
import RegistrarUsuarioController from "./external/api/RegistrarUsuarioController";
import LoginUsuarioController from "./external/api/LoginUsuarioController";
import LoginUsuario from "./core/usuario/service/LoginUsuario";
import ObterProdutoPorIdController from "./external/api/ObterProdutoPorIdController";
import ObterProdutoPorId from "./core/produto/service/ObterProdutoPorId";
import UsuarioMiddleware from "./external/api/UsuarioMiddleware";

const app = express();
const port = process.env.API_PORT ?? 4000;

app.use(express.json()); //fazer parse de json
app.use(
  express.urlencoded({
    extended: true,
  })
); // usado para lidar com dados de formulários

// ------------------------------------------------
// ------------------------------------------------

const repositorioUsuario = new RepositorioUsuarioPostgres();
const provedorSenhaCripto = new SenhaCripto();
const registrarUsuario = new RegistrarUsuario(provedorSenhaCripto, repositorioUsuario);

const loginUsuario = new LoginUsuario(repositorioUsuario, provedorSenhaCripto);

new RegistrarUsuarioController(app, registrarUsuario);
new LoginUsuarioController(app, loginUsuario);

// rotas protegidas ----------------------------------------------------------
const obterProdutoPorId = new ObterProdutoPorId();
const usuarioMiddleware = UsuarioMiddleware(repositorioUsuario);
new ObterProdutoPorIdController(app, obterProdutoPorId, usuarioMiddleware);

app.listen(port, () => {
  console.log(`🔥 Servidor executando na porta ${port}`);
});
