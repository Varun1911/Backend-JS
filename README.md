# JS Backend
<br>

## FIle Structure
![File Structure](Assets/Readme/File%20structure.jpg "File Structure")  
<br>

## Create and Deploy Backend in Production

1. ### Create empty node application 
    ```
    npm init
    ```
    This utility will walk you through creating a package.json file.  
    It only covers the most common items, and tries to guess sensible defaults.  
    Use `npm install <pkg>` afterwards to install a package and
    save it as a dependency in the package.json file.  
    <br>

2. ### Start the app
    In the package.json file, you can add a command to start the app.   
    ```json
    "scripts": {  
        "start": "node index.js"  
    },
    ```
    <br>

3. ### Install Express   
    Express is a web framework for node.js.  
    It is used to create a server.

    ```
    npm install express
    ```
    <br>

4. ### Create a Server
    ```js
    const express = require('express');
    const app = express();
    const port = 3000;

    app.get('/', (req, res) =>
    {
        res.send('Hello World!');
    });


    app.get('/login', (req, res) =>
    {
        res.send('<h1>Login page</h1>');
    });

    app.listen(port, () =>
    {
        console.log(`Example app listening on port ${port}`)
    })
    ```

    *NOTE* - To see the changes made on the server, you need to restart it. It does not hot reload automatically.  
    <br>

5. ### Dotenv  
    The port free on our computer may not be free on someone else's computer.  
    Also we don't want everyone to see our sensitive information.  
      
    To take care of such things we use `dotenv`  
      
    Install `dotenv` 
    ```
    npm install dotenv
    ```

    Create `.env` file.  
      
    Use the `.env` file like so- 
    ```js
        require('dotenv').config();
        const port = process.env.PORT;
    ```  
    <br>

6. ### Deploy
    - add node_modules and .env to .gitignore 
    - push to github
    - add github repo on domain
    - add environment variables   
<br> 

## Data Modelling with Mongoose

Data modeling is the process of creating a visual representation, or blueprint, of how data is structured and organized within a system or database. It involves defining data entities, their attributes, and the relationships between them, essentially outlining how data will be stored and accessed.  

We can use tools like **eraser.io** or **Moon Modeler**(paid) for data modelling.

The first step of building a backend is to analize the data and fields to be stored in the DB.

[StackBlitz Practice Project](https://stackblitz.com/edit/stackblitz-starters-pijqbpno?description=&file=README.md&title=Express%20Starter)  

1. Create a models folder to store all models.   
*NOTE* - General naming scheme - `<model_name>.models.js`.  
<br> <br>

2. Import `mongoose` and create a scheme using the `new mongoose.Scheme({})` function.
    ```js
    const userSchema = new mongoose.Schema({
        username: String,
        isActive: Boolean,
    });
    ```  
    <br>

    - The above method of defining schema object is correct but a better approach would be to define an object for every key.
    ```js
    const userSchema = new mongoose.Schema({
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
        },
        email: {
            type: String,
            required: [true, "email already registered"],
            unique: true,
            lowercase: true,
        },
    });
    ```
    <br>

    - It is common to have timestamps stored in the database. So mongoose allows us to do that like so -
    ```js
    const userSchema = new mongoose.Schema({}, {timestamps : ture});
    ```
    <br> <br>

3. Export the scheme to create schema in mongoDB.
    ```js
    export const User = mongoose.model('User', userSchema);
    ```  
      
    `model()` takes 2 parameters -   
    a) name of the model  
    b) on what schema should it be based on  

<br>

*NOTE* - If we want to create a schema which has another schema in as a type, we can do it like so -

```js
const todoSchema = new mongoose.Schema(
  {
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },

    subTodos: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SubTodo',
      },
    ], // Array of subTodos
  },
  { timestamps: true }
);
```
The `type` will always be `mongoose.Schema.Types.ObjectId` and the `ref` would the name given the the `mongoose.model()` function. It is common practice to keep the model variable name same as the name providied in the model function.  
<br>  

## Setup a Professional Backend Project
1. Setup the folder structure as explained earlier. Initialise node, create .env, README, .gitignore and basic files in the src folder.  
<br>

2. Install nodemon using the command `npm i -D nodemon`.  
 Nodemon automatically restarts the server whenever me make any changes in the server.  
 `-D` in the command is to install dev dependency so that nodemon is not used in production and only in development.  
 <br>
  
3. Setup dev command for nodemon in the package.json file. `"dev" : "nodemon src/index.js"`.    
<br>
  
4. install prettier using `npm i -D prettier` so that the team follows same coding practice and there are no conflicts on github. Similar to nodemon, it is a dev dependency.  
Create a prettier config file `.prettierrc`. Add the necessary configurations.  
Also create a `.prettierignore` file which tells prettier which files should not be formatted like `.env`.  
<br>   
  
5. Install `dotenv`, `mongoose` and `express`.  
  <br>  

6. Import and configure dotenv as early as possible in your application. We can use the older way of configuring - `require('dotenv').config({path: '/.env'});`.   
But to maintain same import style we can use -
    ```js
    import dotenv from 'dotenv';

    dotenv.config({
        path : '/.env'
    });
    ```  
    Update you "dev" command in package.json from  
     `"dev": "nodemon src/index.js"` to   
     `"dev": "nodemon -r dotenv/config --experimental-json-module src/index.js"`  
     --experimental-json-module is needed as it is an experimental feature for now.
  
  <br>

## Connecting Database 
1. Create a cluster on mongoDB Atlas. Atlas is an online database.  
  
2. Add the ip address of the server your backend is deployed on. For testing we'll allow all ipv4 by adding 0.0.0.0/0.  

3. Create a user and give admin access.  

4. Click the connect button on your cluster and get the mongoDB uri and put it in the environment varibales.  

5. In code, you should always connect db in try catch block and use async await as the connection may take time.  
<br>

## Custom API Response and Error Handling

### Setup Server
1. Install cookie-parser and cors(Cross Origin Resource Sharing) using `npm i cookie-parse cors`.  
<br>   
2. The `use()` method is used for middlewares and configurations. Configure `cors` with this method.   
  
    ```js 
    app.use(cors()); // We can directly use this 

    //We can use cors options to configure as well.
    app.use(cors({
        origin: process.env.CORS_ORIGIN,
        credentials: true
    }))
    ```  
      
    Read cors documentation for more details on cors options.  
  <br>
  
3. Parse incoming requests with JSON payloads by using the following middleware : `app.use(express.json({limit: '16kb'}));`.  
The options are not necessary.  
<br> 

4. Configure the app to encode incoming urls by : `app.use(express.urlencoded({extended: true, limit: '16kb'}));`.    
The options are not necessary.  
<br> 

5. Configure the app to store static files like pdf, images accessible to all by `app.use(express.static("public"))`.        
<br> 

6. Configure cookie parser by `app.use(cookieParser())`.  This helps the server access and set cookies on the user's browser.  
<br> 
    
**Middleware** - Middleware in Express.js is a function that processes incoming requests before they reach the final route handler, allowing you to modify the request or response, run code, or end the request-response cycle.


## Models with hooks and JWT

- MongoDB will automatically make your model name lowercase and plural and store it. If your model name is 'Model' then it becomes 'models'.  
<br> 
  
- `index : true` - is an option used in a schema definition to create an index on a specific field. Indexes improve query performance on that field.   
Query performance refers to how fast and efficiently a database can find and return the data you ask for.   
<br>
  
- Mongoose Aggregate Paginate v2 is used for aggregation pipleines.  
Use `schema.plugin(mongooseAggregatePaginate)` to access aggregation queries on the schema.     
<br>  
   
- bcrypt which helps us to hash(encrypt) any payload usually passwords.  
To encrypt password we'll use one of mongoose's hooks (middleware) - Pre hook. The Pre hook runs just before our data is saved.  
*NOTE* : Donot use arrow function in Pre hook callback as it does not have reference to `this`.   
<br>
 
- Json Web Token (JWT) is used for securely transmitting information between parties as a self-contained token. It's often used for stateless authentication. JWT is bearer token.   
The `jwt.sign()` method takes 3 parameters - payload, access token and access token expiry.
<br>  
 
- Similar to hooks, we can also write our custom methods for our custom logic on that schema.  
 sytanx - `schema.methods.func = function(){}`   
<br>

## Upload file (Multer)

### Cloudinary        
Cloudinary is a cloud-based platform that provides a comprehensive solution for managing, transforming, and delivering images and videos for websites and mobile applications. 

Steps 

- the user will upload the file and we will store it on our local server temporarily using Multer.
- we'll take the file from the server and store it on cloudinary server.

*Note* - We upload it on our server so that if the upload to cloudinary fails, we can reattempt the uplaod.  

### Multer
Multer is a Node.js middleware designed to handle multipart/form-data, primarily used for uploading files.