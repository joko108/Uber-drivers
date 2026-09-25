import { Request, Response } from "express";
import { ridesRepository } from "../../repository/rides.repository";
import { HttpStatus } from "../../../core/types/http-statuses";

export function getRideListHandler(req: Request, res: Response) {
    res.status(HttpStatus.Ok).send(ridesRepository.findAll());
}
