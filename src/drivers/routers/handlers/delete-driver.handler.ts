import { Request, Response } from "express";
import { db } from "../../../db/in-memory.db";
import { HttpStatuses } from "../../../core/types/http-statuses";
import { createErrorMessage } from "../../../core/utils/error.utils";

export function deleteDriverHandler(req: Request<{ id: string }>, res: Response) {
    const index = db.drivers.findIndex((d) => d.id === +req.params.id);

    if (index === -1) {
        res
            .status(HttpStatuses.NotFound)
            .send(
                createErrorMessage([{ field: 'id', message: 'Driver not found' }])
            );
        return;
    }

    db.drivers.splice(index, 1);
    res.sendStatus(HttpStatuses.NoContent);
}
