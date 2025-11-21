import { FastifyRequest, FastifyReply } from "fastify";

export async function authHook(request: FastifyRequest, reply: FastifyReply) {
  if (request.url.startsWith("/login")) return;

  const token = request.headers.authorization;

  if (!token || token !== "Bearer 123456") {
    return reply.status(401).send({ error: "Acesso não autorizado" });
  }
}
