import type { Request, Response } from "express";
import { getTodo, createTodo, deleteTodo, updateTodo, getAllTodos } from "../services/todosService.ts";

/**
 * Get all todos for the authenticated user
 * @param req Express Request (user is attached by passport)
 * @param res Express Response
 */
export const getAllTodosController = async (req: Request, res: Response) => {
  const client = req.app.locals.client;
  try {
    // req.user is populated by passport JWT authentication
    const userId = (req.user as any)._id.toString();
    const todos = await getAllTodos(client, userId);
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
 * Get a specific todo (if it belongs to the authenticated user)
 * @param req Express Request
 * @param res Express Response
 */
export const getTodoController = async (req: Request, res: Response) => {
    const client = req.app.locals.client;
    try {
        const id: string = req.params.id;
        const userId = (req.user as any)._id.toString();
        const record = await getTodo(client, id, userId);
        
        if (!record) {
            return res.status(404).json({
                success: false,
                message: "Todo not found or access denied",
            });
        }
        
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
 * Create a new todo for the authenticated user
 * @param req Express Request
 * @param res Express Response
 */
export const createTodoController = async (req: Request, res: Response) => {
    const client = req.app.locals.client;
    try {
        const userId = (req.user as any)._id.toString();
        const title: string = req.body.title;
        const desc: string = req.body.desc;
        const dueDate: string = req.body.dueDate;
        const completed: boolean = req.body.completed;
        
        const record = await createTodo(client, userId, title, desc, dueDate, completed);
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
 * Delete a todo (if it belongs to the authenticated user)
 * @param req Express Request
 * @param res Express Response
 */
export const deleteTodoController = async (req: Request, res: Response) => {
    const client = req.app.locals.client;
    try {
        const id: string = req.params.id;
        const userId = (req.user as any)._id.toString();
        const result = await deleteTodo(client, id, userId);
        
        if (result.deletedCount === 0) {
            return res.status(404).json({
                success: false,
                message: "Todo not found or access denied",
            });
        }
        
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
 * Update a todo (if it belongs to the authenticated user)
 * @param req Express Request
 * @param res Express Response
 */
export const updateTodoController = async (req: Request, res: Response) => {
    const client = req.app.locals.client;
    try {
        const userId = (req.user as any)._id.toString();
        const title: string = req.body.title;
        const desc: string = req.body.desc;
        const dueDate: string = req.body.dueDate;
        const completed: boolean = req.body.completed;
        const id: string = req.params.id;
        
        const result = await updateTodo(client, id, userId, title, desc, dueDate, completed);
        
        if (result.matchedCount === 0) {
            return res.status(404).json({
                success: false,
                message: "Todo not found or access denied",
            });
        }
        
        res.status(200).json({
            success: true,
            data: result,
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