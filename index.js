const express=require("express");
const routes = require("./routes");
const bodyParser = require("body-parser");
const app=express();
require("dotenv").config()
require("./config/db")
const PORT=process.env.PORT || 8080;
app.use(bodyParser.json());
app.use("/api/V1",routes);
app.listen(PORT,()=>{console.log(`Server is running on port ${PORT}`)})

//mongodb+srv://knavina2:<password>@cluster0.tpivnp6.mongodb.net/?retryWrites=true&w=majority