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
  }
  //Це є той додатковий блок з інпутом, який рендериться лише за умови. Він є типу дочірньою компонентою
  //Там де ти бачиш consle.log - це виконуються події коли ти змінюєш дані
  //
  valueC = name => {
    if (name.data === Julia) {
      return (
        <ListGroup.Item>
          {" "}
          Value C:
          <InputGroup block>
            <FormControl
              type="number"
              step="0.5"
              min="0"
              value={this.state.C_Vlue}
              onChange={V => {
                this.setVlueC(V);
              }}
            />
          </InputGroup>
        </ListGroup.Item>
      );
    } else {
      return null;
    }
  };
  clickRestore() {
    alert("Restore");
  }
  setVlueC(V) {
    this.setState({ C_Vlue: V.target.value }, () => {
      console.log(this.state.C_Vlue);
    });
  }
  setMaxIterations(V) {
    this.setState({ MaxIteration: V.target.value }, () => {
      console.log(this.state.MaxIteration);
    });
  }
  setMethod() {
    if (
      this.state.MethodName1 === Mandelbrot &&
      this.state.MethodName2 === Julia
    ) {
      this.setState(
        {
          MethodName1: Julia,
          MethodName2: Mandelbrot
        },
        () => {
          console.log(this.state.MethodName1);
        }
      );
    } else {
      this.setState(
        {
          MethodName1: Mandelbrot,
          MethodName2: Julia
        },
        () => {
          console.log(this.state.MethodName1);
        }
      );
    }
  }
  setIterations() {
    let tmp1 = this.state.AutoMaxIter;
    tmp1 = tmp1 ? false : true;
    this.setState({ AutoMaxIter: tmp1 }, () => {
      console.log(this.state.AutoMaxIter);
    });
  }
  setZoom(sign) {
    let Zoom = this.state.Zoom;

    if (sign === "+") {
      Zoom++;
    }
    if (sign === "-") {
      Zoom--;
    }
    this.setState({ Zoom: Zoom }, () => {
      console.log(this.state.Zoom);
    });
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
                  {/* ======================================================================= */}
                  <ListGroup.Item>
                    <Button
                      block
                      variant="outline-secondary"
                      onClick={() => {
                        this.clickRestore();
                      }}
                    >
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
                            this.setMethod();
                          }}
                        >
                          {this.state.MethodName2}
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </ListGroup.Item>
                  {/* ======================================================================= */}
                  <ListGroup.Item>
                    Max itrations:
                    <InputGroup className="mb-3" block>
                      <FormControl
                        type="number"
                        step="1"
                        min="0"
                        value={this.state.MaxIteration}
                        onChange={V => {
                          this.setMaxIterations(V);
                        }}
                      />
                    </InputGroup>
                    <Form.Group>
                      <Form.Check
                        type="checkbox"
                        label="Auto max iterations"
                        defaultChecked={this.state.AutoMaxIter}
                        onChange={() => {
                          this.setIterations();
                        }}
                      />
                    </Form.Group>
                  </ListGroup.Item>
                  {/* ======================================================================= */}
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
                  {/* ======================================================================= */}
                  <ListGroup.Item>
                    <Row>
                      <Col>
                        <Button
                          block
                          variant="outline-secondary"
                          style={{ fontSize: "24px", paddingTop: "0px" }}
                          onClick={() => {
                            this.setZoom("+");
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
                            this.setZoom("-");
                          }}
                        >
                          -
                        </Button>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  {/* ======================================================================= */}
                  <this.valueC data={this.state.MethodName1} />
                  {/* ======================================================================= */}
                </ListGroup>
              </Card>
            </CardGroup>
          </Col>
          <Col lg="10">
            <CanvasFractal name={this.state.MethodName1} />
          </Col>
        </Row>
      </Container>
    );
  }
}
