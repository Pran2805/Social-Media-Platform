import mongoose from 'mongoose'

const postSchema = new mongoose.Schema({
    title:{
        type: String
    },
    content: {
        type:String
    },
    file: {
        type:String
    },
    likes:{
        type:Number,
        default: 0
    },
    comments:[{
        type:String
    }]
})

export const Post = mongoose.model("Post", postSchema)