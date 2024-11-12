// import request from 'supertest';
// import app from '../src/app';
// import fs from 'fs/promises';
// import path from 'path';

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

import request from 'supertest';
import app from '../src/app';
import fs from 'fs/promises';
import path from 'path';
import multer from 'multer';

const TEST_DATA_DIR = path.join(__dirname, '../data/hotels');
const TEST_UPLOADS_DIR = path.join(__dirname, '../uploads/images');

describe('Hotel API', () => {
  beforeAll(async () => {
    await fs.mkdir(TEST_UPLOADS_DIR, { recursive: true });
  });

  beforeEach(async () => {
    try {
      await fs.rm(TEST_DATA_DIR, { recursive: true, force: true });
      await fs.rm(TEST_UPLOADS_DIR, { recursive: true, force: true });
    } catch (error) {
      // Handle missing directories or permission issues
    }
  });

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
    it('should create a new hotel', async () => {
      const response = await request(app)
        .post('/api/hotel')
        .send(sampleHotel);

      expect(response.status).toBe(201);
      expect(response.body.title).toBe(sampleHotel.title);
      expect(response.body.slug).toBe('test-hotel');
    });
  });

  describe('GET /api/hotel/:hotelId', () => {
    it('should retrieve a hotel by ID', async () => {
      const createResponse = await request(app)
        .post('/api/hotel')
        .send(sampleHotel);

      const hotelId = createResponse.body.id;

      const getResponse = await request(app)
        .get(`/api/hotel/${hotelId}`);

      expect(getResponse.status).toBe(200);
      expect(getResponse.body.title).toBe(sampleHotel.title);
    });
  });

  describe('PUT /api/hotel/:hotelId', () => {
    it('should update a hotel', async () => {
      const createResponse = await request(app)
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

      const updateResponse = await request(app)
        .put(`/api/hotel/${hotelId}`)
        .send(updatedData);

      expect(updateResponse.status).toBe(200);
      expect(updateResponse.body.title).toBe(updatedData.title);
      expect(updateResponse.body.slug).toBe('hotel-singapore-meridien-in-dhaka');
    });
  });

  describe('POST /api/hotel/upload-images', () => {
    it('should upload images for a hotel', async () => {
      const createResponse = await request(app)
        .post('/api/hotel')
        .send(sampleHotel);

      const hotelId = createResponse.body.id;

      const uploadResponse = await request(app)
        .post('/api/hotel/upload-images')
        .field('hotelId', hotelId)
        .attach('files', path.resolve(__dirname, 'testImage1.jpg'))
        .attach('files', path.resolve(__dirname, 'testImage2.jpg'));

      expect(uploadResponse.status).toBe(200);
      expect(uploadResponse.body).toHaveLength(2);
      expect(uploadResponse.body[0]).toContain('/uploads/images/');
    });
  });

  describe('GET /api/hotels', () => {
    it('should retrieve all hotels', async () => {
      await request(app)
        .post('/api/hotel')
        .send(sampleHotel);

      const anotherHotel = {
        ...sampleHotel,
        title: 'Test Hotel',
        description: 'Another test hotel',
      };

      await request(app)
        .post('/api/hotel')
        .send(anotherHotel);

      const getAllResponse = await request(app)
        .get('/api/hotels');

      expect(getAllResponse.status).toBe(200);
      expect(getAllResponse.body).toHaveLength(2);
      expect(getAllResponse.body[0].title).toBe(sampleHotel.title);
      expect(getAllResponse.body[1].title).toBe(anotherHotel.title);
    });
  });
});

