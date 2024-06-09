import { Document, model, models, Schema } from "mongoose";

export interface IImage extends Document{
    title: string;
    transformationType: string;
    transformationUrl?: string;
    publicId: string;
    secureUrl: string;
    width?: number;
    height?: number;
    config?: object;
    aspectRatio?: string;
    color?: string;
    prompt?: string;
    author:{
        _id:string;
        firstName:string;
        lastName:string;
    }
    createdAt?: Date;
    updatedAt?: Date;
  }
const ImageSchema = new Schema({
  title: { type: String, require: true },
  transformationType: { type: String, required: true },
  transformationUrl: { type: URL },
  publicId: { type: String, required: true },
  secureUrl: { type: URL, required: true },
  width: { type: Number },
  height: { type: Number },
  config: { type: Object },
  aspectRatio: { type: String },
  color: { type: String },
  prompt: { type: String },
  author: { type: Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Image=models?.Image || model('Image',ImageSchema)

export default Image