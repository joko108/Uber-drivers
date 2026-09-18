import { Request, Response } from "express";
import { DriverInputDto } from "../../dto/driver.input.dto";
import { HttpStatuses } from "../../../core/types/http-statuses";
import { createErrorMessage } from "../../../core/utils/error.utils";
import { db } from "../../../db/in-memory.db";
import { validateDriverInput } from "../../validation/driver-input-dto.validation";
import { Driver } from "../../types/driver";

export function createDriverHandler(req: Request<{}, {}, DriverInputDto>, res: Response) {
    // Сначала валидируем тело запроса вручную.
    const errors = validateDriverInput(req.body);

    if (errors.length > 0) {
        res.status(HttpStatuses.BadRequest).send(createErrorMessage(errors));
        return;
    }

    // id последнего водителя в БД
    const lastDriver = db.drivers[db.drivers.length - 1];

    const newDriver: Driver = {
        id: lastDriver ? lastDriver.id + 1 : 1,
        name: req.body.name,
        phoneNumber: req.body.phoneNumber,
        email: req.body.email,
        vehicleMake: req.body.vehicleMake,
        vehicleModel: req.body.vehicleModel,
        vehicleYear: req.body.vehicleYear,
        vehicleLicensePlate: req.body.vehicleLicensePlate,
        vehicleDescription: req.body.vehicleDescription,
        vehicleFeatures: req.body.vehicleFeatures,
        createdAt: new Date(),
    };

    db.drivers.push(newDriver);
    res.status(HttpStatuses.Created).send(newDriver);
}
