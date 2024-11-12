

import { Request, Response } from 'express';
import fs from 'fs/promises';
import path from 'path';
import slugify from 'slugify';
import { Hotel } from '../models/hotelModel';
import { v4 as uuidv4 } from 'uuid';

const DATA_DIR = path.join(__dirname, '../../data/hotels');
const UPLOADS_DIR = path.join(__dirname, '../../uploads/images');

export class HotelController {
  //Create a new hotel
  // async createHotel(req: Request, res: Response) {
  //   try {
  //     const hotelData: Hotel = req.body;
  //     const id = 'hotel-'+uuidv4();
  //     const slug = slugify(hotelData.title, { lower: true });
  //     const { id: _, slug: __, images: ___, ...restHotelData } = hotelData;
  //     const hotel: Hotel = {
  //       // ...hotelData,
  //       id,
  //       slug,
  //       images: [],
  //       ...restHotelData,
  //     };

  //     await fs.mkdir(DATA_DIR, { recursive: true });
  //     await fs.writeFile(
  //       path.join(DATA_DIR, `${id}.json`),
  //       JSON.stringify(hotel, null, 2)
  //     );

  //     return res.status(201).json(hotel);
  //   } catch (error) {
  //     console.error('Error creating hotel:', error);
  //     return res.status(500).json({ error: 'Failed to create hotel' });
  //   }
  // }  

  //create hotel with hotel slug

  async createHotel(req: Request, res: Response) {
    try {
      const hotelData = req.body;
      const id = 'hotel-' + uuidv4();
      const hotelSlug = slugify(hotelData.title, { lower: true });

      const processedRooms = hotelData.rooms.map((room: any) => ({
        hotelSlug,
        roomSlug: slugify(room.roomTitle, { lower: true }),
        roomImage: room.roomImage,
        roomTitle: room.roomTitle,
        bedroomCount: room.bedroomCount
      }));

      const hotel = {
        id,
        slug: hotelSlug,
        images: [],
        ...hotelData,
        rooms: processedRooms
      };

      await fs.mkdir(DATA_DIR, { recursive: true });
      await fs.writeFile(
        path.join(DATA_DIR, `${id}.json`),
        JSON.stringify(hotel, null, 2)
      );

      return res.status(201).json(hotel);
    } catch (error) {
      console.error('Error creating hotel:', error);
      return res.status(500).json({ error: 'Failed to create hotel' });
    }
  }

  // Get hotel by ID
  async getHotel(req: Request, res: Response) {
    try {
      const { hotelId } = req.params;
      const hotelPath = path.join(DATA_DIR, `${hotelId}.json`);

      const hotelData = await fs.readFile(hotelPath, 'utf-8');
      const hotel: Hotel = JSON.parse(hotelData);

      return res.status(200).json(hotel);
    } catch (error) {
      console.error('Error getting hotel:', error);
      return res.status(404).json({ error: 'Hotel not found' });
    }
  }

  // Update hotel
  // async updateHotel(req: Request, res: Response) {
  //   try {
  //     const { hotelId } = req.params;
  //     const hotelPath = path.join(DATA_DIR, `${hotelId}.json`);
  //     const updatedData: Partial<Hotel> = req.body;

  //     console.log(updatedData);


  //     const existingHotelData = await fs.readFile(hotelPath, 'utf-8');
  //     const existingHotel: Hotel = JSON.parse(existingHotelData);

  //     if (updatedData.title) {
  //       updatedData.slug = slugify(updatedData.title, { lower: true });
  //     }

  //     const updatedHotel: Hotel = {
  //       ...existingHotel,
  //       ...updatedData,
  //     };

  //     await fs.writeFile(
  //       hotelPath,
  //       JSON.stringify(updatedHotel, null, 2)
  //     );

  //     return res.status(200).json(updatedHotel);
  //   } catch (error) {
  //     console.error('Error updating hotel:', error);
  //     return res.status(404).json({ error: 'Hotel not found' });
  //   }
  // }

  //update for dynamic hotel slug and room slug

  async updateHotel(req: Request, res: Response) {
    try {
      const { hotelId } = req.params;
      const hotelPath = path.join(DATA_DIR, `${hotelId}.json`);
      const updatedData: Partial<Hotel> = req.body;

      const existingHotelData = await fs.readFile(hotelPath, 'utf-8');
      const existingHotel: Hotel = JSON.parse(existingHotelData);

      // Update hotel slug if title is provided
      if (updatedData.title) {
        updatedData.slug = slugify(updatedData.title, { lower: true });
      }

      // Update room data if rooms are provided
      if (updatedData.rooms) {
        updatedData.rooms = updatedData.rooms.map((room: any) => ({
          hotelSlug: updatedData.slug || existingHotel.slug,
          roomSlug: slugify(room.roomTitle, { lower: true }),
          roomImage: room.roomImage,
          roomTitle: room.roomTitle,
          bedroomCount: room.bedroomCount
        }));
      }

      const updatedHotel: Hotel = {
        ...existingHotel,
        ...updatedData,
      };

      await fs.writeFile(
        hotelPath,
        JSON.stringify(updatedHotel, null, 2)
      );

      return res.status(200).json(updatedHotel);
    } catch (error) {
      console.error('Error updating hotel:', error);
      return res.status(404).json({ error: 'Hotel not found' });
    }
  }


  // update with id, slug, image at the top of the json file
  
  //new update hotel

  // Update hotel
// async updateHotel(req: Request, res: Response) {
//   try {
//     const { hotelId } = req.params;
//     const hotelPath = path.join(DATA_DIR, `${hotelId}.json`);
//     const updatedData: Partial<Hotel> = req.body;

//     const existingHotelData = await fs.readFile(hotelPath, 'utf-8');
//     const existingHotel: Hotel = JSON.parse(existingHotelData);

//     // If there's a title in the update data, update the slug too
//     if (updatedData.title) {
//       updatedData.slug = slugify(updatedData.title, { lower: true });
//     }

//     // Merge existingHotel with updatedData, overwriting existing fields only if they are in updatedData
//     const updatedHotel = Object.assign({}, existingHotel, updatedData);

//     await fs.writeFile(
//       hotelPath,
//       JSON.stringify(updatedHotel, null, 2)
//     );

//     return res.status(200).json(updatedHotel);
//   } catch (error) {
//     console.error('Error updating hotel:', error);
//     return res.status(404).json({ error: 'Hotel not found' });
//   }
// }


//update hotel latest


// Update hotel method with validation and partial update handling
// async updateHotel(req: Request, res: Response) {
//   try {
//     const { hotelId } = req.params;
//     const hotelPath = path.join(DATA_DIR, `${hotelId}.json`);
//     const updatedData: Partial<Hotel> = req.body;

//     const existingHotelData = await fs.readFile(hotelPath, 'utf-8');
//     const existingHotel: Hotel = JSON.parse(existingHotelData);
//     console.log(updatedData);

//     // Update slug only if title is provided in updatedData
//     if (updatedData.title) {
//       updatedData.slug = slugify(updatedData.title, { lower: true });
//     }

//     // Merge existing hotel data with updatedData
//     const updatedHotel: Hotel = { ...existingHotel, ...updatedData };

//     await fs.writeFile(hotelPath, JSON.stringify(updatedHotel, null, 2));
//     console.log(updatedHotel);

//     return res.status(200).json(updatedHotel);
//   } catch (error) {
//     console.error('Error updating hotel:', error);
//     return res.status(404).json({ error: 'Hotel not found' });
//   }
// }


  // Upload images
  // async uploadImages(req: Request, res: Response) {
  //   try {
  //     const { hotelId } = req.body;
  //     const files = req.files as Express.Multer.File[];

  //     if (!files || files.length === 0) {
  //       return res.status(400).json({ error: 'No files uploaded' });
  //     }

  //     const hotelPath = path.join(DATA_DIR, `${hotelId}.json`);
  //     const hotelData = await fs.readFile(hotelPath, 'utf-8');
  //     const hotel: Hotel = JSON.parse(hotelData);

  //     const imageUrls = files.map(file => `/uploads/images/${file.filename}`);
  //     hotel.images = [...hotel.images, ...imageUrls];

  //     await fs.writeFile(
  //       hotelPath,
  //       JSON.stringify(hotel, null, 2)
  //     );

  //     return res.status(200).json({ images: imageUrls });
  //   } catch (error) {
  //     console.error('Error uploading images:', error);
  //     return res.status(500).json({ error: 'Failed to upload images' });
  //   }
  // }

  //upload image with response 

  async uploadImages(req: Request, res: Response) {
    try {
      const { hotelId } = req.body;
      const files = req.files as Express.Multer.File[];

      if (!files || files.length === 0) {
        return res.status(400).json({ error: 'No files uploaded' });
      }

      const hotelPath = path.join(DATA_DIR, `${hotelId}.json`);
      const hotelData = await fs.readFile(hotelPath, 'utf-8');
      const hotel: Hotel = JSON.parse(hotelData);

      const imageUrls = files.map(file => `/uploads/images/${file.filename}`);
      hotel.images = [...hotel.images, ...imageUrls];

      await fs.writeFile(
        hotelPath,
        JSON.stringify(hotel, null, 2)
      );

      // Return the full hotel object including the updated image array
      return res.status(200).json(imageUrls);
    } catch (error) {
      console.error('Error uploading images:', error);
      return res.status(500).json({ error: 'Failed to upload images' });
    }
  }

  // Get all hotels
  async getAllHotels(req: Request, res: Response) {
    try {
      const files = await fs.readdir(DATA_DIR);
      const hotels: Hotel[] = [];

      for (const file of files) {
        if (file.endsWith('.json')) {
          const hotelData = await fs.readFile(path.join(DATA_DIR, file), 'utf-8');
          hotels.push(JSON.parse(hotelData));
        }
      }

      return res.status(200).json(hotels);
    } catch (error) {
      console.error('Error getting hotels:', error);
      return res.status(500).json({ error: 'Failed to get hotels' });
    }
  }
}