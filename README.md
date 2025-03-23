# URL Shortener Service

A simple and efficient URL shortening service built with Node.js, Express, and MongoDB.

## Features

- Create short URLs from long ones
- Retrieve original URLs using short IDs
- Update existing short URLs
- Delete shortened URLs
- View access statistics for each shortened URL
- Input validation for URL formats
- Custom error handling middleware

## Tech Stack

- Node.js
- Express.js
- MongoDB with Mongoose
- Validator.js for URL validation

## API Endpoints

All endpoints are available under the base path `/api/v1/`.

## Data Model

The URL model includes:
- Original URL (unique)
- Short URL (unique, 5 characters)
- Access count for tracking usage
- Creation and update timestamps

## URL Generation

The service generates random 5-character short URLs using a mix of uppercase letters, lowercase letters, and numbers.

>[!NOTE]
>[Check out the Project](https://roadmap.sh/projects/url-shortening-service)
