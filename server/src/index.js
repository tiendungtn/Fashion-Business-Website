const express = require("express");
const dotenv = require("dotenv");
const  mongoose  = require("mongoose");
const routes = require("./routes");
const bodyParser = require("body-parser");
dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(bodyParser.json());

routes(app);



mongoose.connect(`${process.env.MONGO_DB}`)
.then(() => {
    console.log("Connected to MongoDB");
})
.catch((error) => {
    console.log("Error connecting to MongoDB:", error);
})


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});