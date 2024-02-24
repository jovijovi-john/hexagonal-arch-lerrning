import { Request, Response, NextFunction } from "express";
import ProvedorJwt from "./ProvedorJwt";
import Usuario from "@/core/usuario/model/Usuario";
import RepositorioUsuario from "@/core/usuario/service/RepositorioUsuario";

export default function UsuarioMiddleware(repositorio: RepositorioUsuario) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const acessoNegado = () => res.status(403).send("Token inválido");

    const token = req.headers.authorization?.trim().split(" ")[1];

    if (!token) {
      acessoNegado();
      return;
    }

    const provedorJWT = new ProvedorJwt(process.env.JWT_SECRET!);
    const usuarioToken = provedorJWT.verifyToken(token) as Usuario;
    const usuario = await repositorio.buscarPorEmail(usuarioToken.email);

    if (!usuario) {
      acessoNegado();
      return;
    }

    usuario.senha = undefined;
    (req as any).usuario = usuario;
    console.log(req);

    next();
  };
}
