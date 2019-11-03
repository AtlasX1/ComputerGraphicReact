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
  Form,
  Dropdown,
  ListGroup
} from "react-bootstrap";
import CanvasFractal from "./canvas/CanvasFractal.js";
const Julia = "Julia set";
const Mandelbrot = "Mandelbrot set";
export default class Setting extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      MaxIteration: 0,
      MethodName1: Mandelbrot,
      MethodName2: Julia,
      AutoMaxIter: false,
      ColoureScheme: "Blue gradient",
      C_Vlue: 0,
      Zoom: 50
    };
    this.ChangeAutoMaxIter = this.ChangeAutoMaxIter.bind(this);
  }

  ChangeMethod() {
    if (
      this.state.MethodName1 === Mandelbrot &&
      this.state.MethodName2 === Julia
    ) {
      this.setState({
        MethodName1: Julia,
        MethodName2: Mandelbrot
      });
    } else {
      this.setState({
        MethodName1: Mandelbrot,
        MethodName2: Julia
      });
    }
  }
  ChangeAutoMaxIter() {
    this.setState(function(prevState, props) {
      return { AutoMaxIter: !prevState.AutoMaxIter };
    });
  }
  Zoom(sign) {
    let Zoom = this.state.Zoom;

    if (sign == "+") {
      Zoom++;
    }
    if (sign == "-") {
      Zoom--;
    }
    this.setState({ Zoom: Zoom });
    console.log(this.state.Zoom);
  }
  render() {
    return (
      <Container fluid style={{ paddingTop: "75px" }}>
        <Row>
          <Col lg="2">
            <CardGroup>
              <Card border="secondary" style={{ width: "0rem" }}>
                <Card.Header align="center">Setting</Card.Header>

                <ListGroup variant="flush">
                  <ListGroup.Item>
                    {" "}
                    <Button block variant="outline-secondary">
                      Restore defaults
                    </Button>
                    <br />
                    <Dropdown block>
                      <Dropdown.Toggle block variant="outline-secondary">
                        {this.state.MethodName1}
                      </Dropdown.Toggle>

                      <Dropdown.Menu block>
                        <Dropdown.Item
                          block
                          onClick={() => {
                            this.ChangeMethod();
                          }}
                        >
                          {this.state.MethodName2}
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    {" "}
                    Max itrations:
                    <InputGroup className="mb-3" block>
                      <FormControl
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
                    <Form.Group controlId="formBasicCheckbox">
                      <Form.Check
                        type="checkbox"
                        label="Auto max iterations"
                        defaultChecked={this.state.AutoMaxIter}
                        onChange={() => {
                          this.ChangeAutoMaxIter();
                        }}
                      />
                    </Form.Group>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    Colour scheme:
                    <Dropdown block>
                      <Dropdown.Toggle block variant="outline-secondary">
                        {this.state.ColoureScheme}
                      </Dropdown.Toggle>

                      <Dropdown.Menu block>
                        <Dropdown.Item block onClick={() => {}}>
                          {this.state.ColoureScheme}
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>
                        <Button
                          block
                          variant="outline-secondary"
                          style={{ fontSize: "24px", paddingTop: "0px" }}
                          onClick={() => {
                            this.Zoom("+");
                          }}
                        >
                          +
                        </Button>
                      </Col>
                      <Col>
                        {" "}
                        <Button
                          block
                          variant="outline-secondary"
                          style={{ fontSize: "24px", paddingTop: "0px" }}
                          onClick={() => {
                            this.Zoom("-");
                          }}
                        >
                          -
                        </Button>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                </ListGroup>
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
