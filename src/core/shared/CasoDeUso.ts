export default interface CasoDeUso<E, S> {
  execute(entrada: E): Promise<S>;
}
