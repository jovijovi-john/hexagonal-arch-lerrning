import RegistrarUsuario from "@/core/usuario/service/RegistrarUsuario";
import { Express } from "express";

export default class RegistrarUsuarioController {
  constructor(servidor: Express, casoDeUso: RegistrarUsuario) {
    servidor.post("/api/usuarios/registrar", async (req, res) => {
      try {
        await casoDeUso.execute({
          nome: req.body.nome,
          email: req.body.email,
          senha: req.body.senha,
        });

        res.status(201).send();
      } catch (erro: any) {
        return res.status(400).send(erro.message);
      }
    });
  }
}
