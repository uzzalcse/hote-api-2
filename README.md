

create a hotel

POST http://localhost:3000/api/hotel
Content-Type: application/json

{
  "title": "hotel awesome in dhaka",
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
      "roomTitle": "this is new updation from put",
      "bedroomCount": 2
    }
  ]
}
2. Get Hotel by ID (get)

GET http://localhost:3000/api/hotel/{{hotel_id}}


3. get all hotels

GET http://localhost:3000/api/hotels


4. update hotel(put)

PUT http://localhost:3000/api/hotel/{{hotel_id}}
Content-Type: application/json

{
  "title": "Updated Luxury Ocean Resort",
  "description": "An updated description for our beautiful beachfront resort",
  "amenities": [
    "wifi",
    "pool",
    "spa",
    "beach access",
    "room service",
    "gym"
  ]
}


5. upload images(post)

POST http://localhost:3000/api/images

curl -X POST http://localhost:3000/api/images \
  -F "hotelId=hotel-4d053b2d-d70f-4ac1-a723-2e8d37929593" \
  -F "images=@/home/w3e48/Downloads/image-1.jpg" \
  -F "images=@/home/w3e48/Downloads/image-2.jpg" 