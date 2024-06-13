import React, { useEffect } from "react";
import { BirdyGlobalStateContext } from "../../store/BirdyGS.js";
import { IBirdSighting } from "../../../../sharedLayer/models/birdSighting.js";
import useBirdInfo from "../../hooks/useBirdInfo.js";


export default function BirdItem(props:{birdSighting:IBirdSighting}) {

    //Hooks
    const useBI= useBirdInfo()

    useEffect(()=>{
        if(props.birdSighting?.sciName != ""){
            useBI.updateBirdInfo(props.birdSighting?.sciName)
        }
    },[props.birdSighting.sciName])

    return <>
        <div className="w3-third w3-container w3-margin-bottom">
            {
                useBI.birdInfo?.images?.length>0 
                ? <img src={useBI.birdInfo.images[0]} style={{ width: '100%' }} className="w3-hover-opacity" />
                : <img src="/assets/images/loading.png" alt="Loading" style={{ width: '100%' }} className="w3-hover-opacity" />
            }
            <div className="w3-container w3-white">
                <p><b>{props.birdSighting.comName} ({props.birdSighting.sciName})</b><br/></p>
                Family: {useBI.birdInfo?.family}<br/>
                Observations: {props.birdSighting.howMany}<br/>
                Is reviewed: {props.birdSighting.obsReviewed ? "Yes" : "No"}<br/>
                <p></p>
            </div>
        </div>
    </>
}