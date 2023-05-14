import { Schema, model, Types, Query } from "mongoose";

const GenreSchema = new Schema({

  title: {
    type: String,
    required: true,
  },

  category : {
    type: String,
    required: true
},
  producer:{
    type: String,
    required: true,
  },
  releaseDate: {
    type: String,
    required: true},

    },
    dateReturned: { 
      type: Date
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