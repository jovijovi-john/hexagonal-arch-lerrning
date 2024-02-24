// Na arquitetura hexagonal esta interface é uma porta
// A porta faz parte do core business da aplicação
export default interface ProvedorCriptografia {
  criptografar(texto: string): string;

  compararSenha(senha: string, senhaCriptografada: string): boolean;
}
