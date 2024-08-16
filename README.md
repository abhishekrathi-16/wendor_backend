# Getting started with the project

This project was created using Node.js, ExpressJS, Mongoose and MongoDB. It uses Ably for websockets, which is a third party app that allows usage of websockets without the need to host them seperately.

## Demo

Watch the walkthrough of the project and know about its features
[![Watch the video](https://drive.google.com/file/d/1K7lnMVG3u-wKu9KsatWrOoH6IXY2USoU/view?usp=sharing)](https://drive.google.com/file/d/1KMEM-vfWiCvTFoaYjPakT0YsxkB9Y4rX/view?usp=sharing)

## Available Scripts

To run this project, in the project directory, run:

Migrate to the folder/directory where you want to clone the project. Then run the following commands in the terminal:

#### `git clone https://github.com/abhishekrathi-16/wendor_backend.git`

Clones the repository on your system

#### `npm install`

Installs all the dependencies required to run the project.

#### Set up the .env folder in project root directory

Set up these environment variables:
- `MONGO_URI` - MongoDB connection string
- `ABLY_KEY` - Ably API key. Please make sure to use the same key as used in the frontend application of the project.
- `PORT` - The port on which you want to run the app
- `JWT_SECRET` - Secret key to sign the JWT tokens
- `JWT_LIFETIME` - Define the validity of JWT token

The values of the environment variables have been mentioned in the `app.js` file in comments. Kindly use the values provided for properly running the app.

Then run:

#### `npm start`

Runs the app in the development mode.\
Open http://localhost:< PORT > to view it in your browser.

If the PORT variable is not defined in the `.env` file, the server will run on http://localhost:8000 by default.

The page will reload when you make changes.\
You may also see any errors in the console.

## Documentation

Documentation for the project is available on [https://wendor-backend-sigma.vercel.app/](https://wendor-backend-sigma.vercel.app/)

## Screenshots

### Documentation

![Documentation](/public/screenshots/documentation.png)

Below are the screenshots for the testing of every API endpoint:

#### Register User - /auth/register
![Register User](/public/screenshots/register_user.png)

#### Login User - /auth/login
![Login User](/public/screenshots/login_user.png)

#### Logout User - /auth/logout
![Logout User](/public/screenshots/logout.png)

#### Get All Inventory - /shopper/inventory
![Get Inventory](/public/screenshots/get_all_inventory.png)

#### Buy Items - /shopper/inventory/:id/buy
![Buy Items](/public/screenshots/buy_items.png)

#### Create Bulk Items - /admin
![Create Bulk Items](/public/screenshots/bulk_create.png)

#### Update Item - /admin/:id
![Update Item](/public/screenshots/update_item.png)

## Deployment

The API has been hosted on Vercel and is integrated with CI/CD and serverless hosting.
You can read about the end points in the documentation provided and use the API as per your needs.