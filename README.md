
# Foraging Finds

Finding plants or mushrooms when you’re out foraging is a joy! But remembering the spot you found that beautiful flush of chanterelles some time after can be frustrating. This app lets a user save their finds on a map along with a photo and a short journal entry. 

Users can also explore other users’ finds or search for a specific mushroom on a map, and leave a comment on each entry. All user entries can be viewed in a list, edited, or deleted.

This version uses React, Redux, Express, Passport, and PostgreSQL (a full list of dependencies can be found in `package.json`).

_Duration: 2 Week Sprint_

## Screen Shots

#### Registration
![foraging-finds-register-gif](https://user-images.githubusercontent.com/46235932/205517000-5e612ffd-55f4-47e2-918a-a87c60a52eb4.gif)

#### Map
![foraging-finds-map-gif](https://user-images.githubusercontent.com/46235932/205517002-66b8ecd1-bd24-402b-8dfe-94bf01681f1c.gif)

#### Add
![ff-add-gif](https://user-images.githubusercontent.com/46235932/205517033-bb740ea9-c23f-4b9b-9f4b-d0dad4309184.gif)

#### Edit 
![ff-edit-gif](https://user-images.githubusercontent.com/46235932/205517044-1be4abf6-80e4-4ae2-af35-3844c558a034.gif)

## Prerequisites

Before you get started, make sure you have the following software installed on your computer:

- [Node.js](https://nodejs.org/en/)
- [PostrgeSQL](https://www.postgresql.org/)
- [Nodemon](https://nodemon.io/)

## Create database and tables

- Create a database titled 'foraging-finds'
- Run the queries in the database.sql file

## Development Setup Instructions

- Run `npm install`
- Start postgres if not running already
- Run `npm run server`
- Run `npm run client`
- Navigate to `localhost:3000`

## Usage
How does someone use this application? Tell a user story here.

1. Map page: click and drag the map to move around. Click a mushroom icon to see the name and location. Access more detailed information by clicking Details link.
2. Details: see the item's photo and user comments. Add your own comment here.
3. Search: search for a specific mushroom by name or latin name. Click on mushroom name to pan the map to its location.
4. Add pin: add a new foraging find at your location. Title and photo are required; latin name and comments are optional.
5. My Pins: view the list of your foraging finds. Edit or delete an entry.

## Built With

- React
- Redux
- Sagas
- Node.js
- Express
- PostgreSQL
- Passport
- Google Maps API
- Multer
- Material UI

## Acknowledgement
Thanks to [Prime Digital Academy](www.primeacademy.io) who equipped and helped me to make this application a reality.

## Support
If you have suggestions or issues, please email me at [alina.trukhina@gmail.com](alina.trukhina@gmail.com)
