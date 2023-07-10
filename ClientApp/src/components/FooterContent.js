/// <reference path="layout.js" />
import React, { Component } from 'react';

import './NavMenu.css';



export class FooterContent extends Component {
    static displayName = FooterContent.name;

    constructor(props) {
        super(props);


    }


    render() {
        return (

            <div className="border box-shadow footer">

                <h6>MVP Onboarding Single Page Application</h6>
                <p className="footerText">Copy Right @2023 Ramesh Nallamuthu</p>

            </div>

        );
    }
}
