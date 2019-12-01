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
      valAX: 0,
      valAY: 0,
      valBX: 100,
      valBY: 100,
      angle: 0,
      kof: 1
    };
  }
  clearCanvas = () => {
    let canvas = this.refs.canvas;
    const ctx = canvas.getContext('2d');
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0,0, canvas.width, canvas.height);
  };
  drawRect = () => {
    let canvas = this.refs.canvas;
    const ctx = canvas.getContext('2d');
    //  ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.fillRect(this.state.valAX, this.state.valAY, (this.state.valBX - this.state.valAX), (this.state.valBY - this.state.valAY));
  };
  rotateRect = () => {
    let canvas = this.refs.canvas;
    const ctx = canvas.getContext('2d'); 
    ctx.translate(this.state.valBX - (this.state.valBX - this.state.valAX)/2,this.state.valBY - (this.state.valBY - this.state.valAY)/2);
    ctx.rotate(this.state.angle * Math.PI/180);
    ctx.fillRect(-((this.state.valBX - this.state.valAX)/2), -((this.state.valBY - this.state.valAY)/2), (this.state.valBX - this.state.valAX), (this.state.valBY - this.state.valAY));
    ctx.restore();
  };
  scaleRect = () => {
    let canvas = this.refs.canvas;
    const ctx = canvas.getContext('2d'); 
    ctx.translate(this.state.valAX,this.state.valAY);
    ctx.scale(this.state.kof, this.state.kof);
    ctx.restore();
  };
  buildRect = () => {
    this.clearCanvas();
    this.scaleRect();
    this.rotateRect();
  };
  onClearClick = () => {
    alert("Clear");
    this.clearCanvas();
  };
  onBuildClick = () => {
    alert("Build");
    this.clearCanvas();
    this.drawRect();
  };
  onRotateClick = () => {
    alert("Rotate");
    this.clearCanvas();
    this.buildRect();
  };
  onButtonClick = () => {
    alert("Button");
    this.clearCanvas();
    this.buildRect();
  };
  UpClick = () => {
    //alert("Up");
    this.state.valAY -= 10;
    this.state.valBY -= 10;
    this.buildRect();
  };
  DownClick = () => {
    //alert("Down");
    this.state.valAY += 10;
    this.state.valBY += 10;
    this.buildRect();
  };
  LeftClick = () => {
    //alert("Left");
    this.state.valAX -= 10;
    this.state.valBX -= 10;
    this.buildRect();
  };
  RigthClick = () => {
    //alert("Right");
    this.state.valAX += 10;
    this.state.valBX += 10;
    this.buildRect();
  };
  onChangeAB = (AorB, value) => {
    this.setState({ [AorB]: value }, () => {
      console.log("AX: " + this.state.valAX + "\nAY: " + this.state.valAY + "\nBX: " + this.state.valBX + "\nBY: " + this.state.valBY);
    });
  };
  onChangeAngle = value => {
    this.setState({ angle: value }, () => {
      console.log("Angle: " + this.state.angle);
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
                        AX:{" "}
                        <input
                          type="number"
                          defaultValue="0"
                          style={{ width: "80%" }}
                          onChange={v => {
                            this.onChangeAB("valAX", v.target.value);
                          }}
                        />
                      </Col>
                      <Col>
                        AY:{" "}
                        <input
                          type="number"
                          defaultValue="0"
                          style={{ width: "80%" }}
                          onChange={v => {
                            this.onChangeAB("valAY", v.target.value);
                          }}
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        BX:{" "}
                        <input
                          type="number"
                          defaultValue="100"
                          style={{ width: "80%" }}
                          onChange={v => {
                            this.onChangeAB("valBX", v.target.value);
                          }}
                        />
                      </Col>
                      <Col>
                        BY:{" "}
                        <input
                          type="number"
                          defaultValue="100"
                          style={{ width: "80%" }}
                          onChange={v => {
                            this.onChangeAB("valBY", v.target.value);
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
                      defaultValue = "0"
                      style={{ width: "100%" }}
                      placeholder="тут кут повороту"
                      onChange={v => {
                        this.onChangeAngle(v.target.value);
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
                      defaultValue = "1"
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

                  <canvas ref="canvas" width={640} height={640} />
                </Card>
              </CardGroup>
            </Container>
          </Col>
        </Row>
      </Container>
    );
  }
}
