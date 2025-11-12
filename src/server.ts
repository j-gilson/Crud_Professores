import Fastify from 'fastify'
import { studentRoutes } from './routes/students.routes.js'
import swaggerUi from '@fastify/swagger-ui'
import swagger from '@fastify/swagger'
import { teacherRoutes } from "./routes/teachers.routes.js";

const app = Fastify({ logger: true })



app.register(swagger, {
  swagger: {
    info: {
      title: 'Students API',
      description: 'Documentação da API (Fastify + Swagger)',
      version: '1.0.0'
    },
   
  }
})

app.register(swaggerUi,{
  routePrefix: '/docs',
  uiConfig: {
    docExpansion: 'list',
    deepLinking: false,
},
})

app.register(studentRoutes)
app.register(teacherRoutes)


app.get('/', async () => {
  return { message: 'Api está funcionado ' }
})
app.listen({ port: 3333 })
  .then(address => {
    console.log(`🚀 Servidor rodando em: ${address}`)
    console.log(`🚀 Servidor rodando em: ${address}/docs`)
  })
  .catch(err => {
    app.log.error(err)
    process.exit(1)
  })