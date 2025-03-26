import { Document } from "mongoose";

export enum ToiletType {
    DISABILITY = 1,
    FEMALE = 2,
    MALE = 3
}

export interface IBuilding extends Document {
    name: string;
    location: {
      type: string;
      coordinates: number[];
    };
    address: string;
    male_toilets_count: number;
    female_toilets_count: number;
    unisex_toilets_count: number;
    total_toilets_count: number;
  }
  
export interface IToilet extends Document {
    building_id: IBuilding['_id'];
    name?: string;
    location: {
      type: string;
      coordinates: number[];
    };
}

export interface IReview extends Document {
    toilet_id: IToilet['_id'];
    reviewer_nickname: string;
    cleanliness_rating: number;
    accessibility_rating: number;
    overall_rating: number; 
    comment?: string;
    type: ToiletType;
}

export interface IPhoto extends Document {
    toilet_id: IToilet['_id'];
    url: string;
}

export interface CreateToiletRequest {
    building_id: string;
    name?: string;
    longitude: number;
    latitude: number;
}

export interface CreateReviewRequest {
    reviewer_nickname?: string; 
    title?: string;
    cleanliness_rating: number;
    accessibility_rating: number; 
    overall_rating: number; 
    comment: string;
    type: ToiletType;
}


export interface CreateBuildingRequest {
    name: string;
    longitude: number;
    latitude: number;
    address: string;
    male_toilets_count: number;
    female_toilets_count: number;
    unisex_toilets_count: number;
}