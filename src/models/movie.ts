import { Schema, model, Types } from "mongoose";
import {IMovie} from "../interfaces/movie";
import {IUserData} from "../interfaces/user";



const movieSchema = new Schema<IMovie>( {
    id:               [{type : Types.ObjectId, required: true , index: true}],
    adult:            Boolean,
    backdropPath:     String,
    title:            String,
    originalLanguage: String,
    originalTitle:    String,
    overview:         String,
    poster_path:      String,
    mediaType:        String,
    genre_ids:        [Number],
    popularity:       Number,
    release_date:     Date,
    video:            Boolean,
    vote_average:     Number,
    voteCount:        Number,
    name:             String,
    users : [{ type: Schema.Types.ObjectId, ref: 'User' }],
})

export const Movie = model<IMovie>("Movie", movieSchema);


export interface IRequestBodyMovie {
    userId: Types.ObjectId,
    movie: IMovie
}

module.exports = {
    Movie
}