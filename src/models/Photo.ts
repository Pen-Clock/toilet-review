import mongoose, { Schema } from 'mongoose';

const photoSchema = new Schema({
    toilet_id: {
        type: Schema.Types.ObjectId,
        ref: 'Toilet',
        required: true
    },
    url: {
        type: String,
        required: true
    }
});

export default mongoose.model('Photo', photoSchema);