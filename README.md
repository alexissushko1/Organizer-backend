# TasteTracker-Backend

<img width="477" alt="image" src="https://github.com/user-attachments/assets/a8cf830e-476b-443f-ba7e-968bc81ce7a3">

## Overview

Looking to try out new, exotic and/or healthy recipes, but don't want to guess at where all the different herbs, spices, and specialty ingredients are in your area? Well, with TasteTracker, you can precisely locate where all these ingredients are without having to take a shot in the dark. TasteTracker takes your recipe lists and populates the store(s) or other locations that carry your list items on the app's "Near Me" map, so you know exactly where to go to find them. Making new recipes doesn't have to be so daunting with TasteTracker leading you onto the next recipe you've been dying to try out!

# TasteTracker

## TasteTracker-Backend
1. Create a new Postgres database named organizer*
2. Initialize Prisma and connect it to the database
3. Define the models according to the schema above
4. The username of a User must be unique
5. Seed the database with MyList

*name kept as such for the code, as the app is meant (eventually) to become an organizer that can help people with any project, task, activity, etc to find what they need to complete them.

## Logged in users should be able to:
- Create a new list
- Add items to a list
- Delete a list
- Search for near by stores that has the products from a specific list
- See the price for the product-oriented list items from an individual list (stretch goal)
  
## Authentication Routes:
- POST /register: creates a new User with the provided credentials and sends a token
   - Request body should include username and password
   - The password should be hashed in the database
- POST /login - sends a token if the provided credentials are valid
   - Request body should include username and password

## List Routes:
- GET /myLists
- PUT /myLists/:id
- DELETE /myLists/:id
- GET /myLists/:id
- POST /myLists

## List Items Routes:
- DELETE /listItems/:id
- PUT /listItems/:id
- GET /listItems/:id
- POST /listItems
- GET /listItems


## Technical Challenges:
- Third party acquisition and implementation of map API
- Integrating third party API with hardcoded database
- Store(s) rendering on "Near Me" map feature, based on list items
- Real-time updating

## Suggested Stack:
- Express
- Postgres
- Google Map API
- Prisma
