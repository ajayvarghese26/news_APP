# NewApp Application

The functionalities supported are:
- Register a new user
- Login a user
- Get News Preference of a user
- Update News Prefernce of a user
- Get News

Package to be installed-
- express
- path
- cors
- body-parser
- axios
- dotenv
- fs
- nodemon
- jsonwebtoken

Commands to be run
Installing the packages - npm install
Starting the server - node src/app.js

Routes
- POST /users/register    - to register a new user
- POST /users/login       - to login a user
- GET  /users/preferences - to get logged in user preference
- POST /users/preferences - to update logged in user preference
- POST /news              - to get news of logged in user

