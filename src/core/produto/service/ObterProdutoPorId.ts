import CasoDeUso from "@/core/shared/CasoDeUso";
import Produto from "../model/Produto";
import Usuario from "@/core/usuario/model/Usuario";

export type Entrada = {
  produtoId: string;
  usuario: Usuario;
};

export default class ObterProdutoPorId implements CasoDeUso<Entrada, Produto> {
  async execute(entrada: Entrada): Promise<Produto> {
    console.log(entrada);
    return {
      id: entrada.produtoId,
      nome: "Produto 1",
      preco: 10.0,
      consultadorPor: entrada.usuario.email,
    };
  }
}
