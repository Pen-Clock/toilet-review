import mongoose, { Schema } from 'mongoose';

const reviewSchema = new Schema({
    toilet_id: {
        type: Schema.Types.ObjectId,
        ref: 'Toilet',
        required: true
    },
    reviewer_nickname: {
        type: String,
        default: 'Anonymous'
    },
    cleanliness_rating: {
        type: Number,
        required: true, 
        min: 1,
        max: 5
    },
    accessibility_rating: {
        type: Number, 
        required: true, 
        min: 1, 
        max: 5
    },
    overall_rating: {
        type: Number,
        required: true,
        min: 1, 
        max: 5
    },
    commment: {
        type: String,
        trim: true
    }
});

export default mongoose.model('Review', reviewSchema);