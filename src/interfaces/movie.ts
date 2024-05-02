interface IMovie {
    id: number;
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
}