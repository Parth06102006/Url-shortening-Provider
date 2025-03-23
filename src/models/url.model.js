import mongoose,{Schema} from "mongoose";

const urlModel = new Schema
(
    {
        url:{
            type:String,
            required:true,
            unique:true,
            trim:true,

        },
        shortUrl:
        {
            type:String,
            required:true,
            unique:true,
            trim:true,
        },
        accessCount:
        {
            type:Number,
            default:0,
        }
    },{timestamps:true}
)

const Url = mongoose.model('Url',urlModel)
export {Url};