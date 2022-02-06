import React from "react";
import {Button, Container, Nav, Navbar, NavLink} from "react-bootstrap";

export function Menu() {
    return (
        <>
            <Navbar collapseOnSelect expand="lg" bg="dark">
                <Container>
                    <Navbar.Brand className="text-white container">ToDoApplication</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mr-auto ">
                            <Nav.Link><NavLink to="#" className="text-white">Главная</NavLink></Nav.Link>
                            <Nav.Link><NavLink to="#" className="text-white">Пользователи</NavLink></Nav.Link>
                            <Nav.Link><NavLink to="#" className="text-white">Информация</NavLink></Nav.Link>
                        </Nav>
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