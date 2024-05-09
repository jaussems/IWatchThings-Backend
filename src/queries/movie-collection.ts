import {database} from "../services/database";



console.log(`Test`);
const movieCollection = database.collection("movies");
movieCollection.insertOne(
    {
        backdrop_path: "/5cCfqeUH2f5Gnu7Lh9xepY9TB6x.jpg",
        id: 967847,
        original_title: "Ghostbusters: Frozen Empire",
        overview: "The Spengler family returns to where it all started – the iconic New York City firehouse – to team up with the original Ghostbusters, who've developed a top-secret research lab to take busting ghosts to the next level. But when the discovery of an ancient artifact unleashes an evil force, Ghostbusters new and old must join forces to protect their home and save the world from a second Ice Age.",
        poster_path: "/e1J2oNzSBdou01sUvriVuoYp0pJ.jpg",
        media_type: "movie",
        adult: false,
        title: "Ghostbusters: Frozen Empire",
        original_language: "en",
        genre_ids: [
            14,
            12,
            35
        ],
        popularity: 656.433,
        release_date: "2024-03-20",
        video: false,
        vote_average: 6.564,
        vote_count: 459,
        users: []
    }
    )

