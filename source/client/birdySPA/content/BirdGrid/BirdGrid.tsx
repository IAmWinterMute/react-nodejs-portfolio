import React from "react";
import { BirdyGlobalStateContext } from "../../store/BirdyGS.js";
import BirdItem from "./BirdItem.js";

/**
 * This component function creates a grid of birds it finds in the global state.
 * It lets the user sort and search in the data
 */
export default function BirdGrid() {

    //State
    const gs = React.useContext(BirdyGlobalStateContext)
    const [sorting, setSorting] = React.useState<"sightings" | "alphabetical">("sightings")


    //Return the design with data
    if (gs.birdSightings?.length > 0) {

        //Sorting (not altering immmutable state)
        let sortedBirdSightings = [...gs.birdSightings]
        sortedBirdSightings.sort((a, b) => {
            if (sorting == "sightings") {
                if (a.howMany > b.howMany) return -1
                if (a.howMany == b.howMany) return 0
                if (a.howMany < b.howMany) return 1
            }
        })
        sortedBirdSightings = sortedBirdSightings.slice(0,6)

        //The design of the grid
        return <>
            <header>
                <span className="w3-button w3-hide-large w3-xxlarge w3-hover-text-grey"><i className="fa fa-bars"></i></span>
                <div className="w3-container">
                    <div className="w3-section w3-bottombar w3-padding-16">
                        <span className="w3-margin-right">Sort:</span>
                        <button className="w3-button w3-black">Most sightings</button>
                        <button className="w3-button w3-white"><i className="fa fa-diamond w3-margin-right"></i>Alfabetical</button>
                        |
                        <span className="w3-margin-right">Search:</span>
                        <button className="w3-button w3-black">ALL</button>
                    </div>
                </div>
            </header>
            <div className="w3-row-padding">
                {sortedBirdSightings.map(bird => <BirdItem birdSighting={bird} />)}
            </div>
        </>
    }

    //No birds found in the area, inform user
    return <div>Loading...</div>

}