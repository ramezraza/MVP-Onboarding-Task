import React, { Component } from 'react';

export class Home extends Component {
    static displayName = Home.name;

    render() {
        return (
            <div>
                <h1>Single Page Application!</h1>
                <p>Built with:</p>
                <ul>
                    <li>C# for cross-platform server-side code</li>
                    <li>React for client-side code</li>
                    <li>Javascript</li>
                    <li>Reactsrap , Semantic UI for layout and styling</li>

                </ul>
                <h4> This website enables CRUD Operations for the below</h4>
                <ul>
                    <li><a href='/CustomerList'>Customer</a></li>
                    <li><a href='/StoreList'>Store</a></li>
                    <li><a href='/ProductList'>Product</a></li>
                    <li><a href='/SaleReport'>Sales</a></li>

                </ul>



            </div>
        );
    }
}
