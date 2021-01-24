# assignment_codemymobile
# What Requires?
```
•	VS Code

•	Node JS

•	SQL Server

•	SQL Server Management Studio
```

 ## Prerequisites and required applications

•	**Node.js** is an open source, cross-platform runtime environment for developing server-side and networking applications. You should have basic understanding of nodejs.

•	**ExpressJS** is one of the most trending web frameworks for node.js. It is built on top of node.js http module, and adds support for routing, middleware, view system etc. It is very simple and minimal, unlike other frameworks.

•	**MySQL** is an open-source relational database management system. Its name is a combination of “My”, the name of co-founder Michael Widenius’s daughter, and “SQL”, the abbreviation for Structured Query Language.

•	**Postman** is an API(application programming interface) development tool which helps to build, test and modify APIs.It has the ability to make various types of HTTP requests(GET, POST, PUT, PATCH etc.).

•	**IDE (integrated development environment)** is a software application that provides comprehensive facilities to computer programmers for software development. An IDE normally consists of at least a source code editor, build automation tools, and a debugger. In case of mine, I prefer to use visual studio code.


## Let’s Begin…..

1.	**Installation**: Please install the above software.
2.	**Create a Project**: Now it’s time to create our project. Create a directory name NodeMysqlCrudApp. Then navigate to NodeMysqlCrudApp directory. Command are as below

```
// Create directory

*mkdir NodeMysqlCrudApp*

// then Navigate to NodeMysqlCrudApp

*cd NodeMysqlCrudApp*
```

3.	**Initialise and Configure Our Project**: To initialise run the command in project folder *npm init* that will ask a few questions to avoid that you can run npm init -y . This will install *package.json* file.

4.	**Next step is to other dependencies:**
```
•	Express is top framework of nodejs. Install using below command :

npm install express --save
```
```
•	Body Parser is Node.js body parsing middleware. Parse incoming request bodies in a middleware before your handlers, available under the req.body property.

npm install body-parser --save
```
```
•	MySQL is open source database use to interacting with database and manipulating the records.

npm install mysql --save
```
```

•	Nodemon is a tool that helps develop node.js based applications by automatically restarting the node application when file changes in the directory are detected. Use -dev flag to save in devDependencies and --save will save the dependencies in package.json file.

npm install --save-dev nodemon
```

5.	**Setup Database** : Create a new database(e.g. friendsbook) using SSMS. Then execute the below script to create tables & stored procedures
```
CREATE DATABASE friendsbook; 


CREATE TABLE users(

  id int AUTO_INCREMENT NOT NULL,
  
      first_name varchar(45),
      
      last_name varchar(45),
      
      avatar varchar(45),
      
      PRIMARY KEY(id));
      
           
CREATE TABLE friendships(
	id int NOT NULL,
    	initiator_user_id INT,
    	receiver_user_id INT
    	status INT,
	    PRIMARY KEY(id));	
  ```

Next, use the below command to insert into both tables. Following is the command to insert into table- users.

```
INSERT INTO `friendsbook`.`users` (`first_name`, `last_name`, `avatar`) VALUES ('parag', 'chawla', 'www.google.com');
```


6.	Create a server.js file. Add the following code into it.
```
	const express = require('express');
  
	const bodyParser = require('body-parser');
  
	// create express app
  
	const app = express();
  
	// Setup server port
  
	const port = process.env.PORT || 5000;
  
	// parse requests of content-type - application/x-www-form-urlencoded
  
	app.use(bodyParser.urlencoded({ extended: true }))
  
	// parse requests of content-type - application/json
  
	app.use(bodyParser.json())
  
	// define a root route
  
	app.get('/hello', (req, res) => {
  
	  res.send("Hello sejal");
    
	});
  
	app.listen(port, () => {
  
	  console.log(`Server is listening on port ${port}`);
    
	});
  ```
  

Now run the following file in terminal using the command:

```
node server.js
  
	OR
  
	node server
  ```


Now open your browser and navigate to http://localhost:5000 . Browser will show Hello World . That’s great now our server is running.
Now simply run npm start to run the server that will auto restart the serve when detect any change in files.

	npm start

7. Now create a db.config.js file.	

8. Create connection to database in the db.config.js file using the following code:    
```

'use strict';

const mysql = require('mysql');

//local mysql db connection

const dbConn = mysql.createConnection({

  host     : 'localhost',
  
  user     : 'root',
  
  password : '********',
  
  database : 'friendsbook'
  
});

dbConn.connect(function(err) {

  if (err) throw err;
  
  console.log("Database Connected!");
  
});

module.exports = dbConn;
```

9. Now create the project folder structure as shown in above file - Project folder structure.

--Complete user.model.js file.
```
'use strict';
var dbConn = require('./../../config/db.config');

var User = function(user) {
    this.id = user.id;
    this.first_name =  user.first_name;
    this.last_name= user.last_name;
    this.avatar = user.avatar;
};
 
User.findById = function( id,result) {
    dbConn.query("Select * from users where id= ? ", id,function(err,res){
        if(err) {
            console.log("error :",err);
            result(err,null);
        }
        else {
            result(null,res);
        }
    });
};
module.exports = User;
```

--Complete user.controller.js file.
```
'use strict';
const User = require('../models/user.model');
exports.findById = function(req, res) {
    User.findById(req.params.id, function(err, user) {
      if (err)
      res.send(err);
      res.json(user);
    });
  };
 ```
 
 --Complete user.routes.js file.
 ```
 const express = require('express')
const router = express.Router()

const userController = require('../controllers/user.controller');

router.get('/:id', userController.findById);

module.exports = router
```
10. Now, after adding MCR files, complete server.js file. The complete code will look like:
```
const express = require('express');
const bodyParser = require('body-parser');
// create express app
const app = express();
// Setup server port
const port = process.env.PORT || 5000;
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
// parse requests of content-type - application/json
app.use(bodyParser.json())
// define a root route
app.get('/hello', (req, res) => {
  res.send("Hello sejal");
});
//Require user routes
const userRoutes = require('./src/routes/user.routes')
app.use('/api/v1/users', userRoutes)

// listen for requests
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
```

10. APIs Test in Postman.
  Get the output using *http://127.0.0.1:5000/api/v1/users* using GET method in postman. Suppose we want details of user having id 3 then we will write *http://127.0.0.1:5000/api/v1/users/3* in the URL. The image - *screenshotpostman.png* is what we will get as output.
  
11. Next step is to create a frontend using reactjs. After installing reactjs, create a file named app.js and write the following code into it.
```
import logo from './logo.svg';
import './App.css';
function App() {
  return (
    
  <div className="App">
   <header className="App-header">
    <input type="text" placeholder="Search..." />
    <button type="button">Submit</button>
    

  <form>
  <label>
  <br></br>
    UserId    
    <input type="text" name="user    " />
  </label>
  <br></br>
  <label>
    First Name
    <input type="text" name="fname" />
  </label>
  <br></br>
  <label>
    Last Name
    <input type="text" name="lname" />
  </label>
  <br></br>
  <label>
    Avatar
    <input type="text" name="ava" />
  </label>

 </form>
 <button type="button">Add as Friend</button>
 </header>
 </div>

  );
}

export default App;
```

One can also make changes in the styles and outlook of the webpage using app.css file.
Screenshotfrontend is how the frontend would look like. By tying **npm start** in terminal or by *http://localhost:3000/* using this url in the browser, the screenshotfrontend would be displayed.



