# API Template for Node.js Applications

## Node Express Server
For help getting started with Node Express, view online
[documentation](https://expressjs.com/).

#### 1. [Setup Node](https://nodejs.org/en/)

#### 2. Clone the repo

```sh
$ https://github.com/asifvora/node-api-template.git
$ cd node-api-template/
```

#### 3. Install dependency

```sh
$ npm install
```

#### 4. Run the server

```sh
$ npm run dev
```
- Go to `http://localhost:PORT_NUMBER` to see the app running

## Code Structure

This codebase follows MVC pattern with few additional layers.

### List of layers

The codebase has following flow of different layers:

- Routes
  - Controllers
    - Request Validators
    - Service Layer
    - Dispatch Response

### Routes

- Routes are the top level and are created using `Express.js` routes
- They internally calls the `controllers`
- Every route has it's own `controller`

### Controllers

- Controller is invoked by it's `route`
- Controllers at it's core has following responsiblities:
  - Validation of the client request
  - Extract the request entities (body, params or query)
  - Invokes different services
  - Returns the final response back to the client

### Request Validators

- This layer is a set of custom functions in a separate file
- They are used to validate the client request be it the body, params or query of the request
- If the client request is not desireable, it returns the errors back to the client

### Service Layers

- This layer primarily interacts with the Database
- It is reponsible only for getting the required data from the Database and return it to the controller
- **Note**: All the business logic and query filteration should take place inside the controller

## Libraries Used

- Express.js
- Express Validator
- Mongoose

## HTTP Verbs Used

- **GET** : Use this to fetch data from the DB to client
- **POST**: Use this when creating new record in DB
- **PUT**: Use this when you partially update any record
- **PATCH**: Use this when you partially update any entity
- **DELETE**: Use this when you are performing delete operation

## HTTP Status Code Used

- 200 - Used when you get data successfully
- 201 - Used when your data created successfully
- 400 - Used when there is bad request from the client
- 401 - Used when user is not authenticated
- 403 - Used when user is authenticated but do not have permissions to access resource
- 404 - Used when data not found
- 409 - Used when data is duplicate
- 422 - Used when payload key(s) is valid but the data in the key(s) are unprocessable
- 500 - Used when server encounter unexpected condition

## Questions?🤔 
  
Hit me on [![Twitter URL](https://img.shields.io/twitter/url/http/shields.io.svg?style=social)](https://twitter.com/007_dark_shadow)
[![Medium](https://img.shields.io/badge/Medium-asifvora-brightgreen.svg)](https://medium.com/@asifvora)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-asifvora-blue.svg)](https://www.linkedin.com/in/asif-vora/) 
[![Instagram](https://img.shields.io/badge/Instagram-Asif%20Vora-green.svg)](https://www.instagram.com/007_dark_shadow/) 

## License

MIT License

Copyright (c) 2019 Asif Vora

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.