"use strict";
// import request from 'supertest';
// import app from '../src/app';
// import fs from 'fs/promises';
// import path from 'path';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const TEST_DATA_DIR = path.join(__dirname, '../data/hotels');
// describe('Hotel API', () => {
//   beforeEach(async () => {
//     try {
//       await fs.rm(TEST_DATA_DIR, { recursive: true, force: true });
//     } catch (error) {
//       // Directory might not exist
//     }
//   });
//   const sampleHotel = {
//     title: 'Test Hotel',
//     description: 'A beautiful test hotel',
//     guestCount: 4,
//     bedroomCount: 2,
//     bathroomCount: 2,
//     amenities: ['wifi', 'parking'],
//     host: {
//       name: 'John Doe',
//       email: 'john@example.com',
//     },
//     address: '123 Test Street',
//     location: {
//       latitude: 40.7128,
//       longitude: -74.0060,
//     },
//     rooms: [],
//   };
//   describe('POST /api/hotel', () => {
//     it('should create a new hotel', async () => {
//       const response = await request(app)
//         .post('/api/hotel')
//         .send(sampleHotel);
//       expect(response.status).toBe(201);
//       expect(response.body.title).toBe(sampleHotel.title);
//       expect(response.body.slug).toBe('test-hotel');
//     });
//   });
//   describe('GET /api/hotel/:hotelId', () => {
//     it('should get a hotel by ID', async () => {
//       const createResponse = await request(app)
//         .post('/api/hotel')
//         .send(sampleHotel);
//       const hotelId = createResponse.body.id;
//       const getResponse = await request(app)
//         .get(`/api/hotel/${hotelId}`);
//       expect(getResponse.status).toBe(200);
//       expect(getResponse.body.title).toBe(sampleHotel.title);
//     });
//   });
//   describe('PUT /api/hotel/:hotelId', () => {
//     it('should update a hotel', async () => {
//       const createResponse = await request(app)
//         .post('/api/hotel')
//         .send(sampleHotel);
//       const hotelId = createResponse.body.id;
//       const updatedData = {
//         title: 'Updated Hotel',
//         description: 'Updated description',
//       };
//       const updateResponse = await request(app)
//         .put(`/api/hotel/${hotelId}`)
//         .send(updatedData);
//       expect(updateResponse.status).toBe(200);
//       expect(updateResponse.body.title).toBe(updatedData.title);
//       expect(updateResponse.body.slug).toBe('updated-hotel');
//     });
//   });
// });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../src/app"));
const promises_1 = __importDefault(require("fs/promises"));
const path_1 = __importDefault(require("path"));
const TEST_DATA_DIR = path_1.default.join(__dirname, '../data/hotels');
const TEST_UPLOADS_DIR = path_1.default.join(__dirname, '../uploads/images');
describe('Hotel API', () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield promises_1.default.mkdir(TEST_UPLOADS_DIR, { recursive: true });
    }));
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield promises_1.default.rm(TEST_DATA_DIR, { recursive: true, force: true });
            yield promises_1.default.rm(TEST_UPLOADS_DIR, { recursive: true, force: true });
        }
        catch (error) {
            // Handle missing directories or permission issues
        }
    }));
    const sampleHotel = {
        title: 'Test Hotel',
        description: 'A beautiful test hotel',
        guestCount: 4,
        bedroomCount: 2,
        bathroomCount: 2,
        amenities: ['wifi', 'parking'],
        host: {
            name: 'John Doe',
            email: 'john@example.com',
        },
        address: '123 Test Street',
        location: {
            latitude: 40.7128,
            longitude: -74.0060,
        },
        rooms: [],
    };
    describe('POST /api/hotel', () => {
        it('should create a new hotel', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app_1.default)
                .post('/api/hotel')
                .send(sampleHotel);
            expect(response.status).toBe(201);
            expect(response.body.title).toBe(sampleHotel.title);
            expect(response.body.slug).toBe('test-hotel');
        }));
    });
    describe('GET /api/hotel/:hotelId', () => {
        it('should retrieve a hotel by ID', () => __awaiter(void 0, void 0, void 0, function* () {
            const createResponse = yield (0, supertest_1.default)(app_1.default)
                .post('/api/hotel')
                .send(sampleHotel);
            const hotelId = createResponse.body.id;
            const getResponse = yield (0, supertest_1.default)(app_1.default)
                .get(`/api/hotel/${hotelId}`);
            expect(getResponse.status).toBe(200);
            expect(getResponse.body.title).toBe(sampleHotel.title);
        }));
    });
    describe('PUT /api/hotel/:hotelId', () => {
        it('should update a hotel', () => __awaiter(void 0, void 0, void 0, function* () {
            const createResponse = yield (0, supertest_1.default)(app_1.default)
                .post('/api/hotel')
                .send(sampleHotel);
            const hotelId = createResponse.body.id;
            const updatedData = {
                "title": "hotel singapore meridien in dhaka",
                "description": "random text",
                "guestCount": 4,
                "bedroomCount": 2,
                "bathroomCount": 2,
                "amenities": [
                    "wifi",
                    "pool",
                    "spa",
                    "beach access",
                    "room service"
                ],
                "host": {
                    "name": "John Smith",
                    "email": "john.smith@resort.com"
                },
                "address": "123 Ocean Drive, Miami Beach, FL 33139",
                "location": {
                    "latitude": 25.7617,
                    "longitude": -80.1918
                },
                "rooms": [
                    {
                        "roomImage": "",
                        "roomTitle": "Ocean View Suite",
                        "bedroomCount": 1
                    },
                    {
                        "roomImage": "",
                        "roomTitle": "hell here don't move",
                        "bedroomCount": 2
                    },
                    {
                        "roomImage": "",
                        "roomTitle": "room slug will be created from this",
                        "bedroomCount": 2
                    }
                ]
            };
            const updateResponse = yield (0, supertest_1.default)(app_1.default)
                .put(`/api/hotel/${hotelId}`)
                .send(updatedData);
            expect(updateResponse.status).toBe(200);
            expect(updateResponse.body.title).toBe(updatedData.title);
            expect(updateResponse.body.slug).toBe('hotel-singapore-meridien-in-dhaka');
        }));
    });
    describe('POST /api/hotel/upload-images', () => {
        it('should upload images for a hotel', () => __awaiter(void 0, void 0, void 0, function* () {
            const createResponse = yield (0, supertest_1.default)(app_1.default)
                .post('/api/hotel')
                .send(sampleHotel);
            const hotelId = createResponse.body.id;
            const uploadResponse = yield (0, supertest_1.default)(app_1.default)
                .post('/api/hotel/upload-images')
                .field('hotelId', hotelId)
                .attach('files', path_1.default.resolve(__dirname, 'testImage1.jpg'))
                .attach('files', path_1.default.resolve(__dirname, 'testImage2.jpg'));
            expect(uploadResponse.status).toBe(200);
            expect(uploadResponse.body).toHaveLength(2);
            expect(uploadResponse.body[0]).toContain('/uploads/images/');
        }));
    });
    describe('GET /api/hotels', () => {
        it('should retrieve all hotels', () => __awaiter(void 0, void 0, void 0, function* () {
            yield (0, supertest_1.default)(app_1.default)
                .post('/api/hotel')
                .send(sampleHotel);
            const anotherHotel = Object.assign(Object.assign({}, sampleHotel), { title: 'Test Hotel', description: 'Another test hotel' });
            yield (0, supertest_1.default)(app_1.default)
                .post('/api/hotel')
                .send(anotherHotel);
            const getAllResponse = yield (0, supertest_1.default)(app_1.default)
                .get('/api/hotels');
            expect(getAllResponse.status).toBe(200);
            expect(getAllResponse.body).toHaveLength(2);
            expect(getAllResponse.body[0].title).toBe(sampleHotel.title);
            expect(getAllResponse.body[1].title).toBe(anotherHotel.title);
        }));
    });
});
