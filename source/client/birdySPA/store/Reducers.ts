import { IBirdSighting } from "../../../sharedLayer/models/birdSighting.js"
import { IGeolocation } from "../../../sharedLayer/models/geolocation.js"

//Just a list of all available actions
export enum REDUCER_ACTION {
    ADD,
    REMOVE,
    UPDATE,
    SET,
}

//Action for setting a new geolocation
export type ACTION_GEOLOCATION = {
    type: REDUCER_ACTION,
    payload: IGeolocation
}

//Action for setting a new geolocation
export type ACTION_BIRDSIGHTINGS = {
    type: REDUCER_ACTION,
    payload: IBirdSighting[]
}

//The reducer for geolocation
export function geolocationReducer(state: IGeolocation, action: ACTION_GEOLOCATION) {
    let newState: IGeolocation = JSON.parse(JSON.stringify(state)); //Quick deepcopy. Switch to individial action if speed is needed
    switch (action.type) {
        case REDUCER_ACTION.SET:
            newState = action.payload
            return newState
    }
}

//The reducer for birdsightings
export function birdsightingsReducer(birdSightings: IBirdSighting[], action: ACTION_BIRDSIGHTINGS) {
    let newState: IBirdSighting[] = JSON.parse(JSON.stringify(birdSightings)); //Quick deepcopy. Switch to individial action if speed is needed
    switch (action.type) {
        case REDUCER_ACTION.SET:
            newState = action.payload
            return newState
    }
}

