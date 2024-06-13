import contractGetGeoData from "../../../sharedLayer/contracts/contractGetGeoData.js"
import React from "react"
import { BirdyGlobalStateContext } from "../store/BirdyGS.js"
import { REDUCER_ACTION } from "../store/Reducers.js"

export interface IGeolocationHook {
    isLoading: boolean,
    updateLocation: () => void
}


export default (props: {}): IGeolocationHook => {

    //State
    const gs = React.useContext(BirdyGlobalStateContext)
    const [isLoading, setIsLoading] = React.useState<boolean>(false)

    //Loading the location from server
    function updateLocation() {
        setIsLoading(true)
        const contract = contractGetGeoData({})
        contract.request().then(result => {
            gs.dispatchLocation({ type: REDUCER_ACTION.SET, payload: result.data.location })
            setIsLoading(false)
        }).catch(err => {
            setIsLoading(false)
        })
    }

    //Return for use
    return {
        isLoading,
        updateLocation,
    }
}