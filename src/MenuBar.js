import React from "react";
import LogoImg from "./NavLogo.png";
import { Figure, Navbar, Nav } from "react-bootstrap";
import HelpFractal from "./components/help/HelpFractal.js";
import HelpColor from "./components/help/HelpColor.js";
import HelpAffine from "./components/help/HelpAffine.js";
const Pad0 = {
  padding: 0,
  margin: 0
};

const FontStyle = {
  color: "white",
  fontSize: "18px",
  fontFamily: "Font Awesome 5 Brands Regular"
};
let URL_href = window.location.href;
function Click() {
  if (
    URL_href === "http://localhost:3000/CourseFractal" ||
    URL_href === "http://localhost:3000/CourseColor" ||
    URL_href === "http://localhost:3000/CourseAffine"
  ) {
    return "/";
  } else {
    return "#home";
  }
}

const Logotype = () => {
  return (
    <Navbar.Brand href={Click()}>
      <Figure
        style={Pad0}
        onClick={() => {
          Click();
        }}
      >
        <Figure.Image
          width={50}
          height={50}
          alt="Logo"
          src={LogoImg}
          style={Pad0}
        />
      </Figure>
    </Navbar.Brand>
  );
};
const Courses = () => {
  return (
    <Navbar.Collapse className="justify-content-end">
      <Nav defaultActiveKey="/" as="ul">
        <Nav.Item as="li">
          <Nav.Link style={FontStyle} href="#FractalArt">
            Fractal art
          </Nav.Link>
        </Nav.Item>
        <Nav.Item as="li">
          <Nav.Link style={FontStyle} href="#ColorModels">
            Color models
          </Nav.Link>
        </Nav.Item>
        <Nav.Item as="li">
          <Nav.Link style={FontStyle} href="#AffineTransformation">
            Affine transformation
          </Nav.Link>
        </Nav.Item>
        <Nav.Item as="li">
          <Nav.Link style={FontStyle} href="#OurTeam">
            Our Team
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </Navbar.Collapse>
  );
};

const Help = () => {
  if (URL_href === "http://localhost:3000/CourseFractal") {
    return <HelpFractal />;
  }
  if (URL_href === "http://localhost:3000/CourseColor") {
    return <HelpColor />;
  }
  if (URL_href === "http://localhost:3000/CourseAffine") {
    return <HelpAffine />;
  }
};

const NavbarMenu = () => {
  if (
    !(
      URL_href === "http://localhost:3000/CourseFractal" ||
      URL_href === "http://localhost:3000/CourseColor" ||
      URL_href === "http://localhost:3000/CourseAffine"
    )
  ) {
    return (
      <Navbar
        style={{ backgroundColor: "#002850", height: "60px" }}
        fixed="top"
      >
        <Logotype />
        <Courses />
      </Navbar>
    );
  } else {
    return (
      <Navbar
        style={{ backgroundColor: "#002850", height: "60px" }}
        fixed="top"
      >
        <Logotype />
        <Navbar.Collapse className="justify-content-end">
          <Nav defaultActiveKey="/" as="ul">
            <Nav.Item as="li">
              <Nav.Link style={FontStyle}>
                <Help />
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
};

export default class MenuBar extends React.Component {
  render() {
    return <NavbarMenu />;
  }
}
