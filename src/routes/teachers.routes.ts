import type { FastifyInstance } from "fastify";
import { teacherController } from "../controllers/teachers.controller.js";

export async function teacherRoutes(app: FastifyInstance) {
  app.get("/teachers", teacherController.list);
  app.get("/teachers/:id", teacherController.get);
  app.post("/teachers", teacherController.create);
  app.put("/teachers/:id", teacherController.update);
  app.delete("/teachers/:id", teacherController.remove);
}
