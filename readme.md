# Backend - Hexagonal Arch

Repositório criado com base nas aulas do curso de Clean Architecture da Cod3r. O projeto está divido nos seguintes componentes:

## 1. Core

O core da aplicação, onde temos as entities (em models) e seus respectivos useCases(em service). A pasta shared contém informações que são / podem ser compartilhadas entre todo o core da aplicação.

### 1.1 Models
Contém as entidades da aplicação. Estas entidades foram criadas usando o Anemic Domain Model, ou seja, apenas com seus atributos e sem comportamentos estabelecidos além de getters e setters.

### 1.2 Service
Contém os use cases de cada entidade, ou seja, a regra de negócio da aplicação. São interfaces cujos métodos devem ser implementados pela parte externa da aplicação, uma vez que aplica-se a inversão de dependência. É importante comentar que esses useCases são as ports da nossa aplicação, uma vez que estamos aplicando o padrão ports and adapters (hexagonal architecture)

## 2. External
Contém a parte externa da aplicação, ou seja, implementações das nossas ports (adapters), conexões a banco de dados, autenticação, geração de token, etc.

## 2.1 Api
Contém os controllers da aplicação, middlewares e implementação das regras de negócio de obter produto por id, login de usuário, registrar usuário e geração de token (esta ultima não está descrita nos useCases)

### 2.1.1 LoginUsuarioController
Implementa a regra de negócio de login de usuário recebendo um servidor(no momento a interface definida está fixa como do tipo Express) e o caso de uso de login de usuario (este nome usuário poderia ser descrito de outra forma menos genérica).

  - Recebe o email e senha do usuario via body da requisição
  - Devolve um token de acesso em caso de sucesso
  - Devolve um erro em caso de falha
  
### 2.1.2 ObterProdutoPorIdController
Implementa a regra de negócio de obter produto por id (atualmente está sempre retornando um elemento fixo). Recebe o servidor, o useCase e os middlewares. 

  - Recebe o usuario como parametro da requisição após autenticado
  - Recebe o id do produto a ser pesquisado
  - Retorna o produto em caso de sucesso
  - Retorna um erro em caso de falha
  
### 2.1.3 ProvedorJwt
Poderia implementar alguma regra de negócio referente a geração de tokens, mas atualmente está fixa como um provedor jwt baseado na lib jsonwebtoken

  - secret: é a variável que vai conter o secret utilizado para criptografar o payload do usuário
  - gerarToken: recebe um usuário como parâmetro e utiliza a secret para gerar um token cuja validade(em tempo) é definida pela propriedade expiresIn
  - verifyToken: recebe um token e utiliza da secret para verificar autenticidade / validade do token. Retorna um usuário

### 2.1.4 RegistrarUsuarioController
Implementa a regra de negócio referente a registro de usuários. Recebe o servidor e o useCase de criação de usuário.

  - Recebe o nome, email e senha do usuário no body da requisição
  - Retorna um status code de sucesso (201) caso o usuário seja criado
  - Retorna um erro em caso de falha
  
### 2.1.5 UsuárioMiddleware
É responsável por interceptar uma requisição e verificar se há um token válido em seus headers. Em caso de sucesso, insere o usuário no header da requisição e chama a próxima rota ou middleware. Em caso de falha, retorna um erro de não autorização.

## 3. Auth
Contém a implementação da regra de negócio de autenticação. Podem haver diversos provedores de criptografia diferentes, como os dois fakes (EspacoSenhaCripto e InverterSenhaCripto)

### 3.1 SenhaCripto
Responsável por implementar um provedor de criptografia usando bycript

  - criptografar: Recebe a senha como parâmetro e utiliza um salt gerado aleatoriamente, depois o criptografa junto com a senha no método hashSync. O parâmetro 10 é para o número de rounds utilizados na geração do hash.
  - compararSenha: recebe a senha informada pelo usuario e a senha criptografada. O método compareSync vai criptografar a senha informada e compará-la com a senha criptografada recebida como parâmetro. Caso sejam equivalentes, retorna true, do contrário retorna false.

## 4. Database
Responsável pelas implementações de repositórios (atualmente somente de usuários). Cada repositório é encarregado de implementar a lógica de criação de usuário e obtenção de usuário com base no email informado. 

### 4.1 RepositorioUsuarioEmMemoria
Implementa um repositório em memória com os métodos estabelecidos por RepositorioUsuario.

### 4.2 RepositorioUsuarioPostgres
Implementa um repositório baseado no SGBD Postgres. 

### 4.3 DB 
Cria uma instância de conexão com o postgres

## 5. Inicializar o projeto:
Crie um arquivo .env baseado no .env.example e coloque as credenciais nele. Caso queira usar docker, no arquivo docker-compose já contém uma imagem do postgres, incluindo já um nome de database que pode ser mudado. Mas lembre-se de colocar o user e o password, uma vez que, no momento, o arquivo é estático e não pega informações vindas de variáveis de ambiente.

```shell
npm run dev #para inicializar a api
```

## Sugestões de melhorias:
  
  - Abstrair os controllers: Todos os controllers da aplicação recebem os mesmos parâmetros (com exceção dos middlewares, logo estes poderiam ser opcionais)
  - Abstrair a lógica de geração de token. Ou seja, criar um useCase para isso (não sei se seria necessário)
  - Trocar o nome usuário por algo menos genérico, para isso poderia estabelecer um domínio mais específico e menos generalista, tornando a aplicação mais nichada
  - Alterar a regra de negócio de obtenção de produto por id, pois atualmente está apenas criando um objeto fixo. Um repositório para produto seria necessário.
  - Isolar melhor as implementações em database, pois atualmente está fixa em db, sempre será postgres. Poderia separar em pasta cada implementação com suas respectivas instâncias, e chamar a desejada no main component.
  - Melhorar a nomenclatura das pastas (deixá-las em inglês e mais descritivas)
  - Separar as rotas num arquivo routes dentro de api, assim a responsabilidade de definição dos endpoints seria isolada da lógica de implementação dos controllers (não sei exatamente como isso seria feito, já que possívelmente afetaria o main component).
  - Criar pastas referentes a cada responsabilidade: Por exemplo, criar uma pasta middlewares em api, controllers, routes, utils, etc. No core criar repositories, providers, useCases.
  - Mudar o docker-compose para que receba as credenciais a partir de variáveis de ambiente.
  - Criação de testes
  - OPCIONAL: Retornar um token de acesso na criação do usuário, é opcional pois isso depende da regra de negócio. Logar o usuário automaticamente ou não?