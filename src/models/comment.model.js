import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";


const commentSchema = new Schema({

    content: {
        type: String,
        required: true
    },

    video: {
        type: Schema.Types.ObjectId,
        ref: "Video"
    },

    owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }

}, { timestamps: true })

commentSchema.plugin(mongooseAggregatePaginate) // this plugin give ability of paginate means from where to where we have to show videos or comment
export const Comment = mongoose.model("Comment", commentSchema)

