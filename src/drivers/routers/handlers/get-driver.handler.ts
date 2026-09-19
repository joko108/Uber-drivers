import { Request, Response } from "express";
import { HttpStatuses } from "../../../core/types/http-statuses";
import { createErrorMessage } from "../../../core/utils/error.utils";
import {driversRepository} from "../../repository/drivers.repository";

export function getDriverHandler(req: Request<{ id: string }>, res: Response) {

    const driver = driversRepository.findById(+req.params.id);

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
