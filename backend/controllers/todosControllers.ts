import type { Request, Response } from "express";
import { getTodo } from "../services/todosService.ts";


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