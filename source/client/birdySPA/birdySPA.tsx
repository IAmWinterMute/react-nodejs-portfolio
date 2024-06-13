import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import IndexPage from './content/IndexPage.js';
import BirdyGS from './store/BirdyGS.js';


//Creating the inital state for the App
function generateSite(): void {

    //Create the root
    const root = ReactDOM.createRoot(document.getElementById("birdyApp"));

    //Rendering the root of the page
    root.render(
        <BirdyGS>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<IndexPage />} />
                </Routes>
            </BrowserRouter>
        </BirdyGS>
    )
}

generateSite()