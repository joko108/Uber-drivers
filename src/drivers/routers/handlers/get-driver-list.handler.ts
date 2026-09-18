import { Request, Response } from "express";
import { HttpStatuses } from "../../../core/types/http-statuses";
import { db } from "../../../db/in-memory.db";

export function getDriverListHandler(req: Request, res: Response) {
    res.status(HttpStatuses.Ok).send(db.drivers);
}
