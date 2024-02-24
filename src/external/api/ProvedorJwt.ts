import jwt from "jsonwebtoken";

export default class ProvedorJwt {
  constructor(private secret: string) {}

  gerarToken(dados: string | object): string {
    return jwt.sign(dados, this.secret, {
      expiresIn: "7d",
    });
  }

  verifyToken(token: string): string | object {
    return jwt.verify(token, this.secret);
  }
}
