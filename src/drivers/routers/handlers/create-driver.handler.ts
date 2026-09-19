import { Request, Response } from "express";
import { DriverInputDto } from "../../dto/driver.input.dto";
import { HttpStatuses } from "../../../core/types/http-statuses";
import { createErrorMessage } from "../../../core/utils/error.utils";
import { validateDriverInput } from "../../validation/driver-input-dto.validation";
import { Driver } from "../../types/driver";
import { driversRepository } from "../../repository/drivers.repository";

export function createDriverHandler(req: Request<{}, {}, DriverInputDto>, res: Response) {
    // Сначала валидируем тело запроса вручную.
    const errors = validateDriverInput(req.body);

    if (errors.length > 0) {
        res.status(HttpStatuses.BadRequest).send(createErrorMessage(errors));
        return;
    }

    const newDriver: Omit<Driver, 'id'> = {
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

    const createdDriver = driversRepository.create(newDriver);
    res.status(HttpStatuses.Created).send(createdDriver);
}
