import {Types} from "mongoose";
import {IUserData} from "./user";

export interface IMovie {
    id: Types.ObjectId;
    adult: boolean;
    backdropPath: string;
    title: string;
    originalLanguage: string;
    originalTitle: string;
    overview: string;
    poster_path: string;
    mediaType: string;
    genre_ids: number[];
    popularity: number;
    release_date: Date;
    video: boolean;
    vote_average: number;
    voteCount: number;
    name: string;
    users: Types.ObjectId[];
}