import { Router, type Request, type Response } from "express";
import { getTodoController } from "../controllers/todosControllers.ts";

const todosRouter = Router()

todosRouter.get("/:id", (req: Request, res: Response) => getTodoController(req, res));

export default todosRouter;