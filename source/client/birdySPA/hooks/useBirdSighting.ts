import React from "react"
import { BirdyGlobalStateContext } from "../store/BirdyGS.js"
import contractGetBirdSightingData from "../../../sharedLayer/contracts/contractGetBirdSightingData.js"
import { REDUCER_ACTION } from "../store/Reducers.js"

export interface IBirdHook {
    isLoading: boolean,
    updateBirdSigtings: () => void
}


export default (props: {}): IBirdHook => {

    //State
    const gs = React.useContext(BirdyGlobalStateContext)
    const [isLoading, setIsLoading] = React.useState<boolean>(false)

    //Loading the location from server
    function updateBirdSigtings() {
        setIsLoading(true)
        const contract = contractGetBirdSightingData({longitude: gs.location.longitude, latitude:gs.location.latitude})
        contract.request().then(result => {
            gs.dispatchBirdSightings({payload:result.data.birdSightings,type:REDUCER_ACTION.SET})
            setIsLoading(false)
        }).catch(err => {
            setIsLoading(false)
        })
    }

    //Return for use
    return {
        isLoading,
        updateBirdSigtings
    }
}