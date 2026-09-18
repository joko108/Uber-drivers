import { Request, Response } from "express";
import { db } from "../../../db/in-memory.db";
import { HttpStatuses } from "../../../core/types/http-statuses";
import { createErrorMessage } from "../../../core/utils/error.utils";

export function getDriverHandler(req: Request<{ id: string }>, res: Response) {
    const driver = db.drivers.find((d) => d.id === +req.params.id);

    if (!driver) {
        res
            .status(HttpStatuses.NotFound)
            .send(
                createErrorMessage([{ field: 'id', message: 'Driver not found' }])
            );
        return;
    }

    res.status(HttpStatuses.Ok).send(driver);
}
