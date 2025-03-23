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
        }
    },{timestamps:true}
)

const Url = mongoose.model('Url',urlModel)
export {Url};