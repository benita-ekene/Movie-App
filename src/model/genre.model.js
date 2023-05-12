import { Schema, model, Types, Query } from "mongoose";

const GenreSchema = new Schema({

  title: {
    type: String,
    required: true,
  },
  producer:{
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "in-progress", "completed"],
    default: "pending",
  },
  
  customer: {
    type: Types.ObjectId,
    ref: "User",
    required: true,
  },
  customerId: String,
 
  isDeleted: {
    type: Boolean,
    default: false,
  },
 
}, 
{
  timestamps: true,
});

GenreSchema.pre(/^find/, function(next) {
  if (this instanceof Query) {
    this.where({ isDeleted: { $ne: true } }); 
  }
  next();
});

export default model("Genre", GenreSchema);