import express from "express";
import type { Application } from "express";
import { startMongoClient } from "./services/mongoService.ts";
import { loadEnvFile } from "node:process";
import todosRouter from "./routes/todosRouter.ts";

loadEnvFile('./.env');

const app: Application = express();
app.use(express.json());

async function setupClient() {
    const client = await startMongoClient();
    app.locals.client = client;
}

setupClient();

app.use("/todos", todosRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});