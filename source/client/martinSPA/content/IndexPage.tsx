import React from 'react'

export default function IndexPage() {
    return <>


        <div className="w3-row">
            <div className="w3-half w3-black w3-container w3-center" style={{ "height": 700 }}>
                <div className="w3-padding-64">
                    <h1>Reference Projects</h1>
                </div>
                <div className="w3-padding-64">
                    <a href="https://bird.morethandevs.com" className="w3-button w3-black w3-block w3-hover-blue-grey w3-padding-16">Bird Alert</a>
                    <p>
                        Bird Alert is a comprehensive site that integrates the use of APIs and connects to a MongoDB database for server logging. 
                        This full-stack application is built using React, NodeJS, Express, and MongoDB. The React layer is crafted with 
                        functional components, hooks, global state management using reducers, and a contract layer for server communication.<br />
                    </p>
                    {
                        /*
                     <a href="#work" className="w3-button w3-black w3-block w3-hover-teal w3-padding-16">My Work</a>
                    <a href="#work" className="w3-button w3-black w3-block w3-hover-dark-grey w3-padding-16">Resume</a>
                    <a href="#contact" className="w3-button w3-black w3-block w3-hover-brown w3-padding-16">Contact</a>
                        */
                    }
                  
                </div>
            </div>
            <div className="w3-half w3-blue-grey w3-container" style={{ height: 700 }}>
                <div className="w3-padding-64 w3-center">
                    <h1>About Me</h1>
                    <img src="/assets/images/me_small.jpg" className="w3-margin w3-circle" alt="Person" />
                    <div className="w3-left-align w3-padding-large">
                        <p>
                            I am a creative and dedicated software developer with an interest in solving problems.
                            With experience in software architecture, development, and management,
                            I have helped companies streamline their services. I enjoy working with various technologies and
                            thrive on driving projects from concept to finished solution.
                            My strength lies in combining technical expertise with strategic thinking to create robust, user-friendly systems.
                            I look forward to new challenges where I can contribute my skills and continue to grow. Please take a look at my reference projects.
                        </p>
                        <p>Thanks</p>
                        <p>//Martin</p>
                    </div>
                </div>
            </div>
        </div>


        <div className="w3-row">
            <div className="w3-half w3-light-grey w3-center" style={{ minHeight: 800 }} id="work">
                <div className="w3-padding-64">
                    <h2>Contact</h2>
                    <p>You can reach me at inq@morethandevs.com</p>
                </div>
            </div>

            <div className="w3-half w3-indigo w3-container" style={{ minHeight: 800 }}>
                <div className="w3-padding-64 w3-center">
                    <h2>Resume</h2>
                    <p>A draft from my CV</p>
                    <div className="w3-container w3-responsive">
                        <table className="w3-table">
                            <tr>
                                <th>Year</th>
                                <th>Title</th>
                                <th>Where</th>
                            </tr>
                            <tr className="w3-white">
                                <td>2024 -</td>
                                <td>Independent consultant</td>
                                <td>More Than Devs</td>
                            </tr>
                            <tr>
                                <td>2017-2024</td>
                                <td>CIO</td>
                                <td>Carbiotix</td>
                            </tr>
                            <tr className="w3-white">
                                <td>2015-2017</td>
                                <td>Machine Vision Specialist</td>
                                <td>Bravida Automation</td>
                            </tr>
                            <tr>
                                <td>2007-2015</td>
                                <td>System developer</td>
                                <td>Jihå Automation</td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
        </div>

        <footer className="w3-container w3-black w3-padding-16">
            <p></p>
        </footer>
    </>

}