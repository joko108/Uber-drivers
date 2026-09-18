import express from "express";
import request from 'supertest';
import { VehicleFeature } from "../../../src/drivers/types/driver";
import { setupApp } from "../../../src/setup-app";
import { HttpStatuses } from "../../../src/core/types/http-statuses";
import { DriverInputDto } from "../../../src/drivers/dto/driver.input.dto";
import {DRIVERS_PATH } from "../../../src/drivers/constants/drivers.paths";
import { TESTING_PATH } from "../../../src/testing/constants/testing.paths";

describe('Driver API validation check', () => {
    const app = express();
    setupApp(app);

    const correctTestDriverData: DriverInputDto = {
        name: 'Valentin',
        phoneNumber: '123-456-7890',
        email: 'valentin@example.com',
        vehicleMake: 'BMW',
        vehicleModel: 'X5',
        vehicleYear: 2021,
        vehicleLicensePlate: 'ABC-123',
        vehicleDescription: 'Some description',
        vehicleFeatures: [VehicleFeature.ChildSeat],
    };

    beforeAll(async () => {
        await request(app)
            .delete(`${TESTING_PATH}/all-data`)
            .expect(HttpStatuses.NoContent)
    });

    it('❌ should not create when incorrect body passed; POST /api/drivers', async () => {
        const invalidDataSet1 = await request(app)
            .post(DRIVERS_PATH)
            .send({
                ...correctTestDriverData,
                name: '    ',
                phoneNumber: '    ',
                email: 'invalid email',
                vehicleMake: '',
            })
            .expect(HttpStatuses.BadRequest);

        expect(invalidDataSet1.body.errorMessage).toHaveLength(4);

        const invalidDataSet2 = await request(app)
            .post(DRIVERS_PATH)
            .send({
                ...correctTestDriverData,
                phoneNumber: '',
                vehicleModel: '',
                vehicleYear: 'year',
                vehicleLicensePlate: '',
            })
            .expect(HttpStatuses.BadRequest);

        expect(invalidDataSet2.body.errorMessage).toHaveLength(4);

        const invalidDataSet3 = await request(app)
            .post(DRIVERS_PATH)
            .send({
                ...correctTestDriverData,
                name: 'A',
            })
            .expect(HttpStatuses.BadRequest);

        expect(invalidDataSet3.body.errorMessage).toHaveLength(1);

        // check что никто не создался
        const driverListResponse = await request(app).get(DRIVERS_PATH);
        expect(driverListResponse.body).toHaveLength(0);
    });

    it('❌ should not update driver when incorrect data passed; PUT /api/drivers/:id', async () => {
        const {
            body: { id: createdDriverId }
        } = await request(app)
            .post(DRIVERS_PATH)
            .send({ ...correctTestDriverData })
            .expect(HttpStatuses.Created);

        const invalidDataSet1 = await request(app)
            .put(`${DRIVERS_PATH}/${createdDriverId}`)
            .send({
                ...correctTestDriverData,
                name: '    ',
                phoneNumber: '    ',
                email: 'invalid email',
                vehicleMake: '',
            })
            .expect(HttpStatuses.BadRequest);

        expect(invalidDataSet1.body.errorMessage).toHaveLength(4);

        const invalidDataSet2 = await request(app)
            .put(`${DRIVERS_PATH}/${createdDriverId}`)
            .send({
                ...correctTestDriverData,
                phoneNumber: '',
                vehicleModel: '',
                vehicleYear: 'year',
                vehicleLicensePlate: '',
            })
            .expect(HttpStatuses.BadRequest);

        expect(invalidDataSet2.body.errorMessage).toHaveLength(4);

        const invalidDataSet3 = await request(app)
            .put(`${DRIVERS_PATH}/${createdDriverId}`)
            .send({
                ...correctTestDriverData,
                name: 'A',
            })
            .expect(HttpStatuses.BadRequest);

        expect(invalidDataSet3.body.errorMessage).toHaveLength(1);

        const driverResponse = await request(app)
            .get(`${DRIVERS_PATH}/${createdDriverId}`);

        expect(driverResponse.body).toEqual({
            ...correctTestDriverData,
            id: createdDriverId,
            createdAt: expect.any(String),
        });
    });

    it('❌ should not update driver when incorrect features passed; PUT /api/drivers/:id', async () => {
        const {
            body: { id: createdDriverId }
        } = await request(app)
            .post(DRIVERS_PATH)
            .send({ ...correctTestDriverData })
            .expect(HttpStatuses.Created);

        await request(app)
            .put(`${DRIVERS_PATH}/${createdDriverId}`)
            .send({
                ...correctTestDriverData,
                vehicleFeatures: [
                    VehicleFeature.ChildSeat,
                    'invalid-feature',
                    VehicleFeature.WiFi,
                ]
            })
            .expect(HttpStatuses.BadRequest);

        const driverResponse = await request(app)
            .get(`${DRIVERS_PATH}/${createdDriverId}`);

        expect(driverResponse.body).toEqual({
            ...correctTestDriverData,
            id: createdDriverId,
            createdAt: expect.any(String)
        });
    });
});
