import fs from "fs";
import path from "path";
import { FastifyRequest, FastifyReply } from "fastify";

// Extensão mínima para permitir propriedades customizadas usadas no middleware
interface ExtendedFastifyRequest extends FastifyRequest {
  startTime?: number;
  timestamp?: string;
  clientIP?: string;
}

// Criar pasta logs se não existir
const logDir = path.join(process.cwd(), "logs");
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

const logFile = path.join(logDir, "access.log");

export async function logOnRequest(request: FastifyRequest) {
  const req = request as ExtendedFastifyRequest;
  req.startTime = performance.now();
  req.timestamp = new Date().toISOString();
  req.clientIP = req.ip || "127.0.0.1";
}

export async function logOnResponse(request: FastifyRequest, reply: FastifyReply) {
  const req = request as ExtendedFastifyRequest;
  const end = performance.now();
  const total = Math.round(end - (req.startTime ?? end));

  const logLine = `[${req.timestamp}] IP: ${req.clientIP} | ${req.method} ${req.url} | STATUS: ${reply.statusCode} | TEMPO: ${total}ms\n`;

  fs.appendFileSync(logFile, logLine, "utf8");
  console.log(logLine.trim());
}
