import mongoose from 'mongoose';
const categorySchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    rootKategorija: {
        type: String
    },
    podKategorija1: {
        type: String,
    },
    podpodKategorija1: {
        type: String,
    },
    podKategorija2: {
        type: String,
    }
});

const cModel = mongoose.model('category', categorySchema);
export default cModel;