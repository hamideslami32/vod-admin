import axios from 'axios';
import { getMoviesFailure, getMoviesStart, getMoviesSuccess } from "./MovieActions"

export const getMovies = (dispatch) => {
    dispatch(getMoviesStart())
    try {
        const res = axios.get("/movies", { 
            headers: {token: "Bearer "+ "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxMjAwNzE5MGY5MGU4ZTVhOGVlNDljNSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTYzNDE1NzEyMCwiZXhwIjoxNjM0NTg5MTIwfQ.AJGEGdN15CV4e7LTSk_7gRr_E_pU9ULfXyZb8yjmlHw"}
        })
        dispatch(getMoviesSuccess(res.data))
    } catch(err) {
        dispatch(getMoviesFailure())
    }
}