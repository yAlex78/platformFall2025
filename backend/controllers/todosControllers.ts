import type { Request, Response } from "express";
import { getTodo, createTodo, deleteTodo, updateTodo, getAllTodos } from "../services/todosService.ts";

export const getAllTodosController = async (req: Request, res: Response) => {
  const client = req.app.locals.client;
  try {
    const todos = await getAllTodos(client); // <-- new function in your mongoService
    res.status(200).json({
      success: true,
      data: todos,
    });
  } catch (e: unknown) {
    if (e instanceof Error){
        res.status(400).json({
            success: false,
            message: e.message,
        });
    } else {
        res.status(400).json({
            success: false,
            message: "couldn't get error message",
        });
    }
  }
};

/**
 * 
 * @param req: Express Request
 * @param res: Express Response
 */
export const getTodoController = async (req: Request, res: Response) => {
    const client = req.app.locals.client;
    try {
        const id: string = req.params.id;
        const record = await getTodo(client, id);
        res.status(200).send({
            success: true,
            data: record,
        });
    } catch (e: unknown) {
        if (e instanceof Error){
            res.status(400).json({
                success: false,
                message: e.message,
            });
        } else {
            res.status(400).json({
                success: false,
                message: "couldn't get error message",
            });
        }
    }
};

/**
 * 
 * @param req Express Request
 * @param res Express Response
 */
 export const createTodoController = async (req: Request, res: Response) => {
    const client = req.app.locals.client;
    try {
        const title: string = req.body.title;
        const desc: string = req.body.desc;
        const dueDate: string = req.body.dueDate;
        const completed: boolean = req.body.completed;
        const record = await createTodo(client, title, desc, dueDate, completed);
        res.status(200).json({
            success: true,
            data: record,
        });
    } catch (e: unknown) {
        if (e instanceof Error){
            res.status(400).json({
                success: false,
                message: e.message,
            });
        } else {
            res.status(400).json({
                success: false,
                message: "couldn't get error message",
            });
        }
    }
};

/**
 * 
 * @param req Express Request
 * @param res Express Response
 */
 export const deleteTodoController = async (req: Request, res: Response) => {
    const client = req.app.locals.client;
    try {
        const id: string = req.params.id;
        await deleteTodo(client, id);
        res.status(200).json({
            success: true,
            data: id,
        });
    } catch (e: unknown) {
        if (e instanceof Error){
            res.status(400).json({
                success: false,
                message: e.message,
            });
        } else {
            res.status(400).json({
                success: false,
                message: "couldn't get error message"
            });
        }
    }
};

/**
 * 
 * @param req Express Request
 * @param res Express Response
 */
 export const updateTodoController = async (req: Request, res: Response) => {
    const client = req.app.locals.client;
    try {
        const title: string = req.body.title;
        const desc: string = req.body.desc;
        const dueDate: string = req.body.dueDate;
        const completed: boolean = req.body.completed;
        const id: string = req.params.id;
        const record = await updateTodo(client, id, title, desc, dueDate, completed);
        res.status(200).json({
            success: true,
            data: record,
        });
    } catch (e: unknown) {
        if (e instanceof Error){
            res.status(400).json({
                success: false,
                message: e.message,
            });
        } else {
            res.status(400).json({
                success: false,
                message: "couldn't get error message",
            });
        }
    }
};