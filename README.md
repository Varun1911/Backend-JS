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
