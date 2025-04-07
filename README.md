# API Service (TypeScript)

A lightweight and modular CRUD service written in TypeScript for managing receipt data with MongoDB.

## Overview

This project provides an API-like service to perform create, read, update, and delete (CRUD) operations on receipts. It uses MongoDB as the database and supports advanced logging via Winston.

## Installation & Startup

1. Clone the repository:

```bash
git clone https://your-repo-url.git
cd api-service-ts
```
2. Install dependencies:
```bash
npm install
```

3. Create a ```.env``` file based on the provided template:
```bash
DB_NAME=database_name
COLLECTION_RECEIPTS_NAME=collection_name
COLLECTION_PRODUCT_NAME=collection_name
MONGO_PASSWORD=mongodb_password
MONGO_USER=mongodb_username
LOG_LEVEL=debug
```

4. Run the app:
```bash
npm run start
```

# Project structure

```
api-service-ts/
├── dist/                             # Compiled JS output
├── logs/                             # Application logs
├── src/
│   ├── config/
│   │   └── db.mts                    # MongoDB connection setup
│   ├── controllers/
│   │   ├── productController.mts     # Product controller
│   │   └── receiptControlles.mts     # Receipt controller
│   ├── entities/
│   │   ├── Product.mts               # Product class
│   │   └── Receipt.mts               # Receipt class
│   ├── routes/
│   │   ├── productRoutes.mts         # Product API routes
│   │   └── receiptRoutes.mts         # Receipt API routes
│   ├── services/
│   │   ├── productService.mts        # Product CRUD logic
│   │   └── receiptService.mts        # Receipt CRUD logic
│   ├── utils/
│   │   └── logger.mts                # Winston logger config
│   └── server.mts                    # App entrypoint
├── tests/
│   └── postman/
│       └── api-service-ts.postman_collection.json
│   └── jest/
│   │   ├── product-tests             # Tests for product CRUD methods 
│   │   └── receipt-tests             # Tests for receipt CRUD methods  
├── .env                              # Environment variables (Replace the placeholders by your data)
├── .gitignore
├── package.json
├── package-lock.json
├── README.md
└── tsconfig.json
```

# Tests
To run Postman's scope of api tests you need to run this command:
```bash
npm run tests:postman
```
To run Jest tests for CRUD methods you need to run this command:
```bash
npm run test
```
The scope covers all API routes with response status checking, response messages, validation of execution of the specified action

# Make sure
You've filled the ```.env``` file with your data

# Technologies Used

- TypeScript
- Node.js
- MongoDB via mongodb
- Winston for logging
- dotenv for environment config
- Postman
- Jest
