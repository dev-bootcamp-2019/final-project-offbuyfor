import React, {Component} from 'react';
import logo from '../img/AHA_HW_LOGOAug_rebrand_251.jpg';
import NavLink from './NavLink';
import '../App.css';
import {Navbar, Nav, NavItem} from 'react-bootstrap';


class Header extends Component {
    render() {
        return (
            <div className="App">
                <div className="header">
                    <Navbar>
                        <Navbar.Header>
                            <Navbar.Brand>
                                <div className="logo">
                                    <NavLink to="/"><img src={logo}/></NavLink>
                                </div>
                            </Navbar.Brand>
                            <Navbar.Toggle/>
                        </Navbar.Header>
                        <Navbar.Collapse>
                            <Nav pullRight>
                                <NavItem eventKey={1} href="/">
                                    Home
                                </NavItem>
                              
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>
                </div>

            </div>
        )
    }
}

export default Header;

