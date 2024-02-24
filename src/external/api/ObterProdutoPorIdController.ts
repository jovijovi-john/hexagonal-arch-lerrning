import ObterProdutoPorId from "@/core/produto/service/ObterProdutoPorId";
import { Express, Request, Response } from "express";

export default class ObterProdutoPorIdController {
  constructor(servidor: Express, casoDeUso: ObterProdutoPorId, ...middlewares: any[]) {
    servidor.get("/api/produtos/:id", ...middlewares, async (req: Request, res: Response) => {
      try {
        const produto = await casoDeUso.execute({
          produtoId: req.params.id,
          usuario: (req as any).usuario,
        });

        res.status(200).send(produto);
      } catch (err: any) {
        res.status(404).send(err.message);
      }
    });
  }
}
