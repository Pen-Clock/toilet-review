import mongoose, { Schema } from 'mongoose';

const photoSchema = new Schema({
    buildingId: {
        type: Schema.Types.ObjectId,
        ref: 'Building',
        required: true
    },
    url: {
        type: String,
        required: true
    }
});

export default mongoose.model('Photo', photoSchema);