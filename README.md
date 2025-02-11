# WikTok

Web app - Infinitely scrollable feed of Wikipedia articles, designed for mobile first.

## Tool Stack

#### Frontend:

- [React](https://react.dev/) - Create component based UI
- [Vite](https://vite.dev/) - Quickly scaffold React project
- [axios](https://axios-http.com/) - Send different HTTP requests from frontend to API
- [eslint](https://eslint.org/) - Formatting and linting for JS code

#### Backend:

- [Node.js](https://nodejs.org/en) - Runtime for JavaScript on backend
- [Express](https://expressjs.com/) - Web framework for Node, useful APIs for routing etc
- [nodemon](https://nodemon.io/) - Live reloads the server as you make changes
- [Postman](https://www.postman.com/) - Mock HTTP requests to the server
- [cors](https://www.npmjs.com/package/cors) - Allows server to connect to resources of other origins
- [bcrypt.js](https://www.npmjs.com/package/bcryptjs) - Allows password salting before pushing to database
- [MongoDB](https://www.mongodb.com/) - Store objects on remote database (used MongoDB Atlas)
- [mongoose](https://mongoosejs.com/) - Allows backend to easily connect to MongoDB
- [JsonWebToken](https://jwt.io/) - Allows us to generate tokens so that server can verify users
- [dotenv](https://www.npmjs.com/package/dotenv) - Allows server to use secret keys safely

## What I learned

- I got extra practice using the React useState and useEffect hooks which allowed me to ensure that components on the page continually re-render with the most up to date data from the backend.
- The more I use React along with its hooks, I can't imagine writing markup another way that isn't .jsx, it just makes everything so easy.
- I now would like to learn more about server-side rendering and the benefits it offers for entirely JSX sites.
- The biggest learnings for me came when working out the backend and attempting my first user authentification system. I got to try using Json Web Tokens with a lot of help from the documentation. I'm excited about learning more about JWT's use and the theory behind it.
- I really enjoyed the process of making an API from scratch. I think it's really satisfying to create the files using clean compact code and exposing only the endpoints that are required by the front end.
- I also learnt a lot about the practical differences between a relational database and an object based database like MongoDB.
