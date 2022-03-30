# restaurant-app-back
restaurant - express, mongoose, node

This part of the restaurant app serves as the back-end server. It's front-end counterpart, made with react, can be found at https://github.com/khodgesx/restaurant-app-front


# Yummy Decisions
Yummy Decisions is a restaurant organizer. The user can add new restaurants to their list with the following properties:
Name, Cuisine, Photo, Favorite Dish, Notes, Price Level, and whether or not they have visited or not. 
The restaurants are then sorted into two lists - visited or not. 

#### Created By: Kelly Hodges
##### March 2022

### Deployed [Yummy Decisions](https://restaurant-app-front.herokuapp.com/)

## User Flow:
![alt text](url "restaurant user flow")

## Tech Stack: MERN
### Back-End: MongoDB, Express.js, Node.js
### [Front-End](https://github.com/khodgesx/restaurant-app-front/blob/main/README.md) : React.js

### API
- Cloudinary for uploading photos
- Yelp for Restaurant Search (TBD)

## Approach:
Currently working with one model - restaurants - but I hope to add a second model - users - so users can login and use this app for themselves. I'd also like to add a third model - take out menus. 

## MVP:
- A working full-stack application using the MERN stack
- Adhere to MVC file structure - views is the React frontend
- At least one model with full CRUD 
- At least three react components, defined in their own files, besides App.js
- Be deployed online and accessible to the public via Heroku
- Two git repositories - one for backend and one for frontend 

## Stretch Goals:
- Have Users who can log in - working on it
- Pull from a 3rd party API - Cloudinary
- Use a CSS framework like Bootstrap - using Bootstrap for my modals

## Additional Notes:
I plan to get the user functionality set up and hope to implement a 3rd party API call to Yelp to make adding restaurants easier.

