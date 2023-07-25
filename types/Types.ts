export interface Trending {

results:{
    id: number,
    title: String,
    overview: String,
    poster_path: String,
    media_type: String,
    release_date: String,
    backdrop_path: String,
}[]

}


export interface Movie {
    id: string,
    title: String,
    overview: String,
    poster_path: String,
    media_type: String,
    release_date: String,
    backdrop_path: String,
}