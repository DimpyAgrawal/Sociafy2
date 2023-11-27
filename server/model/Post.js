const mongoose = require('mongoose');
const User = require('./User');
const ObjectId = mongoose.Schema.Types;

const postSchema = new mongoose.Schema({
    body:{
        type: String,
        require : true

    },
    photo: {
        type: String,
        require: true
    },
    postedBy:{
        type: ObjectId,
        ref: "User"
    },
    likes:[{type: ObjectId,ref: "User"}],
    Comments:[{type: String,
        postedBy:{type: ObjectId,ref:"User"}
    }]

})
module.exports = mongoose.model("POST",postSchema);