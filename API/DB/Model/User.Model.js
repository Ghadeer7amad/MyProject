import mongoose, {Schema, model} from "mongoose";

const UserSchema = new Schema({
    userName:{
        type: String,
        min: 4,
        max: 20,
        required: true //[true, "Name is required"]
    },
     email : {
        type: String,
        required: true,
        unique: true
    },
    dob: {
        type: String,
        required: true,
    },
     phone : {
        type: String
    },
    address : {
        type: String
    },
    password : {
        type: String,
        required: true
    },
    confirmEmail:{
        type: Boolean,
        default: false
    },
    role: {
        type : String,
        default: 'User',
        enum : ['User', 'Admin']
    }
},
{ 
    timestamps : true
})

const UserModel = mongoose.model.User || model('User', UserSchema)
export default UserModel