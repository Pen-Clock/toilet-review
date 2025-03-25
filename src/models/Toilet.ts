import mongoose, { Schema } from 'mongoose';

const toiletSchema = new Schema({
  building_id: {
    type: Schema.Types.ObjectId,
    ref: 'Building',
    required: true
  },
  name: {
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
  }
});

// Create a geospatial index for location-based queries
toiletSchema.index({ location: '2dsphere' });

export default mongoose.model('Toilet', toiletSchema);