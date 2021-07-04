const request = require('supertest');
const app = require("../../server/server.js")


describe('Test the "/addData"', () => {
    test(' should be POST method', async () => {
        const response = await request(app).post('/addData');
        expect(response.statusCode).toBe(200);
    });
});