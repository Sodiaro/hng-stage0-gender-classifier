# Gender API - Classification Service

A Node.js/Express API that integrates with Genderize.io to classify genders based on names, with custom confidence logic and standardized response formats.

## Features
- Proxy for Genderize API.
- Custom confidence checks (`probability >= 0.7` and `sample_size >= 100`).
- CORS enabled for cross-origin access.
- Standardized error handling and status codes.

## Endpoint
### GET `/api/classify`
Takes a `name` query parameter.

**Example Request:**
`GET /api/classify?name=peter`

**Response:**
```json
{
 "status": "success",
 "data": {
  "name": "peter",
  "gender": "male",
  "probability": 1,
  "sample_size": 1346866,
  "is_confident": true,
  "processed_at": "2026-04-15T14:34:50.779Z"
 }
}
```

## Setup & Running
1. Clone the repository.
2. Install dependencies: `npm install`
3. Run the server: `node index.js` or `npm run dev`
4. Access at `http://localhost:3000`

## Deployment
This API can be deployed to platforms like Vercel, Railway for public access.
