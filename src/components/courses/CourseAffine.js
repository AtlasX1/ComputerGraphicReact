import React from "react";
import {
  Alert,
  Button,
  Row,
  Col,
  Figure,
  Navbar,
  Card,
  Container,
  CardGroup,
  ListGroup
} from "react-bootstrap";

export default class MenuBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      valA: 0,
      valB: 0,
      corner: 0,
      kof: 0
    };
  }

  onClearClick = () => {
    alert("Clear");
  };
  onBuildClick = () => {
    alert("Build");
  };
  onRotateClick = () => {
    alert("Rotate");
  };
  onButtonClick = () => {
    alert("Button");
  };
  UpClick = () => {
    alert("Up");
  };
  DownClick = () => {
    alert("Down");
  };
  LeftClick = () => {
    alert("Left");
  };
  RigthClick = () => {
    alert("Right");
  };
  onChangeAB = (AorB, value) => {
    this.setState({ [AorB]: value }, () => {
      console.log("A: " + this.state.valA + "\nB: " + this.state.valB);
    });
  };
  onChangeCorner = value => {
    this.setState({ corner: value }, () => {
      console.log("Corner: " + this.state.corner);
    });
  };
  onChangeKof = value => {
    this.setState({ kof: value }, () => {
      console.log("Kof: " + this.state.kof);
    });
  };
  render() {
    return (
      <Container fluid style={{ paddingTop: "140px" }}>
        <Row className="justify-content-md-center">
          <Col xs lg="2">
            <CardGroup>
              <Card border="secondary" style={{ width: "0rem" }}>
                <Card.Header align="center">Setting</Card.Header>
                <ListGroup variant="flush">
                  {/* ======================================================================= */}

                  <ListGroup.Item>
                    <Button
                      block
                      onClick={() => {
                        this.onClearClick();
                      }}
                    >
                      Clear
                    </Button>
                  </ListGroup.Item>
                  {/* ======================================================================= */}
                  <ListGroup.Item>
                    Square diagonal points:
                    <Row>
                      <Col>
                        A:{" "}
                        <input
                          type="number"
                          style={{ width: "80%" }}
                          onChange={v => {
                            this.onChangeAB("valA", v.target.value);
                          }}
                        />
                      </Col>
                      <Col>
                        B:{" "}
                        <input
                          type="number"
                          style={{ width: "80%" }}
                          onChange={v => {
                            this.onChangeAB("valB", v.target.value);
                          }}
                        />
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  {/* ======================================================================= */}
                  <ListGroup.Item>
                    <Button
                      block
                      onClick={() => {
                        this.onBuildClick();
                      }}
                    >
                      Build
                    </Button>
                  </ListGroup.Item>
                  {/* ======================================================================= */}
                  <ListGroup.Item>
                    <input
                      type="number"
                      style={{ width: "100%" }}
                      placeholder="тут кут повороту"
                      onChange={v => {
                        this.onChangeCorner(v.target.value);
                      }}
                    />
                  </ListGroup.Item>
                  {/* ======================================================================= */}
                  <ListGroup.Item>
                    <Button
                      block
                      onClick={() => {
                        this.onRotateClick();
                      }}
                    >
                      Rotate
                    </Button>
                  </ListGroup.Item>
                  {/* ======================================================================= */}
                  <ListGroup.Item>
                    <input
                      type="number"
                      style={{ width: "100%" }}
                      placeholder="тут кф скейлу"
                      onChange={v => {
                        this.onChangeKof(v.target.value);
                      }}
                    />
                  </ListGroup.Item>
                  {/* ======================================================================= */}
                  <ListGroup.Item>
                    <Button
                      block
                      onClick={() => {
                        this.onButtonClick();
                      }}
                    >
                      Button
                    </Button>
                  </ListGroup.Item>
                  {/* ======================================================================= */}
                  <ListGroup.Item>
                    <Row>
                      <Col
                        md={{ span: 4, offset: 4 }}
                        style={{ padding: "5px" }}
                      >
                        <Button
                          block
                          onClick={() => {
                            this.UpClick();
                          }}
                        >
                          Up
                        </Button>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="4" style={{ padding: "5px" }}>
                        <Button
                          block
                          onClick={() => {
                            this.LeftClick();
                          }}
                        >
                          Left
                        </Button>
                      </Col>
                      <Col md="4" style={{ padding: "5px" }}>
                        <Button
                          block
                          onClick={() => {
                            this.DownClick();
                          }}
                        >
                          Down
                        </Button>
                      </Col>
                      <Col md="4" style={{ padding: "5px" }}>
                        <Button
                          block
                          onClick={() => {
                            this.RigthClick();
                          }}
                        >
                          Right
                        </Button>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  {/* ======================================================================= */}
                </ListGroup>
              </Card>
            </CardGroup>
          </Col>
          <Col xs lg="5">
            <Container>
              <CardGroup>
                <Card border="secondary" style={{ width: "0rem" }}>
                  <Card.Header align="center">
                    Affine transformations
                  </Card.Header>

                  <canvas ref="canvas" width={640} height={480} />
                </Card>
              </CardGroup>
            </Container>
          </Col>
        </Row>
      </Container>
    );
  }
}
