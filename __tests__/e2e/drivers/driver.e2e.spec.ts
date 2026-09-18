import request from 'supertest';
import express from "express";
import { setupApp } from "../../../src/setup-app";
import { HttpStatuses } from "../../../src/core/types/http-statuses";
import { DriverInputDto } from "../../../src/drivers/dto/driver.input.dto";
import { DRIVERS_PATH } from "../../../src/drivers/constants/drivers.paths";
import { TESTING_PATH } from "../../../src/testing/constants/testing.paths";

describe('Driver API', () => {
    const app = express();
    setupApp(app);

    const testDriverData: DriverInputDto = {
        name: 'Valentin',
        phoneNumber: '123-456-7890',
        email: 'valentin@example.com',
        vehicleMake: 'BMW',
        vehicleModel: 'X5',
        vehicleYear: 2021,
        vehicleLicensePlate: 'ABC-123',
        vehicleDescription: null,
        vehicleFeatures: [],
    };

    beforeAll(async () => {
        await request(app)
            .delete(`${TESTING_PATH}/all-data`)
            .expect(HttpStatuses.NoContent);
    });

    it('✅ should create driver; POST /api/drivers', async () => {
        const newDriver: DriverInputDto = {
            ...testDriverData,
            name: 'Feodor',
            phoneNumber: '987-654-3210',
            email: 'feodor@example.com',
        };

        await request(app)
            .post(DRIVERS_PATH)
            .send(newDriver)
            .expect(HttpStatuses.Created);
    });

    it('✅ should return drivers list: GET /api/drivers', async () => {
        await request(app)
            .post(DRIVERS_PATH)
            .send({ ...testDriverData, name: 'Another Driver' })
            .expect(HttpStatuses.Created);

        await request(app)
            .post(DRIVERS_PATH)
            .send({ ...testDriverData, name: 'Another Driver2' })
            .expect(HttpStatuses.Created);

        const driverListResponse = await request(app)
            .get(DRIVERS_PATH)
            .expect(HttpStatuses.Ok);

        expect(driverListResponse.body).toBeInstanceOf(Array);
        expect(driverListResponse.body.length).toBeGreaterThanOrEqual(2);
    });

    it('✅ should return driver by id: GET /api/drivers/:id', async () => {
        const createResponse = await request(app)
            .post(DRIVERS_PATH)
            .send({...testDriverData, name: 'Another Driver'})
            .expect(HttpStatuses.Created);

        const getResponse = await request(app)
            .get(`${DRIVERS_PATH}/${createResponse.body.id}`)
            .expect(HttpStatuses.Ok);

        expect(getResponse.body).toEqual({
            ...createResponse.body,
            id: expect.any(Number),
            createdAt: expect.any(String)
        });
    });

    it('✅ should update driver; PUT /api/drivers/:id', async () => {
        const createResponse = await request(app)
            .post(DRIVERS_PATH)
            .send({...testDriverData, name: 'Another Driver'})
            .expect(HttpStatuses.Created);

        const driverUpdateData: DriverInputDto = {
            ...testDriverData,
            name: 'Update name',
            phoneNumber: '999-888-7777',
            email: 'updated@example.com',
            vehicleMake: 'Tesla',
        };

        await request(app)
            .put(`${DRIVERS_PATH}/${createResponse.body.id}`)
            .send(driverUpdateData)
            .expect(HttpStatuses.NoContent);

        const driverResponse = await request(app)
            .get(`${DRIVERS_PATH}/${createResponse.body.id}`);

        expect(driverResponse.body).toEqual({
            ...driverUpdateData,
            id: createResponse.body.id,
            createdAt: expect.any(String)
        });
    });

    it('✅ DELETE /api/drivers/:id', async () => {
        const res = await request(app)
            .post(DRIVERS_PATH)
            .send({...testDriverData, name: 'Another Driver'})
            .expect(HttpStatuses.Created);

        await request(app)
            .delete(`${DRIVERS_PATH}/${res.body.id}`)
            .expect(HttpStatuses.NoContent);

        const driverResponse = await request(app).get(`${DRIVERS_PATH}/${res.body.id}`);

        expect(driverResponse.status).toBe(HttpStatuses.NotFound);

    });
});
