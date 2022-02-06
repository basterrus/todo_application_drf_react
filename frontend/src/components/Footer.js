import React from "react";
import {Container, Nav, Navbar} from "react-bootstrap";

export function Footer() {
    return (
<>
  <Navbar bg="dark" variant="dark" fixed="bottom" >

    <Container>
    <Nav className="me-auto ">
      <Nav.Link href="#">Павел Недошивин@baster 2022г.</Nav.Link>

    </Nav>
    </Container>
  </Navbar>

</>

    )
}