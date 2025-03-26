import mongoose, { Schema } from 'mongoose';

const reviewSchema = new Schema({
    building_id: {
        type: Number,
        required: true
    },
    title: {
        type: String,
        default: 'Untitled'
    },
    reviewer_nickname: {
        type: String,
        default: 'Anonymous'
    },
    cleanliness_rating: {
        type: Number,
        required: true, 
        min: 0,
        max: 5
    },
    accessibility_rating: {
        type: Number, 
        required: true, 
        min: 0, 
        max: 5
    },
    overall_rating: {
        type: Number,
        required: true,
        min: 0, 
        max: 5
    },
    comment: {
        type: String,
        trim: true,
        required: true
    },
    type: {
        type: Number,
        enum: [1, 2, 3], // 1: Disability, 2: Female, 3: Male
        required: true
    },
}, { timestamps: true });

export default mongoose.model('Review', reviewSchema);