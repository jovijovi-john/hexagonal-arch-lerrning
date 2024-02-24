import Usuario from "@/core/usuario/model/Usuario";
import RepositorioUsuario from "@/core/usuario/service/RepositorioUsuario";

export default class RepositorioUsuarioEmMemoria implements RepositorioUsuario {
  private static readonly items: Usuario[] = [];

  async inserir(usuario: Usuario) {
    const items = RepositorioUsuarioEmMemoria.items;
    const usuarioExiste = await this.buscarPorEmail(usuario.email);

    if (usuarioExiste) {
      return;
    }

    items.push(usuario);
  }

  async buscarPorEmail(email: string): Promise<Usuario | null> {
    const items = RepositorioUsuarioEmMemoria.items;
    return items.find((usuario) => usuario.email === email) ?? null;
  }
}
