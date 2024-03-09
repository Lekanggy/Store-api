import mongoose from "mongoose";
import { UserDocument } from "./user.model";
import { generateRand } from "../utils/jwt.utils";


export interface ProductInput {
    user: UserDocument["_id"];
    title: string;
    description: string;
    price: number;
    image: string;
  }
  
  export interface ProductDocument extends ProductInput, mongoose.Document {
    createdAt: Date;
    updatedAt: Date;
  }
const productSchema = new mongoose.Schema({
    productId:{
        type: String,
        require: true,
        unique: true,
        default: ()=> `product_${generateRand()}`
    },
    user: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    title:{type:String, require: true,},
    description: {type:String, require: true,},
    image: {type: String, require: true,},
    price: {type: Number, require: true,}
   
   
}, {
    timestamps:true
})




const ProductModel = mongoose.model<ProductDocument>("Product", productSchema)

export default ProductModel