import React from 'react'

export default function IndexPage() {
    const [displayPortfolio, setDisplayPortfolio] = React.useState<boolean>(false)
    const [displayContact, setDisplayContact] = React.useState<boolean>(false)
    return <>
        <div className="bgimg w3-display-container w3-text-white">
            <div className="w3-display-middle w3-jumbo">
                <p><img src='/assets/images/OnlyDevs100High.png' /></p>
            </div>
            <div className="w3-display-topleft w3-container w3-xlarge">
                <p><button onClick={()=>{setDisplayPortfolio(true)}} className="w3-button w3-black">examples</button></p>
                <p><button onClick={()=>{setDisplayContact(true)}} className="w3-button w3-black">contact</button></p>
            </div>
            <div className="w3-display-bottomleft w3-container">
                <p className="w3-xlarge"></p>
                <p className="w3-large">More Than Devs AB <br/>Independent consultant for IT dev. React/NodeJS/Express/MongoDB /../ Machine Vision/Cognex/Omron</p>
            </div>
        </div>

        <div id="menu" className="w3-modal" style={displayPortfolio ? { display: 'block' } : { display: 'none' }}>
            <div className="w3-modal-content w3-animate-zoom">
                <div className="w3-container w3-black w3-display-container">
                    <span onClick={()=>{setDisplayPortfolio(false)}} className="w3-button w3-display-topright w3-large">x</span>
                    <h1>Example Projects</h1>
                </div>
                <div className="w3-container w3-display-container">
                    <h1>BirdAlert</h1>
                </div>
                <div className="w3-container">
                    <h5>
                        Bird Alert is a comprehensive site that integrates the use of APIs and connects to a MongoDB database for server logging. 
                        This full-stack application is built using React, NodeJS, Express, and MongoDB. The React layer is crafted with 
                        functional components, hooks, global state management using reducers, and a contract layer for server communication.<br />
                        <br />
                        <a href="https://bird.martinerlandsson.com">Bird Alert</a><br />
                        <a href="https://github.com/IAmWinterMute">Repository</a><br />
                        <br />
                    </h5>
                    <hr/>
                </div>
            </div>
        </div>


        <div id="contact" className="w3-modal" style={displayContact ? { display: 'block' } : { display: 'none' }}>
            <div className="w3-modal-content w3-animate-zoom">
                <div className="w3-container w3-black">
                    <span onClick={()=>{setDisplayContact(false)}} className="w3-button w3-display-topright w3-large">x</span>
                    <h1>Contact</h1>
                </div>
                <div className="w3-container">
                    <br />
                    Please get in contact with us if you have any inquiries. <br />
                    Email info@morethandevs.com for contact<br />
                    <br />
                </div>
            </div>
        </div>

    </>

}