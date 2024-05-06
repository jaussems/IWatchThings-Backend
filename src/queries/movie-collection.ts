import {database} from "../services/database";



console.log(`Test`);
const movieCollection = database.collection("movies");
movieCollection.insertOne(
    {
        backdrop_path: "/binFFC69yKeabOl1ZRWsqfPj1Ks.jpg",
        id: 844185,
        original_title: "Unfrosted",
        overview: "In a time when milk and cereal ruled breakfast, a fierce corporate battle begins over a revolutionary new pastry.",
        poster_path: "/efvnagceBlmNG10BKnSOEqI6VtP.jpg",
        media_type: "movie",
        adult: false,
        title: "Unfrosted",
        original_language: "en",
        genre_ids: [
        35
    ],
        popularity: 66.806,
        release_date: "2024-05-02",
        video: false,
        vote_average: 4.9,
        vote_count: 7
    }
    )

