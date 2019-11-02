import React from "react";
import {
  Card,
  Button,
  Row,
  Col,
  FormControl,
  InputGroup,
  CardGroup,
  Container,
  DropdownButton,
  Dropdown
} from "react-bootstrap";

import CanvasFractal from "./CanvasFractal.js";
export default class Setting extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      MaxIteration: 0,
      MandelbrotName: "Mandelbrot set",
      JuliaName: "Julia Set",
      AutoMaxIter: false,
      ColoureScheme: "HSV1",
      C_Vlue: 0,
      ZoomIn: 50,
      ZoomOut: 50
    };
  }

  render() {
    return (
      <Container fluid style={{ paddingTop: "75px" }}>
        <Row>
          <Col lg="2">
            <CardGroup>
              <Card border="secondary" style={{ width: "0rem" }}>
                <Card.Header align="center">Setting</Card.Header>
                <Card.Body>
                  <Button block variant="outline-secondary">
                    Restore defaults
                  </Button>
                  <br />
                  <DropdownButton title="secondary" variant="outline-secondary">
                    <Dropdown.Item eventKey="1">Mandelbrot set</Dropdown.Item>
                  </DropdownButton>
                  <br />
                  Max itrations
                  <InputGroup className="mb-3">
                    <FormControl
                      placeholder="Username"
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                      type="number"
                      step="1"
                      min="0"
                      value={this.state.MaxIteration}
                      onChange={V => {
                        this.setState({ MaxIteration: V.target.value });
                      }}
                    />
                  </InputGroup>
                </Card.Body>
              </Card>
            </CardGroup>
          </Col>
          <Col lg="10">
            <CanvasFractal name="Mandelbrot set" />
          </Col>
        </Row>
      </Container>
    );
  }
}
