#Vendora Backend


#Project Structure

- **controllers/**
    Handles logic for the routing which includes fetching a database, hashing password, and validating input.

- **routes/**
    Endpoints are defined and controllers are linked here.

-**models/**
    Sets up database connection. It also defines schemas(listing, user, and booking) and create document models.

-**app.js**
    Sets up middlewares including routers, 

-**server.js**
    This is where the backend gets fired up with a specific port number.



Mongoose queries are not real native promises, they are just thenables that behave like promises. So doing .exec() makes it explicit that the query is running by giving you an actual promise. Note: without .exec() and just await your query may be running or just is a build up query since there will not be any implications.