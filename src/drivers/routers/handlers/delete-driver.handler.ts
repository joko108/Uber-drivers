import { Request, Response } from "express";
import { HttpStatuses } from "../../../core/types/http-statuses";
import { createErrorMessage } from "../../../core/utils/error.utils";
import { driversRepository } from "../../repository/drivers.repository";

export function deleteDriverHandler(req: Request<{ id: string }>, res: Response) {

    const isDeleted = driversRepository.delete(+req.params.id);

    if (!isDeleted) {
        res
            .status(HttpStatuses.NotFound)
            .send(
                createErrorMessage([{ field: 'id', message: 'Driver not found' }])
            );
        return;
    }

    res.sendStatus(HttpStatuses.NoContent);
}
