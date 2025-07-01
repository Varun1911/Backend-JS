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
  
## Connecting Database 
1. Create a cluster on mongoDB Atlas. Atlas is an online database.  
  
2. Add the ip address of the server your backend is deployed on. For testing we'll allow all ipv4 by adding 0.0.0.0/0.  

3. Create a user and give admin access.  

4. Click the connect button on your cluster and get the mongoDB uri and put it in the environment varibales.  

5. In code, you should always connect db in try catch block and use async await as the connection may take time.
