import mongoose, { Schema } from 'mongoose';
import { IBuilding } from '../types';

const buildingSchema = new Schema({
  name: {
    type: String,
    required: true,
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
  male_toilets_count: {
    type: Number,
    default: 0,
    min: 0
  },
  female_toilets_count: {
    type: Number,
    default: 0,
    min: 0
  },
  unisex_toilets_count: {
    type: Number,
    default: 0,
    min: 0
  },
  total_toilets_count: {
    type: Number,
    default: 0,
    min: 0
  }
});


buildingSchema.index({ location: '2dsphere' });

buildingSchema.pre<IBuilding>('save', function(next) {
    const maleCount = this.male_toilets_count || 0;
    const femaleCount = this.female_toilets_count || 0;
    const unisexCount = this.unisex_toilets_count || 0;
    
    this.total_toilets_count = maleCount + femaleCount + unisexCount;
    next();
  });
  

export default mongoose.model<IBuilding>('Building', buildingSchema);