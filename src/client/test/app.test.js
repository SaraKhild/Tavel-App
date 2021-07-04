
import { addTrip } from "../js/app"


describe('Test, the function "addTrip()" should be a function' , () => {
    test('It should return true', async () => {
        expect(typeof addTrip).toBe("function");
    });
});

describe('Test, the function "addTrip()" should exist' , () => {
    test('It should return true', async () => {
        expect(addTrip).toBeDefined();
    });
});

