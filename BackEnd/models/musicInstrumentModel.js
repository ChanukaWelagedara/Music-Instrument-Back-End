import mongoose from "mongoose";

const instrumentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number, 
      required: true,
    },
    category: { 
      type: String,
      required: true,
    },
    condition: {
      type: String,
      required: true,
    },
    addDate: {
      type: Date,
      required: true,
    },
    image:{
      type:String,
    },
    user:{
      type: mongoose.Schema.Types.ObjectId,
    }
    
  },
  {
    timestamps: true,
  }
);

export const MusicInstrument = mongoose.model("MusicInstrument", instrumentSchema);
