import React from "react";
import { Link } from "react-router-dom";
import { Alert, Button, Row, Col, Figure, Navbar, Nav } from "react-bootstrap";
const Pad0 = {
  padding: 0,
  margin: 0
};
const ImageUrl =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Symbol_from_Marvel%27s_The_Avengers_logo.svg/1200px-Symbol_from_Marvel%27s_The_Avengers_logo.svg.png";
const navbarStyle = {
  backgroundColor: "#835bab"
};
const buttonStyle = {
  backgroundColor: "#a28fb5"
};
export default class MenuBar extends React.Component {
  render() {
    return (
      <Navbar bg="secondary">
        <Navbar.Brand href="#home">
          <Link to="/">
            <Figure style={Pad0}>
              <Figure.Image
                width={50}
                height={50}
                alt="Logo"
                src={ImageUrl}
                style={Pad0}
              />
            </Figure>
          </Link>
        </Navbar.Brand>
        <Navbar.Collapse className="justify-content-end">
          <Link to="/Courses">
            <Button size="lg" variant="info">
              Course
            </Button>
          </Link>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
