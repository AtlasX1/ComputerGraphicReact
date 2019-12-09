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
import CourseFractal from "./components/courses/CourseFractal.js";
import CourseColor from "./components/courses/CourseColor.js";
import CourseAffine from "./components/courses/CourseAffine.js";
//--------------------------------------------------------------Фотографії---------
import Logo from "./CG-Logo-2.png";
import ImgVova from "./Vova.jpg";
import ImgRoma from "./Roma.jpg";
import ImgSerhiy from "./Serhiy.jpg";

import Sky from "./Sky.jpg";
import Img1 from "./Image1.jpg";
import Img2 from "./Image2.jpg";
import Img3 from "./Image3.png";
//----------------------------------------------------------------------------------
const FontStyle = {
  color: "#fff",
  fontSize: "18px",
  fontFamily: "Font Awesome 5 Brands Regular"
};

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
    <Container fluid style={Pad0}>
      <selection id="home" />
      <Container
        fluid
        style={{
          height: "1060px",
          backgroundSize: "1920px 1080px",
          backgroundImage: `url(${Sky})`
        }}
      >
        <br />

        <Container
          fluid
          style={{ marginTop: "150px", width: "1020px", marginBottom: "160px" }}
        >
          <h1
            align="center"
            style={{
              fontFamily: "Font Awesome 5 Brands Regular",
              color: "#fff",
              fontSize: "96px"
            }}
          >
            COMPUTER GRAPHICS
          </h1>

          <Row>
            <Col>
              <Figure style={Pad0}>
                <Figure.Image
                  width={550}
                  height={550}
                  alt="Logo"
                  src={Logo}
                  style={{ paddingLeft: 30, marginTop: 40 }}
                />
              </Figure>
            </Col>
            <Col style={{ display: "flex", justifyContent: "flex-end" }}>
              <p
                style={{
                  textAlign: "right",
                  fontSize: "36px",
                  fontFamily: "Font Awesome 5 Brands Regular",
                  width: "378px",
                  color: "#fff",
                  bottom: "60px",
                  position: "absolute"
                }}
              >
                “There are three responses to a piece of design – yes, no, and
                WOW! Wow is the one to aim for.”
              </p>
              <p
                style={{
                  textAlign: "right",
                  fontSize: "36px",
                  fontFamily: "Font Awesome 5 Brands Regular",
                  width: "378px",
                  color: "#fff",
                  bottom: 0,
                  position: "absolute"
                }}
              >
                Milton Glaser
              </p>
            </Col>
          </Row>
        </Container>
      </Container>
      {/*----------------------------------------------------------------------------------------------------------------------------------------- */}
      <selection id="FractalArt" />
      <Container fluid style={{ padding: "0 80px" }}>
        <CourseInfo
          Img={Img1}
          Logo="Logo"
          Title="Fractal art"
          Text="In this module you have an opportunity to build Mandelbrot or Julia fractals, 
          scale, paint and save them!"
          Link="/CourseFractal"
        />
      </Container>
      <selection id="ColorModels" />
      <Container
        fluid
        style={{ padding: "0 80px", backgroundColor: "#2F6D92" }}
      >
        <Row style={{ padding: "220px 30px 220px 0px", display: "flex" }}>
          <Col style={{ display: "flex", color: "#fff", alignItems: "center" }}>
            <div style={{ width: "640px" }}>
              <h1 style={{ fontSize: "60px" }}>Color Models</h1>
              <p style={{ fontSize: "24px" }}>
                In this module you can upload any image, change its color model
                to HSV, CMYK and back to RGB. Also you have an opportunity to
                change brightness of blue color.
              </p>
              <Button
                style={{ marginTop: "50px", fontSize: "30px" }}
                variant="light"
                href={"/CourseColor"}
              >
                Go to module
              </Button>
            </div>
          </Col>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#002850",
              width: "700px",
              height: "700px",
              borderRadius: "30px"
            }}
          >
            <Figure>
              <Figure.Image
                style={{ borderRadius: "60px" }}
                width={500}
                height={375}
                alt={"ColorModelLogo"}
                src={Img3}
              />
            </Figure>
          </div>
        </Row>
      </Container>
      <selection id="AffineTransformation" />
      <Container fluid style={{ padding: "0 80px" }}>
        <CourseInfo
          Img={Img2}
          Logo="Logo"
          Title="Affine Transformation"
          Text="In this module you can build a square and then with the help of affine 
          transformation you can move, rotate and scale it."
          Link="/CourseAffine"
        />
      </Container>
      {/*----------------------------------------------------------------------------------------------------------------------------------------- */}

      <selection id="OurTeam" />
      <Container
        fluid
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "1060px",
          backgroundSize: "1920px 1080px",
          backgroundImage: `url(${Sky})`
        }}
      >
        <div
          style={{
            display: "flex",
            flexFlow: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#fff",
            width: "1440px",
            height: "730px",
            borderRadius: "30px"
          }}
        >
          <Container style={{ textAlign: "center" }}>
            <h1 style={{ fontSize: "60px" }}>Our team</h1>
          </Container>

          <Row
            style={{
              display: "flex",
              flexFlow: "row",
              paddingBottom: "120px",
              paddingTop: "50px"
            }}
          >
            <MemberInfo
              style={{ width: "370px", height: "370px", borderWidth: 0 }}
              Img={ImgRoma}
              Name="Моравський Роман"
              Role="Back-end"
            />
            <MemberInfo
              style={{ width: "370px", height: "370px", borderWidth: 0 }}
              Img={ImgSerhiy}
              Name="Павльо Сергій"
              Role="Front-end"
            />
            <MemberInfo
              style={{ width: "370px", height: "370px", borderWidth: 0 }}
              Img={ImgVova}
              Name="Морозов Володимир"
              Role="Designer"
            />
          </Row>
        </div>
      </Container>
    </Container>
  );
};

export default BasicExample;
