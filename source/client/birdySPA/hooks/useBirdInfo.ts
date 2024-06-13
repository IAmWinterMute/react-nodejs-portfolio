import React from "react"
import { BirdyGlobalStateContext } from "../store/BirdyGS.js"
import contractGetBirdInfo from "../../../sharedLayer/contracts/contractGetBirdInfo.js"
import { IBirdInfo } from "../../../sharedLayer/models/birdInfo.js"

export interface IBirdHook {
    isLoading: boolean,
    updateBirdInfo: (sciName: string) => void
    birdInfo:IBirdInfo
}


export default (): IBirdHook => {

    //State
    const gs = React.useContext(BirdyGlobalStateContext)
    const [isLoading, setIsLoading] = React.useState<boolean>(false)
    const [birdInfo, setBirdInfo] = React.useState<IBirdInfo>(null)

    //Loading the location from server
    function updateBirdInfo(sciName: string) {
        setIsLoading(true)
        const contract = contractGetBirdInfo({ sciName })
        contract.request().then(result => {
            setBirdInfo(result.data.birdInfo)
            setIsLoading(false)
        }).catch(err => {
            setIsLoading(false)
        })
    }

    //Return for use
    return {
        isLoading,
        updateBirdInfo,
        birdInfo
    }
}