const express = require("express")
const app = express()

 //  parsing the request body
app.use(express.json());

// lambda routes
const lambdaRoutes = require('./routes/lambda');
app.use('/lambda', lambdaRoutes);

// sns routes
const snsRoutes = require('./routes/sns');
app.use('/sns', snsRoutes);

// error handling
const errorController = require('./controllers/error');
app.use(errorController.get404);
app.use(errorController.get500);


const port = process.env.PORT || 3000;
app.listen(port, () =>{
    console.log(`listening on port ${port}`)
})