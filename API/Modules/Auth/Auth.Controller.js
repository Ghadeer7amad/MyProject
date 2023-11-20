import bcrypt from "bcrypt"
import UserModel from "../../DB/Model/User.Model.js"

export const SignUp = async(req, res)=>{
    try{
        const{userName, email, dob, phone, address, password} = req.body;
        const User = await UserModel.findOne({email})
     
        if(User){
         return res.status(404).json({message: "email already exists"})
        }
        const hashedpassword = bcrypt.hashSync(password, parseInt(process.env.SALT_ROUND));
        const createUser = await UserModel.create({userName, email, dob, phone, address, password:hashedpassword})
        return res.status(201).json({message: "success", user: createUser})
    }catch(error){
        return res.status(500).json({message: "error", error: error.stack})
    } 
}
