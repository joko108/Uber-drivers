import { Request, Response } from "express";
import { HttpStatuses } from "../../../core/types/http-statuses";
import { driversRepository } from "../../repository/drivers.repository";

export function getDriverListHandler(req: Request, res: Response) {
    res.status(HttpStatuses.Ok).send(driversRepository.findAll());
}
