/// <reference path="layout.js" />
import React, { Component } from 'react';
import { Collapse, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';

export class NavMenu extends Component {
    static displayName = NavMenu.name;

    constructor(props) {
        super(props);

        this.toggleNavbar = this.toggleNavbar.bind(this);
        this.state = {
            collapsed: true
        };
    }

    toggleNavbar() {
        this.setState({
            collapsed: !this.state.collapsed
        });
    }

    render() {
        return (
            <header>
                <Navbar className="navbar-expand-sm navbar-toggleable-sm  border-bottom box-shadow mb-3 nav-bar" container light>
                    <NavbarBrand tag={Link} to="/">MVP Onboarding</NavbarBrand>
                    <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
                    <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>
                        <ul className="navbar-nav flex-grow">
                            <NavItem>
                                <NavLink tag={Link} className="text-white bg-dark nav-item" to="/">Home</NavLink>
                            </NavItem>

                            <NavItem>
                                <NavLink tag={Link} className="text-white bg-dark nav-item" to="/CustomerList">Customers</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink tag={Link} className="text-white bg-dark nav-item" to="/StoreList">Stores</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink tag={Link} className="text-white bg-dark nav-item" to="/ProductList">Products</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink tag={Link} className="text-white bg-dark nav-item" to="/SaleReport">Sales</NavLink>
                            </NavItem>

                        </ul>
                    </Collapse>
                </Navbar>



            </header>

        );
    }
}
