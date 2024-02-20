const mongoose=require("mongoose");
const url=process.env.MONGO_URL;

mongoose.connect(url)
    .then(()=>console.log('connected to mongodb'))
    .catch((err)=>console.log(err));
