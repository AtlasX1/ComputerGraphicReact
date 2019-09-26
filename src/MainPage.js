import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import {
  Container,
  CardDeck,
  Row,
  Col,
  Card,
  Figure,
  Button
} from "react-bootstrap";
import "./Style.css";
//---------------------------------------Компоненти---------------------------
import MenuBar from "./MenuBar.js";
import MemberInfo from "./MemberInfo.js";
import CourseInfo from "./CourseInfo.js";
import CourseFractal from "./CourseFractal.js";
import CourseColor from "./CourseColor.js";
import CourseAffine from "./CourseAffine.js";
//--------------------------------------------------------------Фотографії---------
import Logo from "./Ebec.png";
import ImgVova from "./Vova.jpg";
import ImgRoma from "./Roma.jpg";
import ImgSerhiy from "./Serhiy.jpg";

import Img2 from "./Image2.png";
import Img3 from "./Image3.png";
//----------------------------------------------------------------------------------
const Pad0 = {
  padding: 0,
  margin: 0
};

const BasicExample = () => {
  return (
    <Router>
      <div>
        <Container fluid style={Pad0}>
          <MenuBar />
        </Container>
        <Route exact path="/" component={Home} />
        <Route exact path="/CourseFractal" component={CourseFractal} />
        <Route exact path="/CourseColor" component={CourseColor} />
        <Route exact path="/CourseAffine" component={CourseAffine} />
      </div>
    </Router>
  );
};

const Home = () => {
  return (
    <Container fluid style={{ padding: 0, margin: 0 }}>
      <selection id="home" />
      <Container fluid>
        <br />

        <Container
          fluid
          style={{ paddingBottom: 150, margin: 0, paddingTop: 150 }}
        >
          <Card bsStyle="tabs" className="custom-card">
            <Card.Body className="custom-card-body">
              <Card.Title
                className="custom-card-body-title"
                style={{ fontFamily: "Font Awesome 5 Brands Regular" }}
              >
                Computer Graphics
              </Card.Title>
              <Card.Text
                className="custom-card-body-text"
                style={{ fontFamily: "Font Awesome 5 Brands Regular" }}
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </Card.Text>
              <Figure style={Pad0}>
                <Figure.Image
                  width={500}
                  height={300}
                  alt="Logo"
                  src={Logo}
                  style={Pad0}
                />
              </Figure>
            </Card.Body>
          </Card>
        </Container>
      </Container>
      {/*----------------------------------------------------------------------------------------------------------------------------------------- */}
      <selection id="FractalArt" />
      <Container fluid>
        <CourseInfo
          Img={Img2}
          Logo="Logo"
          Title="Fractal art"
          Text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
      do eiusmod tempor incididunt ut labore et dolore magna
      aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing
      elit, sed do eiusmod tempor incididunt ut labore et dolore
      magna aliqua."
          Link="/CourseFractal"
        />
        <selection id="ColorModels" />
        <Row style={{ paddingTop: 100, paddingBottom: 50 }}>
          <Col>
            {" "}
            <Card bsStyle="tabs" className="custom-card-courseInfo">
              <Card.Body>
                <Card.Title className="custom-card-courseInfo-title">
                  Color Models
                </Card.Title>
                <Card.Text className="custom-card-courseInfo-text">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna
                  aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing
                  elit, sed do eiusmod tempor incididunt ut labore et dolore
                  magna aliqua.
                </Card.Text>
                <Button variant="outline-dark" href="/CourseColor">Go to module</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Figure>
              <Figure.Image width={1440} height={600} alt="Logo" src={Img3} />
            </Figure>
          </Col>
        </Row>
        <selection id="AffineTransformation" />
        <CourseInfo
          Img={Img2}
          Logo="Logo"
          Title="Affine Transformation"
          Text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
      do eiusmod tempor incididunt ut labore et dolore magna
      aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing
      elit, sed do eiusmod tempor incididunt ut labore et dolore
      magna aliqua."
          Link="/CourseAffine"
        />
      </Container>
      {/*----------------------------------------------------------------------------------------------------------------------------------------- */}

      <selection id="OurTeam" />
      <Container>
        <Container style={{ textAlign: "center", paddingTop: "120px" }}>
          <h1>Our team</h1>
        </Container>

        <CardDeck style={{ paddingBottom: "120px", paddingTop: "100px" }}>
          <MemberInfo
            style={{ width: "18rem" }}
            Img={ImgRoma}
            Name="Моравський Роман"
            Role="Back-end"
          />
          <MemberInfo
            style={{ width: "18rem" }}
            Img={ImgSerhiy}
            Name="Павльо Сергій"
            Role="Front-end"
          />
          <MemberInfo
            style={{ width: "18rem" }}
            Img={ImgVova}
            Name="Морозов Володимир"
            Role="Just good boy"
          />
        </CardDeck>
      </Container>
    </Container>
  );
};

export default BasicExample;
