const UserModel = require("../models/userModel")
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken")
module.exports={
    registerUser:async (req,res)=>{
        //1.validate req body-userRegisterValidate
        //2.create userModel
        const userModel=new UserModel(req.body);
        //3.do password encryption
        userModel.password=await bcrypt.hash(req.body.password,10)
        //4.save data to mongodb
        try{
            const response= await userModel.save();
            response.password=undefined;
            return res.status(201).json({message:"sucessfull",data:response});
        }catch(err){
            return res.status(500).json({message:"error",err:err})
        }
    },
    loginUser:async (req,res)=>{
        //1.check user using email
        //2.compare password
        //3.create jwt token
        //4.send response to client
        try{
            const user=await UserModel.findOne({email:req.body.email});
            if(!user){
                return res.status(401)
                            .json({message:"Invalid email or password"});
            }
            const isPassEqual= await bcrypt.compare(req.body.password,user.password);
            if(!isPassEqual){
                return res.status(401)
                            .json({message:"Invalid email or password"});
            }
            const tokenObject={
                _id:user._id,
                fullName:user.fullName,
                email:user.email
            }
            const jwtToken=jwt.sign(tokenObject,process.env.SECRET,{expiresIn:'1h'});//1 hour
            return res.status(200)
                        .json({jwtToken})
        }catch(err){
            return res.status(500).json({message:"error",error:err});
        }
    },
    getUsers : async(req,res)=>{
        try{
            const users = await UserModel.find({}, {password:0});
            return res.status(200)
                .json({data: users});
        }catch(err){
            return res.status(500)
                .json({message:'error', err});
        } 
    }  
}

