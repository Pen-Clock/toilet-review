import mongoose, { Schema } from 'mongoose';

const toiletSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true 

    },
    description: {
        type: String, 
        trim: true
    }, 
    location: {
        type: {
            type: String, 
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    address: {
        type: String, 
        required: true
    }, 
    is_accessible: {
        type: Boolean, 
        default: false
    },
    opening_hours: {
        type: String
    }
});

toiletSchema.index({location: '2dsphere'});

export default mongoose.model('Toilet', toiletSchema);