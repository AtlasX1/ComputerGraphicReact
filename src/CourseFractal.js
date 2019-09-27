import React from "react";
import {
  Card,
  Button,
  Row,
  Col,
  Figure,
  Badge,
  Nav,
  CardGroup,
  Container
} from "react-bootstrap";

import CanvasFractal from "./CanvasFractal.js";

const CourseName = props => {
  return (
    <h1 style={{ paddingTop: "60px" }}>
      <Badge variant="outline-secondary">{props.name}</Badge>
    </h1>
  );
};

const Canv = () => {
  return (
    <CardGroup>
      <Card border="secondary" style={{ width: "0rem" }}>
        <Card.Header>Mandelbort set</Card.Header>
        <CanvasFractal />
      </Card>
      <Card border="secondary" style={{ width: "0rem" }}>
        <Card.Header>Julia set</Card.Header>
        <CanvasFractal />
      </Card>
    </CardGroup>
  );
};

export default class MenuBar extends React.Component {
  render() {
    return (
      <Container fluid>
        <CourseName name="Fractal art" />
        <Canv />
      </Container>
    );
  }
}
