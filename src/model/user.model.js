import { Schema, model }  from "mongoose";

const UserSchema = new Schema({

    firstName: String,
    lastName: String,
    fullName: String,
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      min: 5,
      max: 255,
    },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validators: {
      match: [/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/, "Please add a valid email string to the email path."]
    }
  },
  password: {
    type: String,
    required: true,
  }, 
}, 
{
  timestamps: true
})

UserSchema.pre("save", function(next){
  this.fullName = this.firstName + " " +  this.lastName 
  next()
})

export default model('User', UserSchema)
