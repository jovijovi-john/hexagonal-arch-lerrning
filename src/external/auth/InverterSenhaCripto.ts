import ProvedorCriptografia from "@/core/usuario/service/ProvedorCriptografia";

// Na arquitetura hexagonal essa classe é um Adaptador (adapter) -> implementação concreta de uma porta
// Não faz parte do core business da aplicação
export default class InverterSenhaCripto implements ProvedorCriptografia {
  criptografar(senha: string): string {
    return senha.split("").reverse().join("");
  }

  compararSenha(senha: string, senhaCriptografada: string): boolean {
    return this.criptografar(senha) === senhaCriptografada;
  }
}
