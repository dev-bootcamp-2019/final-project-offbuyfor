import React, {Component} from 'react';
import { NavLink } from 'react-router-dom';

class NavLinks extends Component{

    render() {
        return(
            <NavLink {...this.props} activeClassName="active"/>
        )

    }
}

export default NavLinks;


