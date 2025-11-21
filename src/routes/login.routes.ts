import { FastifyInstance, FastifyRequest } from "fastify";

type DashboardQuery = { source?: string };
type LoginQuery = { auth?: string };

export async function loginRoutes(app: FastifyInstance) {

  // 🔵 Rota de Dashboard (destino final)
  app.get("/dashboard", async (req: FastifyRequest<{ Querystring: DashboardQuery }>, reply) => {
    return {
      message: "Bem-vindo ao dashboard!",
      source: req.query.source || "desconhecida"
    };
  });

  // 🔵 Rota de Login com redirecionamentos
  app.get("/login", async (req: FastifyRequest<{ Querystring: LoginQuery }>, reply) => {
    
    // 1️⃣ Verificar token no header
    const authHeader = req.headers.authorization;
    if (authHeader === "Bearer 12345") {
      return reply.redirect("/dashboard?source=token");
    }

    // 2️⃣ Verificar query ?auth=true
    if (req.query.auth === "true") {
      return reply.redirect("/dashboard?source=query");
    }

    // 3️⃣ Verificar cookie session=ok
    if (req.cookies?.session === "ok") {
      return reply.redirect("/dashboard?source=cookie");
    }

    // 4️⃣ Nenhuma forma de autenticação válida
    return reply.status(401).send({
      error: "Acesso negado. Nenhuma forma de autenticação encontrada."
    });

  });

}
