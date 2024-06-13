import React from "react";
import { IGeolocation } from "../../../sharedLayer/models/geolocation.js";
import { IBirdSighting } from "../../../sharedLayer/models/birdSighting.js";
import * as birdyReducer from "./Reducers.js";


//The context for the global state
export const BirdyGlobalStateContext = React.createContext<IBirdyGSContext>(undefined)

export interface IBirdyGSContext {
    location:IGeolocation
    dispatchLocation: React.Dispatch<birdyReducer.ACTION_GEOLOCATION>
    birdSightings:IBirdSighting[]
    dispatchBirdSightings: React.Dispatch<birdyReducer.ACTION_BIRDSIGHTINGS>
}

//The inital value for the context
export function initGlobalState(): IBirdyGSContext {

    //datastructure to hold data in
    const [location, dispatchLocation] = React.useReducer(birdyReducer.geolocationReducer, null)
    const [birdSightings, dispatchBirdSightings] = React.useReducer(birdyReducer.birdsightingsReducer, null)

    //Init values
    return {
        location, dispatchLocation,
        birdSightings, dispatchBirdSightings
    }
}

//This is the react control wrpaaing the Context tag and holding the state
export default function (props: { children}) {
    const gs = initGlobalState()
    return (
        <BirdyGlobalStateContext.Provider
            value={gs}>
            {props.children}
        </BirdyGlobalStateContext.Provider>
    )

}




