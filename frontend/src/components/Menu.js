import React from 'react'
import {Link} from "react-router-dom";
import {Button, Container, Form, FormControl, Nav, Navbar,} from "react-bootstrap";


function MenuItem({name, href}) {
    return (
        <li className="nav-item active">
            <Link className="nav-link" to={href}>{name}</Link>
        </li>
    )
}


export default function NavMenu({menuItems, auth, logout}) {
    let login_button = ''

    if (auth.is_login) {
        login_button = <button className="btn btn-primary"
                               onClick={logout}>Выйти</button>
    } else {
        login_button = <Link to='/login' className="btn btn-primary">Войти</Link>
    }

    return (
        <Navbar collapseOnSelect expand="lg" bg="secondary">

            <Container>

                <Navbar.Brand className="text-white container">ToDoApplication</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav"/>

                <Navbar.Collapse id="responsive-navbar-nav">

                    <Nav className="">
                        {menuItems.map((item) => <MenuItem name={item.name} href={item.href}/>)}
                    </Nav>
                    <Nav>
                        <p className="mt-3">{auth.username} </p>      {login_button}
                     </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

