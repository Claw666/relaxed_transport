import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    origin: null,
    destination: null,
    travelTimeInformation: null,
    travelMode: "walking",
    transitMode: null,
    routingPref: null,
    steps: null,
    weather:null,
    news: null,
    cal: 0,
    co2: 0
}

export const navSlice = createSlice({
    name: "nav",
    initialState,
    reducers: {
        setOrigin: (state, action) => {
            state.origin = action.payload

        },
        setDestination: (state, action) => {
            state.destination = action.payload

        },
        setTravelTimeInformation: (state, action) => {
            state.travelTimeInformation = action.payload

        },
        setTravelMode: (state, action) => {
            state.travelMode = action.payload
        },
        setTransitMode: (state,action) => {
            state.transitMode = action.payload
        },
        setRoutingPref: (state,action) => {
            state.routingPref = action.payload
        },
        setSetps: (state,action) => {
            state.steps = action.payload
        },
        setWeather: (state,action) => {
            state.weather = action.payload
        },
        setNews: (state,action) => {
            state.news = action.payload
        },
        setCal: (state,action) => {
            state.cal = action.payload
        },
        setCo2: (state,action) => {
            state.co2 = action.payload
        }

    }})

export const {setOrigin,setDestination,setTravelTimeInformation, setTravelMode, setTransitMode, setRoutingPref, setSetps, setWeather, setNews, setCal, setCo2}  = navSlice.actions;

export const selectOrigin = state => state.nav.origin;
export const selectDestination = state => state.nav.destination;
export const selectTravelTimeInformation = state => state.nav.travelTimeInformation;
export const selectTravelMode = state => state.nav.travelMode;
export const selectTransitMode = state => state.nav.transitMode;
export const selectRoutingPref = state => state.nav.routingPref;
export const selectSteps = state => state.nav.steps;
export const selectWeather = state => state.nav.weather;
export const selectNews = state => state.nav.news;
export const selectCal = state => state.nav.cal;
export const selectCo2 = state => state.nav.co2;


export default navSlice.reducer;