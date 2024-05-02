import { Schema, model, Types } from "mongoose";



const movieSchema = new Schema<IMovie>( {
    id:               Number,
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
    name:             String

})

export const Movie = model<IMovie>("Movie", movieSchema);

module.exports = {
    Movie
}