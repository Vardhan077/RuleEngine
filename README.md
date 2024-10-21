# Rule Engine - Node.js with MongoDB

This is a rule-engine built using **Node.js** and **MongoDB** that allows users to create and evaluate rules based on Abstract Syntax Trees (AST). Users can define complex rules using logical operators, store them in the database, and evaluate data against those rules.

## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Folder Structure](#folder-structure)
- [License](#license)

## Features
- Create rules with logical operators such as AND, OR.
- Parse rules into ASTs and store them in MongoDB.
- Combine multiple rules using AND/OR operators.
- Evaluate data against the stored rules.
- Fetch and display rules from the database.

## Technologies Used
- **Node.js** - Backend framework.
- **Express.js** - Web framework for Node.js.
- **MongoDB** - NoSQL database for storing rules and ASTs.
- **Mongoose** - ODM (Object Data Modeling) for MongoDB.
- **Body-parser** - Middleware for parsing incoming request bodies.
- **CORS** - Middleware for handling cross-origin requests.

## Installation

1. **Clone the repository**:
    ```bash
    git clone https://github.com/username/rule-engine.git
    cd rule-engine
    ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

3. **Configure MongoDB Atlas**:
   - Create a MongoDB cluster on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
   - Add your current IP address to the cluster's IP whitelist.
   - Replace the MongoDB URI in `server.js` with your own connection string.
   ```javascript
   const uri = 'your-mongodb-uri';
4. **Run the server**:
    - npm start
  
  The app will run at http://localhost:5000.
  
  
  
  # Usage
  
  # NOTE
  ## Don't forget to check atleast one rule. And you can even check every rule individually, also by combining.
  
  ## Create a Rule
  You can create a new rule by sending a POST request to /create-rule with the rule ID and rule string. Example:
  
  ```json
  
  POST /create-rule
  {
      "ruleId": "rule1",
      "ruleString": "age > 30 AND income >= 50000"
  }
  
  
  ```
  
  ## Fetch Rules
  Fetch all the stored rules:
  
  GET /rule
  
  
  ## Evaluate a Rule
  Evaluate a rule by sending a POST request to /evaluate-rule with AST and data:
  
  
  ```json
  
  POST /evaluate-rule
  {
      "ast": { "type": "operator", "value": "AND", "left": { "type": "operand", "value": "age > 30" }, "right": { "type": "operand", "value": "income >= 50000" }},
      "data": { "age": 35, "income": 60000 }
  }
  
  
  ```
  
  
  
  ## Combine Rules
  Combine multiple rules into one AST using logical operators:
  
  
  ```json
  
  
  POST /combine-rules
  {
      "ruleIds": ["rule1", "rule2"]
  }
  
  
  
  ```
  
  
  # API Endpoints
  GET /rule: Fetch all rules.
  POST /create-rule: Create a new rule and store its AST.
  POST /evaluate-rule: Evaluate a rule using AST.
  POST /combine-rules: Combine multiple rules.
  
  
  # Folder Structure
  
  
  ├── server.js              # Main server file and Mongoose schema for rules
  
  ├── package.json           # Project dependencies and scripts
  
  └── README.md              # Project documentation
  
  
  
  

