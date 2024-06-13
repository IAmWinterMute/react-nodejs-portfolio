import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import IndexPage from './content/IndexPage.js';


//Creating the inital state for the App
function generateSite(): void {

    //Create the root
    const root = ReactDOM.createRoot(document.getElementById("moreApp"));

    //Rendering the root of the page
    root.render(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<IndexPage />} />
            </Routes>
        </BrowserRouter>
    )

}

generateSite()