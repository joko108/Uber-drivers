import { Request, Response } from "express";
import { db } from "../../../db/in-memory.db";
import { HttpStatuses } from "../../../core/types/http-statuses";

// Полностью очищает данные (используется в e2e-тестах перед прогоном).
export function truncateDbHandler(req: Request, res: Response) {
    db.drivers = [];
    res.sendStatus(HttpStatuses.NoContent);
}
