import { Request, Response } from "express";
import { DriverInputDto } from "../../dto/driver.input.dto";
import { db } from "../../../db/in-memory.db";
import { HttpStatuses } from "../../../core/types/http-statuses";
import { createErrorMessage } from "../../../core/utils/error.utils";
import { validateDriverInput } from "../../validation/driver-input-dto.validation";

export function updateDriverHandler(
    req: Request<{ id: string }, {}, DriverInputDto>,
    res: Response
) {
    const index = db.drivers.findIndex((d) => d.id === +req.params.id);

    if (index === -1) {
        res
            .status(HttpStatuses.NotFound)
            .send(
                createErrorMessage([{ field: 'id', message: 'Driver not found' }])
            );
        return;
    }

    const errors = validateDriverInput(req.body);

    if (errors.length > 0) {
        res.status(HttpStatuses.BadRequest).send(createErrorMessage(errors));
        return;
    }

    db.drivers[index] = { ...db.drivers[index], ...req.body };

    res.sendStatus(HttpStatuses.NoContent);
}
