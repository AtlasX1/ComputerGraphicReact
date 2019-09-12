import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import {
  Alert,
  Button,
  Row,
  Col,
  Container,
  Figure,
  Card,
  CardDeck,
  Jumbotron
} from "react-bootstrap";
import ImgRoma from "./Roma.jpg";
import CourseInfo from "./CourseInfo";
import CoursePng from "./Course.png";
export default class Course extends React.Component {
  render() {
    return (
      <Container fluid>
        <br />
        <Container>
          <Card>
            <Row>
              <Col>
                <Card.Body>
                  <Card.Title>[CG 2019] Course,</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    National University Lviv Polytechnic
                  </Card.Subtitle>
                  <Card.Text>
                    Computer graphics are pictures and films created using
                    computers. Usually, the term refers to computer-generated
                    image data created with the help of specialized graphical
                    hardware and software. It is often abbreviated as CG, though
                    sometimes erroneously referred to as computer-generated
                    imagery (CGI).
                  </Card.Text>
                  <footer className="blockquote-footer">
                    Name Surname,
                    <cite title="Source Title">Course Creator</cite>
                  </footer>
                </Card.Body>
              </Col>
              <Col>
                <Figure>
                  <Figure.Image
                    width={450}
                    height={450}
                    alt="Logo"
                    src={CoursePng}
                  />
                </Figure>
              </Col>
            </Row>
          </Card>
        </Container>
        <br />
        <Container>
          {" "}
          <CardDeck>
            <CourseInfo
              style={{ width: "18rem" }}
              Img={ImgRoma}
              Name="Fractal art"
            />
            <CourseInfo
              style={{ width: "18rem" }}
              Img={ImgRoma}
              Name="Color model"
            />
            <CourseInfo
              style={{ width: "18rem" }}
              Img={ImgRoma}
              Name="Affine transformation"
            />
          </CardDeck>
        </Container>
      </Container>
    );
  }
}
