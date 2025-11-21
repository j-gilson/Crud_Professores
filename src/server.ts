import Fastify from "fastify";
import cookie from "@fastify/cookie";

import { studentRoutes } from "./routes/students.routes.js";
import { teacherRoutes } from "./routes/teachers.routes.js";
import { loginRoutes } from "./routes/login.routes.js";

import { logOnRequest, logOnResponse } from "./milddlewares/log.js";

import { authHook } from "./milddlewares/auth.js";

const app = Fastify({ logger: false });

// Cookies obrigatórios para Tarefa 2
app.register(cookie);

// Middleware global – onRequest + onResponse
app.addHook("onRequest", logOnRequest);
app.addHook("onResponse", logOnResponse);
app.addHook("preHandler", authHook)

// Rotas principais
app.register(loginRoutes);
app.register(studentRoutes);
app.register(teacherRoutes);

app.listen({ port: 3333 }, () => {
  console.log("🚀 Servidor rodando em http://localhost:3333");
});


// import Fastify from 'fastify'
// import swaggerUi from '@fastify/swagger-ui'
// import swagger from '@fastify/swagger'

// import { studentRoutes } from './routes/students.routes.js'
// import { teacherRoutes } from "./routes/teachers.routes.js"
// import { loginRoutes } from './routes/login.routes.js'

// import { authHook } from "./milddlewares/auth.js"
// import { logHook } from "./milddlewares/log.js"

// import fs from "fs";
// import path from "path";

// const app = Fastify({ logger: true })

// // 🔹 1) Middleware GLOBAL de LOGS
// app.addHook("onRequest", logHook)

// // 🔹 2) Swagger
// app.register(swagger, {
//   swagger: {
//     info: {
//       title: 'Students API',
//       description: 'Documentação da API (Fastify + Swagger)',
//       version: '1.0.0'
//     },
//   }
// })

// app.register(swaggerUi, {
//   routePrefix: '/docs',
//   uiConfig: {
//     docExpansion: 'list',
//     deepLinking: false,
//   },
// })

// // 🔹 3) Rotas públicas
// app.register(loginRoutes)

// // 🔹 4) Middleware de autenticação para rotas privadas
// app.addHook("preHandler", authHook)

// // 🔹 5) Rotas protegidas
// app.register(studentRoutes)
// app.register(teacherRoutes)

// // 🔹 6) Inicialização
// app.listen({ port: 3333 })
//   .then(address => {
//     console.log(`🚀 Servidor rodando em: ${address}`)
//     console.log(`📘 Swagger disponível em: ${address}/docs`)
//   })
//   .catch(err => {
//     app.log.error(err)
//     process.exit(1)
//   })
