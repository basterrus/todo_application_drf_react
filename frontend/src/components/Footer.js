import React from "react";
import {Container, Nav, Navbar} from "react-bootstrap";

export default function Footer() {
    return (
        <>
            <Navbar bg="secondary" variant="dark" fixed="bottom">

                <Container>
                    <Nav className="me-auto ">
                        <Nav.Link href="#">Павел_Недошивин@baster_2022г.</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>

        </>

    )
}