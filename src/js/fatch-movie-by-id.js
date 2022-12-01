'use strict';
import axios from 'axios';


export function fetchMovieBuId(moveId) {
    const BASE_URL = `https://api.themoviedb.org/3/movie/${moveId}?api_key=9cda16d98a6e510af2decf0d66e8e7d5`;
    return axios.get(BASE_URL);
}

