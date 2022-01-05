import { createServer, Factory, Model, Response } from "miragejs";
import faker from "faker";

type User = {
  name: string;
  email: string;
  created_at: string;
};

export function makeServer() {
  const server = createServer({
    models: {
      user: Model.extend<Partial<User>>({}),
    },

    //factories são formas de conseguir gerar dados em massa
    factories: {
      user: Factory.extend({
        name(i: number) {
          return `User ${i + 1}`;
        },
        email() {
          return faker.internet.email().toLowerCase();
        },
        createdAt() {
          return faker.date.recent(10);
        },
      }),
    },

    //seeds cria dados assim que o servidor MirageJS é iniciado
    seeds(server) {
      //criará 200 usuários aleatórios
      server.createList("user", 200);
    },

    routes() {
      this.namespace = "api";
      //toda chamada ao mirage levará 750 ms
      this.timing = 750;

      this.get("/users", function (schema, request) {
        const { page = 1, per_page = 10 } = request.queryParams;

        const total = schema.all("user").length;

        const pageStart = (Number(page) - 1) * Number(per_page);
        const pageEnd = pageStart + Number(per_page);

        //serialize faz com que os dados passem pelas configurações definidas pelo model
        const users = this.serialize(schema.all("user")).users.slice(
          pageStart,
          pageEnd
        );

        //1º parâmetro: status
        //2º parâmetro: headers da requisição
        //3º parâmetro: registros
        return new Response(200, { "x-total-count": String(total) }, { users });
      });
      this.post("/users");

      //reseta o namespace após ser utilizado pelo mirage para não conflitar
      //com rotas definidas pelo Next
      this.namespace = "";
      //todas chamadas enviadas para a API passarão pelo Mirage e, caso não sejam
      //detectadas pelas rotas do Mirage, seguirão adiante para alguma rota original
      //dentro do Next
      this.passthrough();
    },
  });

  return server;
}
