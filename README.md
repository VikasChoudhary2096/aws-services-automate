# AWS Services Automate

In my current company there is no proper local development, and we are using AWS serverless for our backned. We are making a simple UI based app where a developer can trigger deployment of AWS lambda and publishing of SNS for daily testing.

## Built With: 
### 1. Node.js as Backend
Event-driven, non-blocking architecture in Node.js facilitates concurrency(handles > 10,000 concurrent requests) and is good with an application where no heavy computation is required.

Assumption: Since no direct CPU intensive task is included in the requirement, preferring Node.js based on my familiarity with the framework.

Postman APIs: https://www.getpostman.com/collections/fc91950cb641ee547e99
### 2. MySql as Database
SQL based mysql is used as there is not much data to save in the tables. 

### 3. Angular as Frontend
Based on familiarity.(in-process)

## Tasks:
- [x] 1.  Project Setup
- [x] 2.  Lambda/SNS APIs integration(CRUD)
- [ ] 3.  UI for the app using angular/react
- [ ] 4.  portable app using electron or some other services(not yet decided)


## Setup

```
cd backend
$ npm install
$ npm start

```
