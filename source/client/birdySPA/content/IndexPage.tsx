import React from 'react'
import useGeolocation from '../hooks/useGeolocation.js'
import { BirdyGlobalStateContext } from '../store/BirdyGS.js'
import useBird from '../hooks/useBirdSighting.js'
import BirdGrid from './BirdGrid/BirdGrid.js'
import { REDUCER_ACTION } from '../store/Reducers.js'

export default function IndexPage() {

    const gs = React.useContext(BirdyGlobalStateContext)
    const useLocation = useGeolocation({})
    const useBirdy = useBird({})

    // Handler for map click
    const handleMapSelect = (latlng) => {
        gs.dispatchLocation({
            type: REDUCER_ACTION.SET,
            payload: { ...gs.location, latitude: latlng.lat, longitude: latlng.lng }
        })
    }

    React.useEffect(() => {
        useLocation.updateLocation()
    }, [])

    React.useEffect(() => {
        if (gs.location?.latitude != null) {
            useBirdy.updateBirdSigtings()
        }
    }, [gs.location?.latitude])



    return <>


        <nav className="w3-sidebar w3-collapse w3-white w3-animate-left" style={{ zIndex: 3, width: 300 }} id="mySidebar"><br />
            <div className="w3-container">
                <a href="#" className="w3-hide-large w3-right w3-jumbo w3-padding w3-hover-grey" title="close menu">
                    <i className="fa fa-remove"></i>
                </a>
                <img src="/assets/images/birdalertlogo_medium.png" className="w3-round" /><br /><br />
                <h4><b>LOCATION</b></h4>
                Long: {gs.location?.longitude}<br />
                Lat: {gs.location?.latitude}<br />


            </div>
        </nav>


        <div className="w3-overlay w3-hide-large w3-animate-opacity" style={{ cursor: 'pointer' }} title="close side menu" id="myOverlay"></div>


        <div className="w3-main" style={{ marginLeft: 300 }}>




            <BirdGrid />





            <footer className="w3-container w3-padding-32 w3-dark-grey">
                <div className="w3-row-padding">

                </div>
            </footer>

        </div>
    </>






}