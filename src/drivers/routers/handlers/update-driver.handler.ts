import { Request, Response } from "express";
import { DriverInputDto } from "../../dto/driver.input.dto";
import { HttpStatuses } from "../../../core/types/http-statuses";
import { createErrorMessage } from "../../../core/utils/error.utils";
import { validateDriverInput } from "../../validation/driver-input-dto.validation";
import {driversRepository} from "../../repository/drivers.repository";

export function updateDriverHandler(
    req: Request<{ id: string }, {}, DriverInputDto>,
    res: Response
) {

    const errors = validateDriverInput(req.body);

    if (errors.length > 0) {
        res.status(HttpStatuses.BadRequest).send(createErrorMessage(errors));
        return;
    }

    const isUpdated = driversRepository.update(+req.params.id, req.body);

    if (!isUpdated) {
        res
            .status(HttpStatuses.NotFound)
            .send(
                createErrorMessage([{ field: 'id', message: 'Driver not found' }])
            );
        return;
    }

    res.sendStatus(HttpStatuses.NoContent);
}
