# OT Green Works - Environmental Express Server

Professional environmental services website inspired by modern Webflow-style environmental branding.

## Features
- Node.js + Express server
- EJS pages
- MVC structure: routes, controllers, models
- Custom middleware and error logging
- JWT login and protected dashboard
- Role middleware
- Optional MongoDB/Mongoose setup
- Local demo data so it runs without MongoDB

## Run
```bash
npm install
npm run dev
```
Open:
```text
http://localhost:3500
```

## Login
- username: `admin`
- password: `admin123`

## MongoDB
By default `.env` has:
```env
USE_MONGO=false
```
This prevents MongoDB connection errors. To use MongoDB, install/start MongoDB and change it to `true`.
