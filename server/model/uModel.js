import mongoose from 'mongoose';
const usersSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    age: Number,
    refreshToken:{
        type:String
    }
});

const uModel = mongoose.model('users', usersSchema);
export default uModel;