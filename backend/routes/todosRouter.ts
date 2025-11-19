import { Router, type Request, type Response } from "express";
import { getTodoController, getAllTodosController, createTodoController, deleteTodoController, updateTodoController } from "../controllers/todosControllers.ts";

const todosRouter = Router()

todosRouter.get("/:id", (req: Request, res: Response) => getTodoController(req, res));
todosRouter.get("/", (req: Request, res: Response) => getAllTodosController(req, res));
todosRouter.post("/", (req: Request, res: Response) => createTodoController(req, res));
todosRouter.delete("/:id", (req: Request, res: Response) => deleteTodoController(req, res));
todosRouter.put("/:id", (req: Request, res:Response) => updateTodoController(req, res));

export default todosRouter;