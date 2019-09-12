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
const Pad0 = {
  padding: 0,
  margin: 0
};
const ImageUrl =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Symbol_from_Marvel%27s_The_Avengers_logo.svg/1200px-Symbol_from_Marvel%27s_The_Avengers_logo.svg.png";

export default class MenuBar extends React.Component {
  render() {
    return (
      <Alert variant="dark ">
        <Row className="show-grid" float="center" style={Pad0}>
          <Col>
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
            </Link>{" "}
          </Col>
          <Col md={{ span: 1 }} style={Pad0}>
            <Link to="/Courses">
              <Button block style={{ marginTop: 10 }}>
                {" "}
                Course{" "}
              </Button>
            </Link>{" "}
          </Col>
        </Row>
      </Alert>
    );
  }
}
