import React from 'react'
import {
    Link
} from "react-router-dom";
import {Button, Container, Nav, Navbar, NavLink} from "react-bootstrap";

function MenuItems({name, href}) {
    return (
        <li className="nav-item active">
            <Link className="nav-link" to={href}>{name}</Link>
            <p></p>
        </li>
    )
}

export function Menu({menuItems}) {
    return (
        <>
            <Navbar collapseOnSelect expand="lg" bg="secondary">
                <Container>
                    <Navbar.Brand className="text-white container">ToDoApplication</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="pt-3 mr-auto">
                           {menuItems.map((item) => <MenuItems name={item.name} href={item.href}/>)}
                        </Nav>
                            <br/>
                        <Nav>
                            <Button variant="primary" className="mr-2">Войти</Button>
                            <Button variant="primary">Регистрация</Button>
                        </Nav>
                    </Navbar.Collapse>
                </Container>


            </Navbar>
        </>
)
}
// export function Navbar({navbarItems}) {
//     return (
//         <nav className="navbar navbar-expand-sm bg-dark navbar-dark justify-content-end">
//             <a className="navbar-brand" href="#">ToDOApplication</a>
//             <div className="collapse navbar-collapse" id="navbarCollapse">
//                 <ul className="navbar-nav mr-auto">
//                    {navbarItems.map((item) => <NavbarItem name={item.name} href={item.href}/>)}
//                 </ul>
//                 <form className="form-inline mt-2 mt-md-0">
//                     <input className="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search"/>
//                     <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
//                 </form>
//             </div>
//         </nav>
//     )
// }

export default Navbar