# Organizer-backend

https://dbdiagram.io/d/Organizer-Schema-671fecc097a66db9a38f55f4

##Organizer

Overview:
Organize and tackle your todo's in life with ________, which will show you where all your needs are for your convenience!

# Technical Challenges:
Third party integration/acquiring and implementing a map API
Store rendering on "Near Me" map feature, based on list items
Real-time updating

# Organizer-backend
1. Create a new Postgres database named organizer.
2. Initialize Prisma and connect it to the database.
3. Define the models according to the schema above.
4. The username of a User must be unique.
5. Seed the database with MyList.
   
# Logged in users should be able to:
- Create a new list
- Add items to a list
- Delete a list
- Search for near by stores that has the products from a specific list
- See the price for the list items from an individual list
  
# Authentication Routes
- POST /register -  creates a new User with the provided credentials and sends a token
request body should include username and password
the password should be hashed in the database
- POST /login - sends a token if the provided credentials are valid
request body should include username and password

# List Routes
GET /myLists
PUT /myLists/:id
DELETE /myLists/:id
GET /myLists/:id
POST /myLists

# List Items Routes
DELETE /listItems/:id
PUT /listItems/:id
GET /listItems/:id
POST /listItems
GET /listItems
