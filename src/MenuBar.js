import React from "react";
import { Link } from "react-router-dom";
import Logo from "./Ebec.png";
import { Alert, Button, Row, Col, Figure, Navbar, Nav } from "react-bootstrap";

const Pad0 = {
  padding: 0,
  margin: 0
};
const ImageUrl =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Symbol_from_Marvel%27s_The_Avengers_logo.svg/1200px-Symbol_from_Marvel%27s_The_Avengers_logo.svg.png";

const FontStyle = {
  color: "white",
  fontSize: "18px",
  fontFamily: "Font Awesome 5 Brands Regular"
};
export default class MenuBar extends React.Component {
  render() {
    return (
      <Navbar style={{backgroundColor:"#343A40",height:"64px"}}fixed="top">
        <Navbar.Brand href="#home">
          <Link to="/">
            <Figure style={Pad0}>
              <Figure.Image
                width={50}
                height={50}
                alt="Logo"
                src={Logo}
                style={Pad0}
              />
            </Figure>
          </Link>
        </Navbar.Brand>
        <Navbar.Collapse className="justify-content-end">
          <Nav defaultActiveKey="/" as="ul" >
            <Nav.Item as="li">
              <Nav.Link style={FontStyle}>Fractal art</Nav.Link>
            </Nav.Item>
            <Nav.Item as="li">
              <Nav.Link style={FontStyle}>Color models</Nav.Link>
            </Nav.Item>
            <Nav.Item as="li">
              <Nav.Link style={FontStyle}>Affine transformation</Nav.Link>
            </Nav.Item>
            <Nav.Item as="li">
              <Nav.Link style={FontStyle}>Our Team</Nav.Link>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
