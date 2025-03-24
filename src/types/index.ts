import { Document } from "mongoose";

export interface IToilet extends Document {
    name: string;
    description?: string;
    location: {
        type: string;
        coordinates: number[];
    };
    address: string; 
    is_accessible: boolean; 
    opening_hours?: string, 
}

export interface IReview extends Document {
    toilet_id: IToilet['_id'];
    reviewer_nickname: string;
    cleanliness_rating: number;
    accessibility_rating: number;
    overall_rating: number; 
    comment?: string;
}

export interface IPhoto extends Document {
    toilet_id: IToilet['_id'];
    url: string;
}

export interface CreateToiletRequest {
    name: string; 
    description?: string, 
    longitude: number; 
    latitude: number; 
    address: string;
    is_accessible: boolean;
    opening_hours?: string; 
}

export interface CreateReviewRequest {
    reviewer_nickname?: string; 
    cleanliness_rating: number;
    accessibility_rating: number; 
    overall_rating: number; 
    comment?: string;
}
